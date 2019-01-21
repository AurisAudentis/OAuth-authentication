import User from "../Database/Models/User.Model";
import Bluebird from "bluebird"

export function registerValidator(body) {
    return (body.email || body.uid) && body.password;
}

export function registerUser(body: {email: string, password: string, client_name: string, client_secret: string}): Promise<User>{
        //@ts-ignore This is a bluebird type, but we want promise. Atm, they are incompatible.
        return User.findOne({where: {email: body.email}})
            .then((user) => {if (user) throw {status: 409, err: "USER_EXISTS", message: "This user already exists"}})
            .then(() => User.create({email: body.email, password: body.password}))
}