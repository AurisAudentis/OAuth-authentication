import {registerUser, registerValidator} from "../Infrastructure/UserValidator";

import { handleAuthRequest } from "../Infrastructure/RedirectHandler";
import { handleLoginRequest } from "../Infrastructure/LoginHandler";

const express = require('express');
export const ssoRouter = express.Router();

ssoRouter.get('/getToken', (req, res) => {
    handleAuthRequest(req, res)
        .catch(err => {res.status(err.status); res.json(err);})
});

ssoRouter.post('/login', (req, res) => {
    handleLoginRequest(req, res)
        .catch(err => {res.status(err.status); res.json(err)})
})

ssoRouter.post('/register', ((req, res) => {
    if (registerValidator(req.body)){
        registerUser(req.body)
            .then((user) => res.json({uid: user.id}))
            .catch((err) => res.status(err.status).json({err: err.err, message: err.message}))
    } else {
        res.status(400).json({err:"MALFORMED_REQUEST", message:"You did not specify the needed info."})
    }
}));