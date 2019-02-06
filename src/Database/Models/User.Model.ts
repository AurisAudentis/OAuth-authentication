import {BeforeCreate, Column, HasMany, Scopes, Table} from "sequelize-typescript";
import {hash, compare} from "bcryptjs";
import {idModel} from "../AbstractModels/idModel.Model";
import Token from "./Token.Model";
import moment = require("moment");

@Table
export default class User extends idModel<User> {

    @Column
    email: string;

    @Column
    password: string;

    @HasMany(() => Token)
    refreshTokens: Token[];

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

    checkPassword(pw: string): Promise<void> {
        return compare(pw,this.password)
            .then((res) => {
                if(!res) {
                    throw {status: 401, message: "Invalid password"}
                }
            })
    }

    @BeforeCreate
    static hashPw(user: User) {
        return hash(user.password, 12)
            .then(hash => user.password = hash);
    }


}