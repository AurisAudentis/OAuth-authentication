import {idModel} from "../AbstractModels/idModel.Model";
import {BelongsTo, Column, DataType, ForeignKey, Table} from "sequelize-typescript";
import User from "./User.Model";
import {Moment} from "moment";

@Table
export default class Token extends idModel<Token> {
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column(DataType.STRING)
    userId: string;

    @Column
    expAt: Date;
}