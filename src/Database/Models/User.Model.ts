import {BeforeCreate, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import UserGrant from "./UserGrant.Model";
import Client from "./Client.Model";
import {hash} from "bcrypt";
import v4 = require("uuid/v4");

@Table
export default class User extends Model<User> {
    @PrimaryKey
    @Column(DataType.UUIDV4)
    id: string;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    email: string;

    @Column
    password: string;

    @BelongsToMany(() => Client, () => UserGrant)
    clients: Client[];

    @BeforeCreate
    static hashPw(user: User) {
        return hash(user.password, 12)
            .then(hash => user.password = hash);
    }
    @BeforeCreate
    static makeId(user: User) {
        user.id = v4();
    }
}