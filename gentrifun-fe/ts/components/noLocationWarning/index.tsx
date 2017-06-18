import * as React from 'react';
import './noLocationWarning.css';
import { Link } from "react-router-dom";
import store from "../../shared/redux/store";
import  {routeChanged} from "../../shared/redux/actions";

export interface INoLocationWarningState {
    locationIsSelected: boolean;
}

export interface INoLocationWarningProps extends React.Props<any> {
}

class NoLocationWarning extends React.Component<INoLocationWarningProps, INoLocationWarningState> {
    private notifyRouteChanged() {
        store.dispatch(routeChanged("areaSelector"));
    }

    render() {
        return (
            <div id="no-location-warning" className="container">
                <div className="well">
                    <h3>Please select a location</h3>
                    <p>No location is selected. Please <Link to="/" onClick={() => this.notifyRouteChanged()}>select a location</Link> to see area information.</p>
                </div>
            </div>
        )
    }
}

export default NoLocationWarning;
