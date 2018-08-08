"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_Model_1 = __importDefault(require("./User.Model"));
const UserGrant_Model_1 = __importDefault(require("./UserGrant.Model"));
const bcrypt_1 = require("bcrypt");
const v4 = require("uuid/v4");
let Client = class Client extends sequelize_typescript_1.Model {
    static hashSecret(client) {
        return bcrypt_1.hash(client.client_secret, 12)
            .then(hash => client.client_secret = hash);
    }
    static makeId(client) {
        client.id = v4();
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUIDV4),
    __metadata("design:type", String)
], Client.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "client_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "client_secret", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => User_Model_1.default, () => UserGrant_Model_1.default),
    __metadata("design:type", Array)
], Client.prototype, "users", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Client]),
    __metadata("design:returntype", void 0)
], Client, "hashSecret", null);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Client]),
    __metadata("design:returntype", void 0)
], Client, "makeId", null);
Client = __decorate([
    sequelize_typescript_1.Table
], Client);
exports.default = Client;
