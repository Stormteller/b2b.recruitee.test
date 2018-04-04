const sinon = require('sinon');
const assert = require('assert');

const elasticSearch = require('../src/api/elasticsearch');

describe('createDocument()', () => {
    it('should call client.create() once',async () => {
        const mockReturn = {result: 'success', _id: '123'};
        const spy = sinon.stub(elasticSearch.client, 'create').returns(mockReturn);

        const docCreateResult = await elasticSearch.createDocument(JSON.stringify({test: 'test'}), 'someType');

        spy.restore();

        sinon.assert.calledOnce(spy);
        assert.equal(docCreateResult, `${mockReturn.result} ${mockReturn._id}`);
    });
});