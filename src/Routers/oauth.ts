import * as fs from "fs";
import * as path from "path";
import { emailToUser } from "../Infrastructure/LoginHandler";
import { generateJWT } from "../Infrastructure/TokenGenerator";

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
    emailToUser(req.body.mail)
        .then(user => 
            user.checkPassword(req.body.pw)
            .then(() => generateJWT(user))
            .then((jwt) => res.json({jwt}))
            )
})