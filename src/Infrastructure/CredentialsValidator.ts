import Client from "../Database/Models/Client.Model";
import {compare} from "bcrypt";
import User from "../Database/Models/User.Model";

export function validateReqBody(body) {
    if (body.grant_type === "password") {
        return body.uid && body.password;
    } else if (body.grant_type === "refresh_token") {
        return body.uid && body.refresh_token;
    } else {
        return false;
    }
}

export function validateClientCredentials(client_name: string, client_secret: string, user_id: string): PromiseLike<boolean> {
    return Client.scope("grants").findOne({where: {client_name}})
        .then(client => validateSecret(client, client_secret) && hasGrantFromUser(client, user_id))
        .then(result => result)

}

export function validateUserCredentials(user_id: string, password: string): PromiseLike<boolean> {
    return User.findOne({where: {id:user_id}})
        .then(user => compare(password, user.password))
}

function validateSecret(client, client_secret): Promise<boolean> {
    return compare(client_secret, client.client_secret);
}

function hasGrantFromUser(client, user_id) : Promise<boolean>{
    return client.UserGrants.includes(user_id);
}

