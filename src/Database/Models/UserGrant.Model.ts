import {BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import User from "./User.Model";
import Client from "./Client.Model";
import {idModel} from "../AbstractModels/idModel.Model";

@Scopes({
    client: {
        include: [{model: () => Client}]
    },
})
@Table
export default class UserGrant extends idModel<UserGrant> {

    @ForeignKey(() => User)
    @Column(DataType.STRING)
    userId: string;

    @ForeignKey(() => Client)
    @Column(DataType.STRING)
    clientId: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Client)
    client: Client;
}
