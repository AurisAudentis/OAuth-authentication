import {idModel} from "../AbstractModels/idModel.Model";
import {BelongsTo, Column, ForeignKey, Table} from "sequelize-typescript";
import User from "./User.Model";
import {Moment} from "moment";

@Table
export default class Token extends idModel<Token> {
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @Column
    expAt: Date;
}