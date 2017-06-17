import { Router, Request, Response, NextFunction } from 'express';
import { RouterBase } from "./routerBase";
import { IDatabase } from "../repositories/database";
import { IHousingPrice } from "../repositories/housingPrices";
import * as Mongo from "mongodb";
import {EntityByLocationRouterBase} from "./entityByLocationRouterBase";

export class LocationsRouter extends RouterBase {
    constructor(db: IDatabase) {
        super(db);
    }

    registerRoutes(): void {
        this.router.get("/api/location", this.get.bind(this));
        this.router.get("/api/location/:locationId", this.getById.bind(this));
    }

    public async get(req: Request, res: Response, next: NextFunction) {
        var locations = await this.db.locations.find({});
        res.send(locations);
    }

    public async getById(req: Request, res: Response, next: NextFunction) {        
        var locationId = req.params.locationId;
        var id = new Mongo.ObjectID(locationId);
        var location = await this.db.locations.findById(locationId);
        res.send(location);
    }
}