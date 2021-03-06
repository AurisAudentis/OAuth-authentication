import User from "../Database/Models/User.Model";
import { generateRefreshToken } from "./TokenGenerator";


export function handleLoginRequest(req, res):Promise<void> {
    const mail = req.body.mail;
    const pass = req.body.pw;
    return emailToUser(mail)
        .then(user => user.checkPassword(pass)
            .then(() => {
                const token = generateRefreshToken(user);
                res.cookie("token", token);
                res.send({success: true});
            })

        )
}

export function emailToUser(email:string):Promise<User> {
    //@ts-ignore
    return User.findOne({where:{email}})
        .then(user => {if(!user) {throw {status: 400, message: "Invalid user"}}; return user;})
}   