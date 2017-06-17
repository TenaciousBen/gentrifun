import * as React from 'react';
import {LocationRoutingProps} from "../../shared/routing";

interface IOverviewState {

}

interface IOverviewProps extends LocationRoutingProps {
}

export class Overview extends React.Component<IOverviewProps, IOverviewState> {
    render() {
        var title = "Overview";
        if (this.props && this.props.match && this.props.match.params && this.props.match.params.id) title += this.props.match.params.id;
        return (
            <div>
                <h1>{title}</h1>
            </div>
        );
    }
}

export default Overview;