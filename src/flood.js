const amqp = require('amqplib');
const config = require('./config');

amqp.connect(config.AMQP_URL).then(async(conn) => {
    console.log('amqp.connected!');
    const channel = await conn.createChannel();
    await channel.assertQueue(config.AMQP_QUEUE_NAME);

    const arrayProvider = ['car2go', 'drivenow', 'muving', 'emio', 'eddy', 'scout'];
    const arrayCity = ['berlin','dusseldorf','munich','frankfurt'];
    const totalFlood = 100000;

    for (let i = 1; i<=totalFlood; i++) {
      const startTime = Date.now() - Math.floor(Math.random() * Math.floor(30 * 24 * 60 * 60 * 1000));
      const endTime = startTime + Math.floor(Math.random() * Math.floor(2 * 60 * 1000));
      const provider = arrayProvider[Math.floor(Math.random() * arrayProvider.length)];
      const city = arrayCity[Math.floor(Math.random() * arrayCity.length)];
      const carId = Math.floor(Math.random() * Math.floor(1000));
      let travelledDistanceMeters = Math.floor(Math.random() * Math.floor(30000));
      const elapsedTimeMinutes = Math.floor(Math.random() * Math.floor(60));

      console.log(`${i}-${totalFlood}`);

      channel.sendToQueue(config.AMQP_QUEUE_NAME, new Buffer(JSON.stringify({
          "@timestamp": startTime,
          "id": `${provider}-${carId}`,
          "provider": provider,
          "type": "local",
          "vehicle": {
            "id": carId,
            "kind": "Car",
            "numberplate": "ABC123",
            "transmission": "Automatic",
            "engine": "Electric"
          },
          "start": {
            "city": city,
            "country": "de",
            "@timestamp": startTime
          },
          "end": {
            "city": city,
            "country": "de",
            "@timestamp": endTime
          },
          "summary": {
            "travelledDistanceMeters": travelledDistanceMeters,
            "elapsedTimeMinutes": elapsedTimeMinutes,
          }
        }) 

      ))
    }

    setTimeout(() => {
      process.exit(0)
    }, 10000)

}).catch((err) => {
    console.log(err)
});