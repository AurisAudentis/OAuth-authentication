import config from "../../config/config";
import { verify } from "jsonwebtoken";
import { key } from "../Routers/oauth";
import User from "../Database/Models/User.Model";
import { generateJWT } from "./TokenGenerator";
import Token from "../Database/Models/Token.Model";



export function handleAuthRequest(req, res): Promise<void> { //TODO: Wow, this needs some cleanup...

    const cookie = req.cookies.token
    const redirect = req.query.redirect

   
    return promiseWrappedUrl(redirect)
                        .then((url: URL) => validateOrigin(url))
                        .then((url) => {redirectIfNoCookie(res, url, cookie) || sendTokensFromCookie(res, url, cookie)})

}

function sendTokensFromCookie(res, url:URL, cookie) {
    return generateTokenFromCookie(cookie)
            .then((token) => {
                res.redirect(url.href + "?accesstoken=" + token);
            })
}

function promiseWrappedUrl(urlS:string): Promise<URL> {

    const then = (resolve, reject) => { //Wrapper for the promise
        try {
            const url = new URL(urlS);
            resolve(url);
        } catch {
            reject({status: 401, message:"No valid URL specified."})
        }
    }

    return new Promise(then);
}

function redirectIfNoCookie(res, url, cookie): boolean {
    if(!cookie){
        res.cookie("redirect", url);
        res.redirect("../s/login.html?redirect=" +url);
        res.send();
    }
    return(!cookie);
}

function validateOrigin(origin: URL): URL {
    if (!config.allowed_redirects.includes(origin.hostname)) {
        throw {status: 401, message: "Your origin is not recognized."}
    }

    return origin; // For easy chaining
}

export function generateTokenFromCookie(token): PromiseLike<string> {
    return Token.findOne({where: {id: token}, include: [User]})
        .then(token => {if (!token) {throw {status: 400}} return token})
        .then(token => generateJWT(token.user))
}

