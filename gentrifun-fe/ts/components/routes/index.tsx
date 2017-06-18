import { Switch, Route } from 'react-router-dom';
import * as React from 'react';
import Header from "../header";
import AreaSelector from "../areaSelector";
import Overview from "../overview";

class Routes extends React.Component<{},{}> {
    constructor() {
        super();
    }

    render() {
        return (
            <main>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={AreaSelector} />
                        <Route exact path='/overview' component={Overview} />
                        <Route path='/overview/:id' component={Overview} />
                    </Switch>
                </div>
            </main>
        );
    }
}

export default Routes;