import {registerUser, registerValidator} from "../Infrastructure/UserValidator";
import {uidToUser} from "../Infrastructure/middleware/uidToUser";
import {nameToClient} from "../Infrastructure/middleware/nameToClient";
import UserGrant from "../Database/Models/UserGrant.Model";
import {validateUserCredentials} from "../Infrastructure/CredentialsValidator";

const express = require('express');
export const userRouter = express.Router();

userRouter.post('/register', ((req, res) => {
    if (registerValidator(req.body)){
        registerUser(req.body)
            .then((user) => res.json({uid: user.id}))
            .catch((err) => res.status(err.status).json({err: err.err, message: err.message}))
    } else {
        res.status(400).json({err:"MALFORMED_REQUEST", message:"You did not specify the needed info."})
    }
}));

userRouter.post('/grant', uidToUser, nameToClient, (req, res) => {

    Promise.all<boolean, boolean>([registerValidator(req.body), validateUserCredentials(req.body.user, req.body.password)])
        .then((result) => {
            if(result[0] && result[1]) {
                UserGrant.create({userId: req.body.user.id, clientId: req.body.client.id})
                    .then(() => res.status(200).end())
                    .catch(() => res.status(500).end())
            } else {
                res.status(401).json({err:"INCORRECT_CREDENTIALS", message:"Your credentials are not valid."})
            }
        })
});