const app = require('./index');
const supertest = require('supertest');
const regeneratorRuntime = require('regenerator-runtime')
const request = supertest(app);
describe('Post Endpoints', () => {
    it('should route to index.html', async() => {
        const res = await request
            .get('/')
            .send('./dist/index.html')
        expect(res.statusCode).toEqual(200);
    })
})