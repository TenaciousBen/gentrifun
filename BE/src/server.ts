import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { CrimeByAreaRouter } from "./routes/crimeByArea";
import * as Database from "./repositories/database";

// Creates and configures an ExpressJS web server.
export default class ServerDefinition {

    // ref to Express instance
    public express: express.Application;
    private db: Database.IDatabase;

    //Run configuration methods on the Express instance.
    constructor(db: Database.IDatabase) {
        this.express = express();
        this.db = db;
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        var publicFolder = path.join(__dirname, 'public');
        this.express.use(express.static(publicFolder));
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
        this.registerRoute("/api/crime-by-area", CrimeByAreaRouter);
    }

    private registerRoute(route: string, routeType: any) {
        var routerController = new routeType(this.db);
        routerController.registerRoutes();
        this.express.use(route, routerController.router);
    }
}