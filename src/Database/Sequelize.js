"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config/config"));
const Logger_1 = require("../Infrastructure/Logger");
const sequelize_typescript_1 = require("sequelize-typescript");
const Path = __importStar(require("path"));
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: config_1.default.database.database,
    username: config_1.default.database.username,
    password: config_1.default.database.password,
    dialect: config_1.default.database.dialect,
    operatorsAliases: false,
    logging: (msg) => Logger_1.logger.debug(msg),
    storage: config_1.default.database.storage === ":memory:" ? ":memory:" : Path.join(__dirname, config_1.default.database.storage),
    modelPaths: [Path.join(__dirname, "/Models")],
});
