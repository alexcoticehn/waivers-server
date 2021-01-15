const request = require("supertest");
const app = require('../../app');

test('Successful Login Test', () => {
    return request(app)
        .post('/api/users/login', {
            username: 'dfilipovic',
            password: '123456789'
        })
        .then((res) => {
            console.log(res.status);
        });
})