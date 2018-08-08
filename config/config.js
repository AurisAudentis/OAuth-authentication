"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = process.env.NODE_ENV || "dev";
const dev = require('./dev');
const prod = require('./prod');
const test = require('./test.json');
const configs = {
    dev,
    prod,
    test
};
const config = configs[env];
exports.default = config;
