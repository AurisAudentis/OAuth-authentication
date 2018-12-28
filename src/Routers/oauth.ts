import {validateGrants, validateReqBody} from "../Infrastructure/CredentialsValidator";
import {uidToUser} from "../Infrastructure/middleware/uidToUser";
import {generateTokens} from "../Infrastructure/TokenGenerator";
import * as fs from "fs";
import * as path from "path";

const express = require('express');
export const oauthRouter = express.Router();

const key = fs.readFileSync(path.join(__dirname, "../../config/public.key"));

oauthRouter.post('/token', uidToUser, (req, res) => {
    if(!validateReqBody(req.body)) {res.status(400).json({message: "Your request is invalid."}).end(); return;}

    validateGrants(req.body).then((valid) => {
        if (valid) {
            generateTokens(req.body.user)
                .then(tokens => res.json(tokens));
        } else {
            res.status(401).end();
        }
    });
});

oauthRouter.get('/key', (req, res) => {
    res.contentType("text/plain");
    res.send(key);
});
