let endpoints = {
    login: '/api/auth',
    me: '/api/user',
    users: '/api/users',
    schedules: '/api/schedules',
    places:'/api/places'
};

// if (window && (window.location.hostname === 'localhost' || /0\.0\.0\.0/.test(window.location.hostname))) {
    for (let e in endpoints) {
        if (endpoints.hasOwnProperty(e)) {
            endpoints[e] = `http://139.59.231.135/map/public${endpoints[e]}`;
        }
    }
// } else {
//     for (let e in endpoints) {
//         if (endpoints.hasOwnProperty(e)) {
//             endpoints[e] = `http://139.59.231.135/map/public${endpoints[e]}`;
//         }
//     }
// }

export const AppConfig = {
    apiEndpoints: endpoints
};
