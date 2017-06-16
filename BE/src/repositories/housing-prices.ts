import * as Mongoose from "mongoose";

export interface IHousingPrice extends Mongoose.Document {
    bedrooms: number;
    type: string;
    price: number;
    month: number;
    year: number;
    latitude: number;
    longitude: number;
    locationId: string;
};

export const HousingPriceSchema = new Mongoose.Schema(
    {
        bedrooms: { type: Number, required: true },
        type: {type: String, required: true},
        price: {type: Number, required: true},
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        year: { type: Number, required: true },
        month: { type: Number, required: true },
        locationId: {type: Object, required: true}
    },
    {
        timestamps: true
    });

export const HousingPriceModel = Mongoose.model<IHousingPrice>("HousingPrice", HousingPriceSchema);