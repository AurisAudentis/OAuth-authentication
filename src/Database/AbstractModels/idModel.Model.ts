import {BeforeCreate, Column, DataType, Model, PrimaryKey} from "sequelize-typescript";
import v4 = require("uuid/v4");


export abstract class idModel<T extends Model<T>> extends Model<T>{
    @PrimaryKey
    @Column(DataType.STRING)
    id: string;

    @BeforeCreate
    static makeId(idModel) {
        idModel.id = v4();
    }
}