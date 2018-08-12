import {assert, request, use} from 'chai';
import chaiHttp = require("chai-http");
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
    })
});