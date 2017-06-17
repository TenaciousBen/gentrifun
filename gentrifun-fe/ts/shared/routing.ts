import Router from "react-router-dom";

export interface LocationIdParams {
    id: string;
}

export interface LocationRoutingProps extends Router.RouteComponentProps<any> {
    match: Router.match<LocationIdParams>;
}