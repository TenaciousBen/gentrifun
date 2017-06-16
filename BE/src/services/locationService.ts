import {IDatabase} from "../repositories/database";

export class LocationService {
    private db: IDatabase;

    constructor(db: IDatabase) {
        this.db = db;
    }

    
}