import * as React from 'react';
import './areaSelector.css';
import { LocationRoutingProps } from "../../shared/routing";
import { ILocation } from "../../shared/models";
import { LocationService } from "../../services/locationService";
import store from "../../shared/redux/store";
import * as Actions from "../../shared/redux/actions";

export interface IAreaSelectorProps extends LocationRoutingProps {

}

export interface IAreaSelectorState {
    locations: ILocation[];
    selectedLocationId: string;
}

export class AreaSelector extends React.Component<IAreaSelectorProps, IAreaSelectorState> {
    constructor() {
        super();
        this.state = {
            locations: [],
            selectedLocationId: null
        };
        store.subscribe(() => {
            var selectedLocationId = store.getState().locationReducer.get("locationId");
            console.log("area sub", selectedLocationId);
            this.setState({ selectedLocationId: selectedLocationId });
        });
    }

    componentDidMount() {
        var locationService = new LocationService();
        locationService.getLocations().then(locations => {
            this.setState({ locations: locations });
        });
    }

    locationSelected(location: ILocation) {
        var action = Actions.locationChanged(location._id);
        console.log("locationSelected", action);
        store.dispatch(action);
    }

    render() {
        return (
            <div className="container">
                <h1>Area selector</h1>
                <div id="locations">
                    {
                        this.state.locations.map(location => {
                            return (
                                <div className={this.state.selectedLocationId === location._id ? "location well selected" : "location well"} key={location.name}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h3>{location.name}</h3>
                                        </div>
                                        <div className="col-md-4">
                                            <button className="btn btn-primary" onClick={() => this.locationSelected(location)}>Select</button>
                                        </div>
                                    </div>
                                </div>);
                        })
                    }
                </div>
            </div>
        );
    }
}

export default AreaSelector;