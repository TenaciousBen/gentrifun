export interface Document {
    _id: string;
}

export interface ICrime extends Document {
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

export interface IHousingPrice extends Document {
    bedrooms: number;
    type: string;
    price: number;
    month: number;
    year: number;
    latitude: number;
    longitude: number;
    locationId: string;
};

export interface ILocation extends Document {
    name: string;
    latitude: number;
    longitude: number;
    boundary: number[];
};