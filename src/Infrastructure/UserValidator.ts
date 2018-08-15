import User from "../Database/Models/User.Model";
import { validateSecret} from "./CredentialsValidator";
import Client from "../Database/Models/Client.Model";
import UserGrant from "../Database/Models/UserGrant.Model";

export function registerValidator(body) {
    return (body.email || body.uid) && body.password && body.client_name && body.client_secret;
}

export function registerUser(body: {email: string, password: string, client_name: string, client_secret: string}): Promise<User>{
    return Promise.resolve(Client.findOne({where: {client_name: body.client_name}})
        .then(client => {
        return validateSecret(client, body.client_secret)
            .then(result => {if(!result) throw {status: 401, err: "INVALID_SECRET", message:"The client secret is invalid"}})
            .then(() => User.findOne({where: {email: body.email}}))
            .then((user) => {if (user) throw {status: 409, err: "USER_EXISTS", message: "This user already exists"}})
            .then(() => User.create({email: body.email, password: body.password}))
            .then(user => addGrantForUser(user, client))
        }))
}

export function addGrantForUser(user: User, client: Client): User {
    UserGrant.create({userId: user.id, clientId: client.id});
    return user;
}