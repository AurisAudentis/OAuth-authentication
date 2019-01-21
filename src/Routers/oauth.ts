import * as fs from "fs";
import * as path from "path";

const express = require('express');
export const oauthRouter = express.Router();

export const key = fs.readFileSync(path.join(__dirname, "../../config/public.key"));

oauthRouter.get('/key', (req, res) => {
    res.contentType("text/plain");
    res.send(key);
});
