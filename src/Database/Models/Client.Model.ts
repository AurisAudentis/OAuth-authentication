import {BeforeCreate, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import User from "./User.Model";
import UserGrant from "./UserGrant.Model";
import {hash} from "bcrypt";
import v4 = require("uuid/v4");

@Table
export default class Client extends Model<Client> {
    @PrimaryKey
    @Column(DataType.UUIDV4)
    id: string;

    @Column
    client_name: string;

    @Column
    client_secret: string;

    @BelongsToMany(() => User, () => UserGrant)
    users: User[];

    @BeforeCreate
    static hashSecret(client: Client) {
        return hash(client.client_secret, 12)
            .then(hash => client.client_secret = hash);
    }

    @BeforeCreate
    static makeId(client: Client) {
        client.id = v4();
    }
}