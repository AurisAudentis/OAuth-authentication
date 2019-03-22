import * as fs from "fs";
import * as path from "path";
import { emailToUser } from "../Infrastructure/LoginHandler";
import { generateJWT, generateRefreshToken } from "../Infrastructure/TokenGenerator";
import { handleError } from "../Infrastructure/ErrorHandler";
import { validateTokenRequest } from "../Infrastructure/UserValidator";
import { generateTokenFromCookie } from "../Infrastructure/RedirectHandler";

const express = require('express');
export const oauthRouter = express.Router();

export const key = fs.readFileSync(path.join(__dirname, "../../config/public.key"));

oauthRouter.get('/key', (req, res) => {
    res.contentType("text/plain");
    res.send(key);
});

oauthRouter.post('/token', (req, res) => {
    req.body.pw = req.body.password || req.body.pw;
    req.body.mail = req.body.email || req.body.mail;
    validateTokenRequest(req.body);
    emailToUser(req.body.mail)
        .then(user => {
            if(req.body.pw) {
                return user.checkPassword(req.body.pw)
                .then(() => generateJWT(user))
                .then((jwt) => res.json({jwt, refr: generateRefreshToken(user)}))
            } else {
                return generateTokenFromCookie(req.body.token)
                        .then(jwt => res.json({jwt, refr: req.body.token}))
            }

        })
    .catch(err => handleError(res, err))
})