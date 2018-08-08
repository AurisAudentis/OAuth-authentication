import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import User from "./User.Model";
import UserGrant from "./UserGrant.Model";

@Table
export default class Client extends Model<Client> {

    @Column(DataType.UUIDV4)
    id: string;

    @Column
    client_name: string;

    @Column
    client_secret: string;

    @BelongsToMany(() => User, () => UserGrant)
    @Column
    users: User[];

}