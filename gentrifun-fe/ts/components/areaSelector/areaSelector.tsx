import * as React from 'react';
import './areaSelector.css';
import { LocationRoutingProps } from "../../shared/routing";
import { ILocation } from "../../shared/models";
import { LocationService } from "../../services/locationService";

export interface IAreaSelectorProps extends LocationRoutingProps {

}

export interface IAreaSelectorState {
    locations: ILocation[];
}

export class AreaSelector extends React.Component<IAreaSelectorProps, IAreaSelectorState> {
    constructor() {
        super();
        this.state = this.getInitialState();
    }

    getInitialState(): IAreaSelectorState {
        return {
            locations: []
        };
    }

    componentDidMount() {
        var locationService = new LocationService();
        locationService.getLocations().then(locations => {
            console.log("locations", locations);
            this.setState({ locations: locations });
        });
    }

    render() {
        console.log("rendering");
        console.log(this.state.locations);
        return (
            <div>
                <h1>Area selector</h1>
                <div id="locations">
                    {
                        this.state.locations.map(location => {
                            return (
                                <div className="location">
                                    <h3>{location.name}</h3>
                                </div>);
                        })
                    }
                </div>
            </div>
        );
    }
}

export default AreaSelector;