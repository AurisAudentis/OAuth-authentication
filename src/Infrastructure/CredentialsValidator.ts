import Client from "../Database/Models/Client.Model";
import {compare} from "bcrypt";
import User from "../Database/Models/User.Model";

export function validateReqBody(body) {
    if (body.grant_type === "password") {
        return !!(body.uid && body.password && body.client_name && body.client_secret);
    } else if (body.grant_type === "refresh_token") {
        return !!(body.uid && body.refresh_token && body.client_name && body.client_secret);
    } else {
        return false;
    }
}

export function validateGrants(body: {user, grant_type, client_name, client_secret, password?, refresh_token?}) {
    if(body.grant_type === "password") {
        return Promise.all([validateClientCredentials(body.client_name, body.client_secret, body.user), validateUserCredentials(body.user, body.password)])
            .then(results => results[0] && results[1]);
    } else {
        return body.user.isValidToken(body.refresh_token);
    }
}


 function validateClientCredentials(client_name: string, client_secret: string, user: User): Promise<boolean> {
    // @ts-ignore
    return Client.scope("grants").findOne({where: {client_name}})
        .then(client => validateSecret(client, client_secret) && hasGrantFromUser(client, user.id))
        .then(result => result)

}

 function validateUserCredentials(user: User, password: string): Promise<boolean> {
    return compare(password, user.password);
}

function validateSecret(client, client_secret): Promise<boolean> {
    return compare(client_secret, client.client_secret);
}

function hasGrantFromUser(client, user_id) : Promise<boolean>{
    return client.userGrants.map(grant => grant.userId).includes(user_id);
}