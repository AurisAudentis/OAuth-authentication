import {app} from "./src/app";
import config from "./config/config";
import {sequelize} from "./src/Database/Sequelize";

new app().launch(config.port);

sequelize.sync().then(() => sequelize.authenticate().then(() => console.log("conn established.")));
