import config from "../../config/config";
import {logger} from "../Infrastructure/Logger";
import {Sequelize} from 'sequelize-typescript';
import User from "./Models/User.Model";
import Token from "./Models/Token.Model";
import * as Path from "path";

export const sequelize: Sequelize = new Sequelize({
    ...config.database,
    storage: config.database.storage === ":memory:" ? ":memory:": config.database.storage ? Path.join(__dirname, config.database.storage):undefined,
    operatorsAliases: false,
    logging: (msg) => logger.debug(msg),
});
sequelize.addModels([User, Token]);