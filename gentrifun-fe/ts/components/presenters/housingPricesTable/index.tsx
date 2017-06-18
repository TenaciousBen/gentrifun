import * as React from 'react';
import { IHousingPrice } from "../../../shared/models";
import SizedContainer from "../sizedContainer";
import Monetary from "../monetary";

export interface IHousingPriceTableState {
}

export interface IHousingPriceTableProps extends React.Props<any> {
    prices: IHousingPrice[];
}

class HousingPricesTable extends React.Component<IHousingPriceTableProps, IHousingPriceTableState> {
    render() {
        if (!this.props.prices || !this.props.prices.length) return <div />
        return (
            <SizedContainer height="25rem">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Type
                            </th>
                            <th>
                                bedrooms
                            </th>
                            <th>
                                price
                            </th>
                            <th>
                                Latitude
                            </th>
                            <th>
                                Longitude
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.prices.map(price => {
                                return (
                                    <tr key={price._id}>
                                        <td>
                                            {price.type}
                                        </td>
                                        <td>
                                            {price.bedrooms}
                                        </td>
                                        <td>
                                            <Monetary currency="GBP" value={price.price}></Monetary>
                                        </td>
                                        <td>
                                            {price.latitude}
                                        </td>
                                        <td>
                                            {price.longitude}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </SizedContainer>
        )
    }
}

export default HousingPricesTable;
