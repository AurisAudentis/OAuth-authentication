import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import UserGrant from "./UserGrant.Model";
import Client from "./Client.Model";

@Table
export default class User extends Model<User> {

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
    @Column
    clients: Client[];
}