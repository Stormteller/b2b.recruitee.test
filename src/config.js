module.exports = {
    AMQP_URL: 'amqp://localhost',
    AMQP_QUEUE_NAME: 'test',
    ELASTICSEARCH_URL: 'localhost:9200',
    ELASTICSEARCH_INDEX_NAME: 'mytest',

    app: {
        providerReservationTimePercentage: {
            defaultPercentage: 0.2,
            providersToPercentageMap: { 'car2go': 0.25 }
        }
    }
};