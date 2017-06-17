import { Router, Request, Response, NextFunction } from 'express';
import { RouterBase } from "./routerBase";
import { IDatabase } from "../repositories/database";
import { ICrime } from "../repositories/crime";
import * as Mongo from "mongodb";
import {EntityByLocationRouterBase} from "./entityByLocationRouterBase";

export class CrimeByLocationRouter extends EntityByLocationRouterBase<ICrime> {
    constructor(db: IDatabase) {
        super(db);
    }

    registerRoutes(): void {
        this.router.get("/api/crime-by-location/:locationId", this.get.bind(this));
    }

    public async get(req: Request, res: Response, next: NextFunction) {
        return this.getEntityByLocation(this.db.crimes, req, res, next);
    }
}