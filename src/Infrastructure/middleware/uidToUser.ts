import User from "../../Database/Models/User.Model";

export function uidToUser (req, res, next) {
    User.findOne({where: {id: req.body.uid}})
        .then((user) => {
            if(user) {
                req.body.user = user;
                next();
            } else {
             res.status(400).end();
            }
        })
        .catch(err => {
            res.status(500).end();
        })
}