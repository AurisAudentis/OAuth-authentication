import config from "../../config/config";
import {logger} from "../Infrastructure/Logger";
import {Sequelize} from 'sequelize-typescript';
import User from "./Models/User.Model";
import * as Path from "path";
import Client from "./Models/Client.Model";
import UserGrant from "./Models/UserGrant.Model";

export const sequelize = new Sequelize({
    database: config.database.database,
    username: config.database.username,
    password: config.database.password,
    dialect: config.database.dialect,
    operatorsAliases: false,
    logging: (msg) => logger.debug(msg),
    storage: config.database.storage === ":memory:" ? ":memory:": Path.join(__dirname, config.database.storage) ,
    //modelPaths: [Path.join(__dirname, "/Models")],
});
sequelize.addModels([Client, UserGrant, User]);