import {sequelize} from "../src/Database/Sequelize";
import {app} from "../src/app";
import * as faker from "faker";
import User from "../src/Database/Models/User.Model";
import UserGrant from "../src/Database/Models/UserGrant.Model";

const db = sequelize;
const server = new app();

export const testClient = {
    client_name: faker.name.firstName(),
    client_secret: faker.name.lastName(),
    id: null
};
export const testUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.lorem.words(2),
    id: null
};

before((done) => {
    db.sync({force: true})
        .then(() => User.create(testUser))
        .then((user) => {
            testUser.id = user.id;
            return user.$create("clientGrant", {})
        })
        .then((grant) => grant.$create("client", testClient))
        .then((grant: UserGrant) => testClient.id = grant.clientId)
        .then(() => server.launch(3001))
        .then(() => done())
        .catch(err => done(err))
});

after(() => {
    server.exit();
});