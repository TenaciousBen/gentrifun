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
        this.state = {
            locations: []
        };
    }

    componentDidMount() {
        var locationService = new LocationService();
        locationService.getLocations().then(locations => {
            this.setState({ locations: locations });
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Area selector</h1>
                <div id="locations">
                    {
                        this.state.locations.map(location => {
                            return (
                                <div className="location well" key={location.name}>
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