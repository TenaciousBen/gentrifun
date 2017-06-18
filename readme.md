# Prerequisites

1. Yarn should be installed globally
2. A local MongoDB should be running, and accessible at `mongodb://localhost/`

# First install

1. Open a terminal at both the be and fe project
2. In both projects run `yarn install`
3. In the BE project run `yarn run seed` to seed the mongodb with dummy data
4. In the BE project run `yarn start` to bootup the server (run `yarn test` if you want to see tests)
5. In the FE project run `yarn start` to bootup the react-scripts app server
6. Go to `http://localhost:3000` if you aren't automatically taken there by react-scripts

# Future roadmap

This is the barest start for this project possible. Future releases should contain:

1. Month-by-month reporting for crime and housing prices
2. Interactive ChartJS reports
3. Integration with the datasources listed in the `Future data sources.txt` file
4. Housing appreciation predictor against desired second home deposit
5. Integration with a 3rd party housing listing provider (e.g. zoopla)
6. Housing searches within distance of amenity (e.g. x km from transport, x km from shops)
7. Housing searches along a given transport route, with searching by time to destination (e.g. 30 mins from liverpool street station)