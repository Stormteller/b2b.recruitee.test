const elasticSearch = require('elasticsearch');
const cuid = require('cuid');

const config = require('../../config');

const esTemplate = require('./esTemplate')(config.ELASTICSEARCH_INDEX_NAME);

const client = new elasticSearch.Client({
    host: config.ELASTICSEARCH_URL
});

async function init() {
    await createTestTemplate();
}

async function createTestTemplate() {
    try {
        const result = await client.indices.putTemplate({
            name: config.ELASTICSEARCH_INDEX_NAME,
            body: esTemplate
        });
        console.log('Template created. ' + result);
    } catch(error) {
        console.log(err);
        throw new ElasticSearchException();
    }
}

async function createDocument(json, type) {
    try {
        const result = await client.create({
            index: config.ELASTICSEARCH_INDEX_NAME,
            type,
            id: cuid(),
            body: json
        });
        console.log('Document created: ' + result._id);
        return result.result + ' ' + result._id;
    } catch(error) {
        console.log(err);
        throw new ElasticSearchException();
    }
}

module.exports = {
    init,
    createDocument,
    client
};