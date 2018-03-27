var amqp = require('amqplib')
// const AMQP_URL = ''
const queueName = 'test'
const cuid = require('cuid');
const elasticSearchTemplate = require('./elasticsearch-template.json')

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200'
});


client.indices.putTemplate({
    name: 'mytest',
    body: elasticSearchTemplate
}, (err, result) => {
    if (err) console.log(err)
    // if (result) console.log(result)
})

amqp.connect(AMQP_URL).then(async(conn) => {


    console.log('amqp.connected!')
    const channel = await conn.createChannel()
    await channel.assertQueue(queueName)
    await channel.prefetch(2)
    let count = 0;
    channel.consume(queueName, async(msg) => {
        const json = JSON.parse(msg.content.toString())
        count += 1;
        
        try {
            var result = await createDocument(json)
            console.log(`${count} - ${result}`)
        } catch (err) {
            // console.log(result)
            console.log(err)
        }
        channel.ack(msg);
    })
}).catch((err) => {
    console.log(err)

});

async function createDocument(json) {
    return new Promise((resolve, reject) => {
        client.create({
            index: "mytest",
            type: 'mytype',
            id : cuid(),
            body : json
        }, function (err, response) {
            if (err) return reject(err)
            if (response) return resolve(response.result + ' ' + response._id)
        })
    });
}