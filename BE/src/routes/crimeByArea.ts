import { Router, Request, Response, NextFunction } from 'express';
import { RouterBase } from "./routerBase";
import { IDatabase } from "../repositories/database";
import { ICrime } from "../repositories/crime";

export class CrimeByAreaRouter extends RouterBase {
    constructor(db: IDatabase) {
        super(db);
    }

    registerRoutes(): void {
        this.router.get("/", this.get);
    }

    public async get(req: Request, res: Response, next: NextFunction) {
        var locationId: Object = req.body.locationId;
        var fromYear: number = req.body.year;
        var crimes: ICrime[];
        if (fromYear) crimes = await this.db.crimes.find((c: ICrime) => c.locationId === locationId && c.year >= fromYear);
        else crimes = await this.db.crimes.find(c => c.locationId === locationId);
        res.send(crimes);
    }
}