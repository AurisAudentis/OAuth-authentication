import {app} from "../../src/app";
import config from "../../config/config";
import {assert, use, request} from 'chai';
import chaiHttp = require("chai-http");
use(chaiHttp);


describe('Bare path /', () => {
    const server = new app();
    before((done) => {
        server.launch(config.port);
        done();
    });

    after(() => {
        server.exit();
    });

    it("should return {hello: 'world'}", (done => {
        request(server.app)
            .get('/')
            .end(function (err, res) {
                assert.notExists(err);
                assert(res.status === 200);
                assert.isObject(res.body);
                assert.deepEqual(res.body, {hello: "world"});
                done()
    })}));
});
