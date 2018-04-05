const amqp = require('amqplib');
const elasticSearch = require('./api/elasticsearch');
const config = require('./config');

async function onAMQPConnect(conn) {
    console.log('amqp.connected!');
    const channel = await conn.createChannel();
    await channel.assertQueue(config.AMQP_QUEUE_NAME);
    await channel.prefetch(2);
    let count = 0;

    channel.consume(config.AMQP_QUEUE_NAME, async (msg) => {
        count += 1;

        const result = await handleMessage(message);

        console.log(`${count} - ${result}`);
        channel.ack(msg);
    });
}

async function handleMessage(message) {
    try {
        let data = JSON.parse(message.content.toString());

        const percentage = getPercentage(data.provider);
        data.summary.reservationTimeMinutes = data.summary.elapsedTimeMinutes * percentage;

        const documentType = 'mytype';
        return await elasticSearch.createDocument(data, documentType);
    } catch (error) {
        console.log(error);
    }
}

async function getPercentage(provider) {
    const percentageMap = config.app.providerReservationTimePercentage.providersToPercentageMap;
    const defaultPercentage = config.app.providerReservationTimePercentage.defaultPercentage;

    return percentageMap[provider] || defaultPercentage;
}

elasticSearch.init();

amqp.connect(config.AMQP_URL)
    .then(onAMQPConnect)
    .catch((err) => {
        console.log(err)
    });
