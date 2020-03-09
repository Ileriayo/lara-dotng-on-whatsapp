export default directionParams => {
    if (typeof directionParams !== 'object') return directionParams;

    const routes = directionParams[1].Legs[0];
    const directionTemplate = routes.map((route) => {
        if (route.Vehicle && route.Vehicle.Type !== 'Walk') {
            const {
                Vehicle: { Type, MinFare },
                HeadSign,
                Start,
                End,
            } = route;
            return `\n*Take a ${Type}*\nFrom: ${Start.Name}\nHeading Toward: ${End.Name}\nGet off at: ${HeadSign}\n*Price: ₦${MinFare}*\n`;
        } else {
            if (!route.Info) return `\nWalk to ${route.End.Name}\n`;

            const { Info } = route;
            return `\nWalk to your destination\nTotal Estimate: ₦${
            Info.MinFare
            } - ${
            Info.MaxFare
            }\n\nEstimated Travel Time: ${Info.TravelTime.trim()}`;
        }
    }).join('');

    return directionParams[0] + '\n' + directionTemplate;
}