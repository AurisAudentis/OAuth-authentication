import {sequelize} from "../../src/Database/Sequelize";
import * as faker from "faker";
import User from "../../src/Database/Models/User.Model";
import {assert} from 'chai';
import {testUser} from "../initializer.spec";

describe("UserGrant, with necessary client and user", () => {

    it("should find the user, with corresponding grant", (done) => {
        User.scope('full').findOne({where: {email: testUser.email}})
            .then((user) => {
                assert.exists(user.clientGrants);
                assert.isAtLeast(user.clientGrants.length, 1);
                assert.exists(user.clientGrants[0].client);
            })
            .then(() => done())
            .catch((err) => done(err))
    })
});