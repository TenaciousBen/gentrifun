import * as Mongoose from "mongoose";

export interface ILocation extends Mongoose.Document {
    name: string;
    latitude: number;
    longitude: number;
    //an array of lat/long points that form the boundary of the location for geospatial searching
    boundary: number[];
};

export const LocationSchema = new Mongoose.Schema(
    {
        name: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        boundary: { type: Array, required: false }
    },
    {
        timestamps: true
    });

export const LocationModel = Mongoose.model<ILocation>("Location", LocationSchema);