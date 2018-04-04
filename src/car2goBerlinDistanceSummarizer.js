const routeStatRepository = require('./repository/routeStatRepository');

(async function() {
    const result = await routeStatRepository.findSumDistanceInCityForProvider('berlin', 'car2go');

    const totalDistance = result.aggregations.total_distance.value;

    console.log(`Car2Go cars travelled ${totalDistance} meters in Berlin`);
})();