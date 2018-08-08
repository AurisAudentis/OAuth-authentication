import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./User.Model";
import Client from "./Client.Model";

@Table
export default class UserGrant extends Model<UserGrant> {
    @ForeignKey(() => User)
    @Column(DataType.UUIDV4)
    userId: string;

    @ForeignKey(() => Client)
    @Column(DataType.UUIDV4)
    clientId: string;
}
