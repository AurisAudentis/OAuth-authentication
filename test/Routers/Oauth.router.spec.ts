import {assert, request, use} from 'chai';
import chaiHttp = require("chai-http");
import {testClient, testUser} from "../initializer.spec";
use(chaiHttp);

describe("oauth Router endpoints", () => {
    it("should return the key", (done) => {
        request('http://localhost:3001')
            .get('/auth/key')
            .send()
            .then(((res) => {
                assert.exists(res.text);
                assert.equal(res.status, 200, "not succeeded");
                assert.isTrue(res.text.startsWith("-----BEGIN PUBLIC KEY-----"), "not actually a public key.")
                }))
            .then(() => done())
            .catch(done)
    });

    let refresh_token;

    it("should generate a token by pw", (done) => {
        const body = {
          client_name: testClient.client_name,
          client_secret: testClient.client_secret,
          uid: testUser.id,
          password: testUser.password,
            grant_type: "password"
        };

        request('http://localhost:3001')
            .post('/auth/token')
            .send(body)
            .then(((res) => {
                assert.equal(res.status, 200, "not succeeded");
                assert.exists(res.body.access_token);
                assert.exists(res.body.refresh_token);
                refresh_token = res.body.refresh_token;
            }))
            .then(() => done())
            .catch(done)
    });

    it("should generate a token by refresh token", (done) => {
        const body = {
            client_name: testClient.client_name,
            client_secret: testClient.client_secret,
            uid: testUser.id,
            refresh_token: refresh_token,
            grant_type: "refresh_token"
        };

        request('http://localhost:3001')
            .post('/auth/token')
            .send(body)
            .then(((res) => {
                assert.equal(res.status, 200, "not succeeded");
                assert.exists(res.body.access_token);
                assert.exists(res.body.refresh_token);
                console.log(res.body)
            }))
            .then(() => done())
            .catch(done)
    })
});