const elasticSearch = require('../api/elasticsearch');

const config = require('../config');

const queries = {
    sumDistanceInCityForProvider: (city, provider) => ({
        query: {
            bool: {
                filter: [
                    {term: {'start.city': city}},
                    {term: {'end.city': city}},
                    {term: {'provider': provider}},
                ]
            }
        },
        aggs: {
            total_distance: {
                sum: {
                    field: 'summary.travelledDistanceMeters'
                }
            },
        }
    })
};

async function searchCarStats(queryBody) {
    return await elasticSearch.client.search({
        index: config.ELASTICSEARCH_INDEX_NAME,
        type: 'mytype',
        body: queryBody
    });
}

async function findSumDistanceInCityForProvider(city, provider) {
    return await searchCarStats(queries.sumDistanceInCityForProvider(city, provider));
}

module.exports = {
    findSumDistanceInCityForProvider
};
