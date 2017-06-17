import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { CrimeByLocationRouter } from "./routes/crimeByLocationRouter";
import { HousingPricesByLocationRouter } from "./routes/housingPricesByLocationRouter";
import { LocationsRouter } from "./routes/locationsRouter";
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
        this.registerRouter(CrimeByLocationRouter);
        this.registerRouter(HousingPricesByLocationRouter);
        this.registerRouter(LocationsRouter);
    }

    private registerRouter(routerClass: any): void {
        var router = new routerClass(this.db);
        router.registerRoutes();
        this.express.use(router.router);
    }
}