import {BeforeCreate, Column, HasMany, Scopes, Table} from "sequelize-typescript";
import UserGrant from "./UserGrant.Model";
import {hash} from "bcrypt";
import {idModel} from "../AbstractModels/idModel.Model";
import v4 = require("uuid/v4");
import Token from "./Token.Model";
import Client from "./Client.Model";

@Scopes({
    full: {
        include: [{
            model: () => UserGrant.scope("client")
        }]
    },
})
@Table
export default class User extends idModel<User> {

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    email: string;

    @Column
    password: string;

    @HasMany( () => UserGrant, "userId")
    clientGrants: UserGrant[];

    @HasMany(() => Token)
    refreshTokens: Token[];

    getClients(): Promise<Client[]> {
        // @ts-ignore
        return this.$get<UserGrant[]>("clientGrants", {scope: ['client']})
            .then(grants => grants.map(grant => grant.client))
    }

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