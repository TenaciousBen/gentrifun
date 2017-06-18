import * as React from 'react';
import './spinner.css';
import store from "../../shared/redux/store";

export interface ISpinnerProps {

}

export interface ISpinnerState {
    display: boolean;
}

export class Spinner extends React.Component<ISpinnerProps, ISpinnerState> {
    constructor() {
        super();
        this.state = {
            display: false
        };
        store.subscribe(() => {
            var callsRemaining = store.getState().apiReducer.get("activeApiCalls");
            console.log("spinner sub", callsRemaining);
            this.setState({ display: callsRemaining > 0 })
        });
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