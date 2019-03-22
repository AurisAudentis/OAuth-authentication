import {registerUser, registerValidator} from "../Infrastructure/UserValidator";

import { handleAuthRequest } from "../Infrastructure/RedirectHandler";
import { handleLoginRequest } from "../Infrastructure/LoginHandler";
import { handleError } from "../Infrastructure/ErrorHandler";

const express = require('express');
export const ssoRouter = express.Router();

ssoRouter.get('/getToken', (req, res) => {
    handleAuthRequest(req, res)
        .catch(err => handleError(res, err))
});

ssoRouter.post('/login', (req, res) => {
    handleLoginRequest(req, res)
    .catch(err => handleError(res, err))
})

ssoRouter.post('/register', ((req, res) => {
    if (registerValidator(req.body)){
        registerUser(req.body)
            .then((user) => res.json({uid: user.id}))
            .catch(err => handleError(res, err))
        } else {
        res.status(400).json({err:"MALFORMED_REQUEST", message:"You did not specify the needed info."})
    }
}));