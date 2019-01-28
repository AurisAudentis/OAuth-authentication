import User from "../Database/Models/User.Model";
import { compare } from "bcryptjs";
import { generateRefreshToken } from "./TokenGenerator";


export function handleLoginRequest(req, res):Promise<void> {
    const mail = req.body.mail;
    const pass = req.body.pw;
    return emailToUser(mail)
        .then(user => compare(pass,user.password)
            .then((res) => {
                if(!res) {
                    throw {status: 401, message: "Invalid password"}
                }
            })
            .then(() => {
                const token = generateRefreshToken(user);
                res.cookie("token", token);
                res.send({success: true});
            })

        )
}

function emailToUser(email:string):Promise<User> {
    //@ts-ignore
    return User.findOne({where:{email}})
        .then(user => {if(!user) {throw {status: 400, message: "Invalid user"}}; return user;})
}   