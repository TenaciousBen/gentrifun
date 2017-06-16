import * as Mongoose from "mongoose";

export interface ICrime extends Mongoose.Document {
    category: string;
    locationType: string;
    context: string;
    outcomeStatus: OutcomeStatus;
    policeId: number;
    locationSubtype: string;
    year: number;
    month: number;
    latitude: number;
    longitude: number;
    locationId: string;
};

export interface OutcomeStatus {
    category: string;
    date: string;
}

export const CrimeSchema = new Mongoose.Schema(
    {
        category: {type: String, required: true},
        locationType: {type: String, required: true},
        context: {type: String, required: false},
        outcomeStatus: {type: Object, required: false},
        policeId: { type: Number, unique: true, required: true },
        locationSubtype: {type: String, required: false},
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        year: { type: Number, required: true },
        month: { type: Number, required: true },
        locationId: {type: Object, required: true}
    },
    {
        timestamps: true
    });

export const CrimeModel = Mongoose.model<ICrime>("Crime", CrimeSchema);