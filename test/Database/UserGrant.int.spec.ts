import {sequelize} from "../../src/Database/Sequelize";
import * as faker from "faker";
import User from "../../src/Database/Models/User.Model";
import {assert} from 'chai';

describe("UserGrant, with necessary client and user", () => {
    const db = sequelize;
    const newClient = {
        client_name: faker.name.firstName(),
        client_secret: faker.name.lastName(),
    };
    const newUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.lorem.words(2)
    };

    before((done) => {
        User.sync()
            .then(() => User.create(newUser))
            .then((user) => user.$create("clientGrant", {}))
            .then((grant) => grant.$create("client", newClient))
            .then(() => done())
            .catch(err => done(err))
    });

    it("should find the user, with corresponding grant", (done) => {
        User.scope('full').findOne({where: {email: newUser.email}})
            .then((user) => {
                assert.exists(user.clientGrants);
                assert.isAtLeast(user.clientGrants.length, 1);
                assert.exists(user.clientGrants[0].client);
            })
            .then(() => done())
            .catch((err) => done(err))
    })
});