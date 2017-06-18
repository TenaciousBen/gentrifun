import * as React from 'react';
import './spinner.css';
import store from "../../shared/redux/store";
import {Unsubscribe} from "redux";

export interface ISpinnerProps {

}

export interface ISpinnerState {
    display: boolean;
}

export class Spinner extends React.Component<ISpinnerProps, ISpinnerState> {
    unsubscribe: Unsubscribe;
    constructor() {
        super();
        this.state = {
            display: false
        };
    }

    componentDidMount() {
        store.subscribe(() => {
            var callsRemaining = store.getState().apiReducer.get("activeApiCalls");
            console.log("spinner sub", callsRemaining);
            var display = callsRemaining > 0;
            if (this.state.display !== display) this.setState({ display: display })
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    render() {
        if (!this.state.display) return <div></div>;

        return (
            <div >
                <p>Loading</p>
            </div>
        );
    }
}

export default Spinner;