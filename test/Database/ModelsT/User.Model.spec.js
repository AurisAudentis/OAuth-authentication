"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Sequelize_1 = require("../../../src/Database/Sequelize");
const faker = __importStar(require("faker"));
const User_Model_1 = __importDefault(require("../../../src/Database/Models/User.Model"));
const mocha_1 = require("mocha");
mocha_1.describe("the user model", () => {
    const db = Sequelize_1.sequelize;
    const newUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email()
    };
    mocha_1.it("should exist", () => {
        chai_1.assert.exists(User_Model_1.default);
    });
    mocha_1.it('should be able to create entries', (done) => {
        User_Model_1.default.sync()
            .then(() => User_Model_1.default.create(newUser))
            .then((user) => chai_1.assert.exists(user))
            .then(() => done())
            .catch((err) => done(err));
    });
    mocha_1.it("should find the recently created user", (done) => {
        User_Model_1.default.findOne({ where: { firstName: newUser.firstName } })
            .then(user => chai_1.assert.deepEqual(user.dataValues, Object.assign({}, newUser, { "id": 1 })))
            .then(() => done())
            .catch((err) => done(err));
    });
    mocha_1.it('should be able to delete it', (done) => {
        User_Model_1.default.destroy({ where: newUser })
            .then(affectedRows => chai_1.assert.equal(affectedRows, 1))
            .then(() => done())
            .catch((err) => done(err));
    });
});
