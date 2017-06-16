import { Router, Request, Response, NextFunction } from 'express';
import { IDatabase } from "../repositories/database";

export abstract class RouterBase {
    protected db: IDatabase;
    public router: Router;
    constructor(db: IDatabase) {
        db = db;
    }

    abstract registerRoutes(): void;
}