import * as React from 'react';
import { LocationRoutingProps } from "../../shared/routing";
import NoLocationWarning from "../noLocationWarning";
import { Unsubscribe } from "redux";
import store from "../../shared/redux/store";
import { ILocation, ICrime, IHousingPrice } from "../../shared/models";
import { LocationService } from "../../services/locationService";
import { CrimeByLocationService } from "../../services/crimeByLocationService";
import { HousingPricesByLocationService } from "../../services/housingPricesByLocationService";
import { RouteComponentProps } from "react-router-dom";
import CrimeTable from "../presenters/crimeTable";
import HousingPricesTable from "../presenters/housingPricesTable";

interface IOverviewState {
    locationId: string;
    location: ILocation;
    crimes: ICrime[];
    prices: IHousingPrice[];
}

interface IOverviewProps extends RouteComponentProps<any> {
}

export class Overview extends React.Component<IOverviewProps, IOverviewState> {
    unsubscribe: Unsubscribe;
    constructor() {
        super();
        this.state = {
            locationId: null,
            location: null,
            crimes: [],
            prices: []
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            var locationId = store.getState().locationReducer.get("locationId");
            if (this.state.locationId !== locationId) this.loadLocationAndSetState(locationId);
        });
        var locationId = store.getState().locationReducer.get("locationId");
        if (locationId) this.loadLocationAndSetState(locationId);
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    private loadLocationAndSetState(locationId: string): Promise<void> {
        var locationService = new LocationService(), crimeService = new CrimeByLocationService(), housingPricesService = new HousingPricesByLocationService();
        return locationService.getLocations()
            .then(locations => {
                var location = locations.find(l => l._id === locationId);
                this.setState({ locationId: locationId, location: location });
                return crimeService.getCrimeByArea(locationId);
            })
            .then(crimes => {
                this.setState({ crimes });
                return housingPricesService.getHousingPricesByLocation(locationId);
            })
            .then(prices => {
                this.setState({ prices });
            });
    }

    render() {
        if (!this.state.location) return <NoLocationWarning />;
        return (
            <div className="container">
                <div className="well">
                    <h3>{this.state.location.name}</h3>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Latitide:</label>
                            <p>{this.state.location.latitude}</p>
                        </div>
                        <div className="col-md-12">
                            <label>Longitude:</label>
                            <p>{this.state.location.longitude}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Crimes</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <CrimeTable crimes={this.state.crimes}></CrimeTable>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Housing Prices</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <HousingPricesTable prices={this.state.prices}></HousingPricesTable>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Overview;