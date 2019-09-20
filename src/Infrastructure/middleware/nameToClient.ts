import Client from "../../Database/Models/Client.Model";
import {logger} from "../Logger";

export function nameToClient (req, res, next) {
    Client.findOne({where: {client_name: req.body.client_name}})
        .then((client) => {
            if(client) {
                req.body.client = client;
                next();
            } else {
                res.status(401).end();
            }
        })
        .catch(err => {
            logger.warn(err);
            res.status(500).end();
        })
}