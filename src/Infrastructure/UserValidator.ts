import User from "../Database/Models/User.Model";

export function registerValidator(body) {
    body.email = body.mail ||body.email
    return (body.email || body.uid) && body.password;
}

export function registerUser(body: {email: string, password: string}): Promise<User>{
        //@ts-ignore This is a bluebird type, but we want promise. Atm, they are incompatible.
        return User.findOne({where: {email: body.email}})
            .then((user) => {if (user) throw {status: 409, err: "USER_EXISTS", message: "This user already exists"}})
            .then(() => User.create({email: body.email, password: body.password}))
}

export function validateTokenRequest(body) {
    if(!body.mail || !(body.pw || body.token)) {
        throw {status: 400, err:"INCOMPLETE_REQUEST", message: "Your request is incomplete."}
    }
}