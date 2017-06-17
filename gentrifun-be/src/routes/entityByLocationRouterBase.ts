import {RouterBase} from "./routerBase";
import { IDatabase } from "../repositories/database";
import { Router, Request, Response, NextFunction } from 'express';
import * as Mongo from "mongodb";
import {Model, Document} from "mongoose";

export abstract class EntityByLocationRouterBase<T extends Document> extends RouterBase {
    constructor(db: IDatabase) {
        super(db);
    }

    protected async getEntityByLocation(model: Model<T>, req: Request, res: Response, next: NextFunction) {
        var locationId = req.params.locationId;
        var id = new Mongo.ObjectID(locationId);
        var entities = await model.find({locationId: id});
        res.send(entities);
    }
}