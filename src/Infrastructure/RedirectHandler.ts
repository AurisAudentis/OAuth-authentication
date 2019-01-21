import config from "../../config/config";
import { verify } from "jsonwebtoken";
import { key } from "../Routers/oauth";
import User from "../Database/Models/User.Model";
import { generateTokens } from "./TokenGenerator";



export function handleAuthRequest(req, res): Promise<{}> { //TODO: Wow, this needs some cleanup...

    const cookie = req.cookies.token
    const redirect = req.query.redirect

    const wrapper = (url) => {
        const handle = (resolve, reject) => {
            if(!validateRequest(url)) {
                reject({status: 401, message: "Your hostname is not recognized."});
                return;
            }
            if(redirectIfNoCookie(res, url, cookie)) {return;}
            else {
                generateTokenFromCookie(cookie)
                    .then(tokens => {
                        res.redirect(redirect + `/?acct=${tokens.access_token}&refrt=${tokens.refresh_token}`)
                        res.send();
                    });
            }
        }
        return new Promise(handle);
    }
   
    return promiseWrappedUrl(redirect)
                        .then(wrapper);
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
        res.redirect("../s/login.html");
        res.send();
    }
    return(!cookie);
}

function validateRequest(origin: URL): boolean {
    return config.allowed_redirects.includes(origin.hostname);
}

function generateTokenFromCookie(token) {
    return new Promise((resolve, reject) => {
        verify(token, key, (err, decrypted) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(decrypted.uid);
        })
    })
    .then((uid) => User.findOne({where: {id: uid}}))
    .then(generateTokens)
}