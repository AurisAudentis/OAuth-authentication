import {Column, DataType, Model, Table} from "sequelize-typescript";

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
}