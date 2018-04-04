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
        //log
    } catch(error) {
        //log
        //TODO: Throw custom exception
        throw err
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
        //log
        return result.result + ' ' + result._id;
    } catch(err) {
        //log
        //TODO: Throw custom exception
        throw err
    }
}

module.exports = {
    init,
    createDocument,
    client
};