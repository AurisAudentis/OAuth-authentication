import {describe} from "mocha";
import {assert, request, use} from 'chai';
import {testClient, testUser} from "../initializer.spec";
import User from "../../src/Database/Models/User.Model";
import Client from "../../src/Database/Models/Client.Model";
import chaiHttp = require("chai-http");
import * as faker from "faker";

use(chaiHttp);

describe("user Router endpoints", () => {
    it("Should create a user", (done) => {
        request('http://localhost:3001')
            .post("/oauth/user/register")
            .send({client_name: testClient.client_name, client_secret: testClient.client_secret, email: "test@test.be", password:"test"})
            .then((res) => {
                assert.equal(res.status, 200, "Succeeded");
                assert.exists(res.body.uid);

                // Should be in database.
                return User.findOne({where: {id: res.body.uid}})
                    .then(user => {assert.exists(1); return user})
                    // Should have issued a grant for the client.
                    .then(user => user.getClients())
                    .then(clients => clients.find(client => testClient.id === client.id))
                    .then(client => assert.exists(client))

                // Should have a grant
            })
            .then(done)
            .catch(done)
    });

    it("Should issue a grant", (done) => {
        Client.create({client_name: "test", client_secret: "test"})
            .then(client => {
        request('http://localhost:3001')
            .post("/oauth/user/grant")
            .send({client_name: client.client_name, client_secret: "test", uid: testUser.id, password: testUser.password})
            .then((res) => {
                assert.equal(res.status, 200, "Succeeded");

                // Should be in database.
                return User.findOne({where: {id: testUser.id}})
                    .then(user => {assert.exists(1); return user})
                    // Should have issued a grant for the client.
                    .then(user => user.getClients())
                    .then(clients => clients.find(client => testClient.id === client.id))
                    .then(client => assert.exists(client))

                // Should have a grant
            })
            .then(done)
            .catch(done)
    });
    });
});