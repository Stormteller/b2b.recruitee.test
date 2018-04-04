const amqp = require('amqplib');
const elasticSearch = require('./api/elasticsearch');
const config = require('./config');

amqp.connect(config.AMQP_URL).then(async(conn) => {
    console.log('amqp.connected!');
    const channel = await conn.createChannel();
    await channel.assertQueue(config.AMQP_QUEUE_NAME);
    await channel.prefetch(2);
    let count = 0;

    channel.consume(config.AMQP_QUEUE_NAME, async(msg) => {
        const json = JSON.parse(msg.content.toString());
        count += 1;
        
        try {
            const documentType = 'mytype';
            const result = await elasticSearch.createDocument(json, documentType);
            console.log(`${count} - ${result}`)
        } catch (err) {
            console.log(err)
        }
        channel.ack(msg);
    })
}).catch((err) => {
    console.log(err)

});
