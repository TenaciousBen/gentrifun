import * as React from 'react';
import { ICrime } from "../../../shared/models";
import SizedContainer from "../sizedContainer";

export interface ICrimeTableState {
}

export interface ICrimeTableProps extends React.Props<any> {
    crimes: ICrime[];
}

class CrimeTable extends React.Component<ICrimeTableProps, ICrimeTableState> {
    render() {
        if (!this.props.crimes || !this.props.crimes.length) return <div />
        return (
            <SizedContainer height="25rem">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Type
                            </th>
                            <th>
                                Location
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
                            this.props.crimes.map(crime => {
                                return (
                                    <tr key={crime._id}>
                                        <td>
                                            {crime.category}
                                        </td>
                                        <td>
                                            {crime.locationType}
                                        </td>
                                        <td>
                                            {crime.latitude}
                                        </td>
                                        <td>
                                            {crime.longitude}
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

export default CrimeTable;
