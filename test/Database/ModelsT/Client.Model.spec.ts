import {describe, it} from "mocha";
import {sequelize} from "../../../src/Database/Sequelize";
import * as faker from "faker";
import {assert} from "chai";
import User from "../../../src/Database/Models/User.Model";
import {compare} from "bcrypt";
import Client from "../../../src/Database/Models/Client.Model";

describe("the user model", () => {
    const db = sequelize;
    const newClient = {
        client_name: faker.name.firstName(),
        client_secret: faker.name.lastName(),
    };

    it("should exist", () => {
        assert.exists(Client);
    });

    it('should be able to create entries', (done) => {
        Client.sync()
            .then(() => Client.create(newClient))
            .then((client) => assert.exists(client))
            .then(() => done())
            .catch((err) => done(err))
    });

    it("should find the recently created client", (done) => {
        Client.findOne({where: {client_name: newClient.client_name as string}})
            .then(client => assert.equal(client.client_name, newClient.client_name))
            .then(() => done())
            .catch((err) => done(err));
    });

    it("should have an id", (done) => {
        Client.findOne({where: {client_name: newClient.client_name as string}})
            .then(client => assert.exists(client.id))
            .then(() => done())
            .catch((err) => done(err));
    });

    it("should notice that the secret is hashed", (done) => {
        Client.findOne()
            .then(client => assert.isTrue(client.client_secret.startsWith("$2b$")))
            .then(() => done())
            .catch(err => done(err))
    });

    it("should be able to validate secret", (done) => {
        Client.findOne({where: {client_name: newClient.client_name}})
            .then(client => compare(newClient.client_secret, client.client_secret))
            .then(pass => assert.isTrue(pass))
            .then(() => done())
            .catch(err => done(err))
    });

    it('should be able to delete it', (done) => {
        Client.destroy({where: {client_name: newClient.client_name}})
            .then(affectedRows => assert.equal(affectedRows, 1))
            .then(() => done())
            .catch((err) => done(err))
    });
});