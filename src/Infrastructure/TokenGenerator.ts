import {sign} from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";
import User from "../Database/Models/User.Model";
import v4 = require("uuid/v4");

// Run on startup, might as well be sync.
const privkey = fs.readFileSync(path.join(__dirname, "../../config/private.key"), 'utf8');

export function generateJWT(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
        sign({uid:user.id}, privkey, {expiresIn: "1h", audience:"maxiemgeldhof.com", algorithm:  "RS256"}, (err, errOrToken) => {
            if (err) {
                reject(err);
            } else {
                resolve(errOrToken)
            }
        })
    })
}

export function generateRefreshToken(user: User) {
    const refrToken = v4();
    user.setToken(refrToken);
    return refrToken;
}