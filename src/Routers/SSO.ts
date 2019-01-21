import { generateTokens } from "../Infrastructure/TokenGenerator";
import { any } from "bluebird";
import {join} from "path";
import config from "../../config/config"
import { handleAuthRequest } from "../Infrastructure/RedirectHandler";

const express = require('express');
export const ssoRouter = express.Router();

ssoRouter.get('/getToken', (req, res) => {
    handleAuthRequest(req, res)
        .catch(err => {res.status(err.status); res.json(err.message);})
})

ssoRouter.get('/setToken', (req, res) => {
    res.cookie("test", "yay!");
    res.redirect("getToken?wut=yes");
})