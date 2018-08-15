import {BeforeCreate, Column, DataType, HasMany, Scopes, Table} from "sequelize-typescript";
import UserGrant from "./UserGrant.Model";
import {hash} from "bcrypt";
import {idModel} from "../AbstractModels/idModel.Model";


@Scopes({
    grants: {
        include:[() => UserGrant],
    }
})
@Table
export default class Client extends idModel<Client> {

    @Column(DataType.STRING)
    client_name: string;

    @Column
    client_secret: string;

    @HasMany(() => UserGrant)
    userGrants: UserGrant[];

    @BeforeCreate
    static hashSecret(client: Client) {
        return hash(client.client_secret, 12)
            .then(hash => client.client_secret = hash);
    }


}