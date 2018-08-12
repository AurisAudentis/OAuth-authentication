import v4 = require("uuid/v4");
import {
    validateGrants,
    validateReqBody,
} from "../../src/Infrastructure/CredentialsValidator";
import {assert} from "chai";
import {testClient, testUser} from "../initializer.spec";
import {where} from "sequelize";
import User from "../../src/Database/Models/User.Model";


describe("The functions that check client secret and password validity", () => {

    it("should validate this password body correctly", () => {
        const body = {
            uid: v4(),
            grant_type: "password",
            password: "test",
            client_name: "test",
            client_secret: "test"
        };
        console.log(body);
        assert.isTrue(validateReqBody(body))
    });

    it("should validate this refreshtoken body correctly", () => {
        const body = {
            uid: v4(),
            grant_type: "refresh_token",
            refresh_token: "test",
            client_name: "test",
            client_secret: "test"
        };
        assert.isTrue(validateReqBody(body))
    });

    it("should refuse this body", () => {
        const body = {
            uid: v4(),
            grant_type: "password",
            refresh_token: "test",
            client_name: "test",
            client_secret: "test"
        };
        assert.isFalse(validateReqBody(body))
    });

    it("should grant me access", (done) => {
        const body = {
            user: null,
            grant_type: "password",
            client_name: testClient.client_name,
            client_secret: testClient.client_secret,
            password: testUser.password
        };
        User.findOne({where: {id: testUser.id}})
            .then((user) => {
                body.user = user;
                validateGrants(body)
                    .then(result => assert.isTrue(result))
                    .then(done)
                    .catch(done)
            });
    });

    it("shouldn't grant me access", (done) => {
        const body = {
            user: null,
            grant_type: "password",
            client_name: testClient.client_name,
            client_secret: testClient.client_secret,
            password: "wrong pass"
        };
        User.findOne({where: {id: testUser.id}})
            .then((user) => {
                body.user = user;
                validateGrants(body)
                    .then(result => assert.isFalse(result))
                    .then(done)
                    .catch(done)
            });
    });

});