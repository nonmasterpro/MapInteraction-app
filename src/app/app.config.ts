let endpoints = {
    login: '/api/auth',
    me: '/api/user'
};

if (window && (window.location.hostname === 'localhost' || /0\.0\.0\.0/.test(window.location.hostname))) {
    for (let e in endpoints) {
        if (endpoints.hasOwnProperty(e)) {
            endpoints[e] = `http://139.59.231.135${endpoints[e]}`;
        }
    }
} else {
    for (let e in endpoints) {
        if (endpoints.hasOwnProperty(e)) {
            endpoints[e] = `http://139.59.231.135${endpoints[e]}`;
        }
    }
}

export const AppConfig = {
    apiEndpoints: endpoints
};
