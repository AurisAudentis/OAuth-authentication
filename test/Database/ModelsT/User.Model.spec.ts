import {assert} from 'chai';
import {sequelize} from "../../../src/Database/Sequelize";
import * as faker from 'faker';
import User from "../../../src/Database/Models/User.Model";
import {describe, it } from 'mocha';
import {compare, compareSync} from "bcrypt";
import Client from "../../../src/Database/Models/Client.Model";

describe("the user model", () => {
    const db = sequelize;
    const newUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.lorem.words(2)
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
            .then(user => assert.equal(user.firstName, newUser.firstName))
            .then(() => done())
            .catch((err) => done(err));
    });

    it("should have an id", (done) => {
        User.findOne({where: {firstName: newUser.firstName as string}})
            .then(user => assert.exists(user.id))
            .then(() => done())
            .catch((err) => done(err));
    });


    it("should notice that the pw is hashed", (done) => {
        User.findOne()
            .then(user => assert.isTrue(user.password.startsWith("$2b$")))
            .then(() => done())
            .catch(err => done(err))
    });

    it("should be able to validate pw", (done) => {
        User.findOne({where: {email: newUser.email}})
            .then(user => compare(newUser.password, user.password))
            .then(pass => assert.isTrue(pass))
            .then(() => done())
            .catch(err => done(err))

    });

    it('should be able to delete it', (done) => {
        User.destroy({where: {email: newUser.email}})
            .then(affectedRows => assert.equal(affectedRows, 1))
            .then(() => done())
            .catch((err) => done(err))

    });
});