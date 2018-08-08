"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Sequelize_1 = require("../../src/Database/Sequelize");
describe('Sequelize instance', () => {
    it('should return a sequelize instance', () => {
        chai_1.assert.isObject(Sequelize_1.sequelize);
    });
    it("should be able to authenticate", (done) => {
        Sequelize_1.sequelize.authenticate()
            .then(() => done())
            .catch((err) => { chai_1.assert.notExists(err); done(); });
    });
});
