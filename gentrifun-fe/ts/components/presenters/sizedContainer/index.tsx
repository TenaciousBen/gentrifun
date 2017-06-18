import * as React from "react";

export interface ISizedContainerProps {
    height: string;
}

export class SizedContainer extends React.Component<ISizedContainerProps, any> {
    render() {
        var containerStyle = {
            "maxHeight": this.props.height,
            "overflowY": "scroll"
        } as React.HTMLProps<any>;
        return (
            <div style={containerStyle}>
                {this.props.children}
            </div>
        );
    }
}

export default SizedContainer;