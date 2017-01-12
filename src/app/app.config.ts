let endpoints = {
    login: '/api/auth',
    me: '/api/user'
};

if (window && (window.location.hostname === 'localhost' || /0\.0\./.test(window.location.hostname))) {
    for (let e in endpoints) {
        if (endpoints.hasOwnProperty(e)) {
            endpoints[e] = `http://192.168.1.6:8001${endpoints[e]}`;
        }
    }
}

export const AppConfig = {
    apiEndpoints: endpoints
};
