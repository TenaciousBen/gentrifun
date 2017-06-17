import { Router, Request, Response, NextFunction } from 'express';
import { RouterBase } from "./routerBase";
import { IDatabase } from "../repositories/database";
import { IHousingPrice } from "../repositories/housingPrices";
import * as Mongo from "mongodb";
import {EntityByLocationRouterBase} from "./entityByLocationRouterBase";

export class HousingPricesByLocationRouter extends EntityByLocationRouterBase<IHousingPrice> {
    constructor(db: IDatabase) {
        super(db);
    }

    registerRoutes(): void {
        this.router.get("/api/housing-prices-by-location/:locationId", this.get.bind(this));
    }

    public async get(req: Request, res: Response, next: NextFunction) {
        return this.getEntityByLocation(this.db.housingPrices, req, res, next);
    }
}