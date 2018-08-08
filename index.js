"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const config_1 = __importDefault(require("./config/config"));
const Sequelize_1 = require("./src/Database/Sequelize");
new app_1.app().launch(config_1.default.port);
Sequelize_1.sequelize.sync().then(() => Sequelize_1.sequelize.authenticate().then(() => console.log("conn established.")));
