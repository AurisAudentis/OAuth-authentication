import {assert} from 'chai';
import {sequelize} from "../../../src/Database/Sequelize";
import * as faker from 'faker';
import User from "../../../src/Database/Models/User.Model";
import {describe, it } from 'mocha';

describe("the user model", () => {
    const db = sequelize;
    const newUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email()
    };

    it("should exist", () => {
       assert.exists(User);
   });

    it('should be able to create entries', (done) => {
        User.sync()
            .then(() => User.create(newUser))
            .then((user) => assert.exists(user))
            .then(() => done())
            .catch((err) => done(err))
    });

    it("should find the recently created user", (done) => {
        User.findOne({where: {firstName: newUser.firstName as string}})
            .then(user => assert.deepEqual(user.dataValues, {...newUser, "id":1}))
            .then(() => done())
            .catch((err) => done(err));
    });

    it('should be able to delete it', (done) => {
        User.destroy({where: newUser})
            .then(affectedRows => assert.equal(affectedRows, 1))
            .then(() => done())
            .catch((err) => done(err))

    });
});