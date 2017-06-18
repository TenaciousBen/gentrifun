import * as React from 'react';

export interface IMonetaryState {
}

export interface IMonetaryProps extends React.Props<any> {
    value: number;
    currency: string;
}

class Monetary extends React.Component<IMonetaryProps, IMonetaryState> {
    private monetaryValue(currency: string, value: number): string {
        var formatter = Intl.NumberFormat("en-gb", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2
        });
        return formatter.format(value);
    }

    render() {
        var money = this.monetaryValue(this.props.currency, this.props.value);
        return (
            <span>{money}</span>
        );
    }
}

export default Monetary;
