import cookieParser from "cookie-parser";
import morgan from "morgan";

import express from "express";
import config from "../config/config";
import {logger} from "./Infrastructure/Logger";
import {oauthRouter} from "./Routers/oauth";
import {userRouter} from "./Routers/User";
import { ssoRouter } from "./Routers/SSO";
import path from "path";


export class app {
    public app = express();
    private instance;

    private setupLogging =
        { 'dev': this.debugLogging,
            'prod': this.prodLogging};

    public launch(port: number) {
        this.setup();
        this.routers();
        this.instance = this.app.listen(port);
        logger.info(`Started server at port ${port}.`);
    }

    public exit(){
        if (this.instance){
            this.instance.close();
        }
    }

    private setup(): void {
        this.setupLogging[config.logging].bind(this)();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use('/oauth/s', express.static(path.join(__dirname, '../views')));
        console.log(__dirname);
    }

    private debugLogging() {
        this.app.use(morgan('dev'));
    }

    private prodLogging() {
        this.app.use(morgan('combined', { skip: function(req, res) { return res.statusCode < 400 }, stream: {write: message => logger.info(message.trim())} }));

    }

    private routers(): void {
        this.app.use('/oauth/user', userRouter);
        this.app.use('/oauth', oauthRouter);
        this.app.use("/oauth/sso", ssoRouter);
    }
}




