import {sequelize} from "../src/Database/Sequelize";
import {app} from "../src/app";

const db = sequelize;
const server = new app();

before((done) => {
    db.sync()
        .then(() => server.launch(3001))
        .then(() => done())
        .catch((err) => done(err));
});

after(() => {
    server.exit();
});