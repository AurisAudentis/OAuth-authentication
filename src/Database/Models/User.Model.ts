import {BeforeCreate, Column, HasMany, Scopes, Table} from "sequelize-typescript";
import UserGrant from "./UserGrant.Model";
import {hash} from "bcrypt";
import {idModel} from "../AbstractModels/idModel.Model";
import v4 = require("uuid/v4");
import Token from "./Token.Model";
import Client from "./Client.Model";
import moment = require("moment");

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

    isValidToken(tokenId): Promise<boolean> {
        // @ts-ignore
        return this.$get<Token[]>("refreshTokens")
            .then(tokens => tokens.find(token => token.id === tokenId))
            .then(token => moment(token.expAt).isAfter(moment()))
    }

    setToken(tokenId) {
        return Token.destroy({where: {userId: this.id}})
            .then(() => this.$create("refreshToken", {id: tokenId, expAt: moment().add(2, 'days').toDate()}))
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