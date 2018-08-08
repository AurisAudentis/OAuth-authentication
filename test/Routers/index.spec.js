"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../src/app");
const config_1 = __importDefault(require("../../config/config"));
const chai_1 = require("chai");
const chaiHttp = require("chai-http");
chai_1.use(chaiHttp);
describe('Bare path /', () => {
    const server = new app_1.app();
    before((done) => {
        server.launch(config_1.default.port);
        done();
    });
    after(() => {
        server.exit();
    });
    it("should return {hello: 'world'}", (done => {
        chai_1.request(server.app)
            .get('/')
            .end(function (err, res) {
            chai_1.assert.notExists(err);
            chai_1.assert(res.status === 200);
            chai_1.assert.isObject(res.body);
            chai_1.assert.deepEqual(res.body, { hello: "world" });
            done();
        });
    }));
});
