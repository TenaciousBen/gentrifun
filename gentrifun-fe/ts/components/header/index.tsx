import * as React from 'react';
//tsc doesn't understand this import: it will be emitted as-is, and is intended for webpack
import logo from './logo.svg';
import './header.css';
import { Link } from "react-router-dom";
import Spinner from "../spinner";
import store from "../../shared/redux/store";
import { Unsubscribe } from "redux";
import { routeChanged } from "../../shared/redux/actions";

export interface IHeaderState {
    active: string;
    locationId: string;
}

export interface IHeaderProps {

}

class Header extends React.Component<IHeaderProps, IHeaderState> {
    unsubscribe: Unsubscribe;
    constructor() {
        super();
        this.state = {
            active: "areaSelector",
            locationId: null
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            var locationId = store.getState().locationReducer.get("locationId");
            console.log("header sub", locationId);
            if (this.state.locationId !== locationId) this.setState({ locationId: locationId });
            var routeName = store.getState().routeReducer.get("routeName");
            if (this.state.active !== routeName) this.setState({ active: routeName });
        });
    }

    componentWillUmmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    route(routeName: string) {
        store.dispatch(routeChanged(routeName));
        this.setState({ active: routeName });
    }

    render() {
        return (
            <div id="header" className="container-fluid">
                <div className="brand">
                    <img src={logo} alt="logo" />
                    <h2>Gentrifun</h2>
                </div>
                <div className="pull-right">
                    <Spinner />
                </div>
                <nav className="navbar navbar-inverse navbar-static-top">
                    <ul className="nav navbar-nav">
                        <li className={this.state.active === "areaSelector" ? "active" : ""}>
                            <Link to="/" onClick={() => this.route("areaSelector")}>Area Selector</Link>
                        </li>
                        <li className={this.state.active === "overview" ? "active" : ""}>
                            <Link to={this.state.locationId ? `/overview/${this.state.locationId}` : "/overview"} onClick={() => this.route("overview")}>Overview</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;
