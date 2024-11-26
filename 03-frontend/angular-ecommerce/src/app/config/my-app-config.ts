export default {
    auth: {
        domain: "dev-8i1wfl00nbb8wcjo.us.auth0.com", //Ex: dev-xxxxxxxxxxx.us.auth0.com
        clientId: "96FMyHWayFtHGUbPXlinZNQqdRZT5eWo",
        authorizationParams: {
            redirect_uri: "http://localhost:4200/login/callback",
            audience: "http://localhost:8080",
        },
    },
    httpInterceptor: {
        allowedList: ['http://localhost:8080/api/orders/**', 'http://localhost:8080/api/checkout/purchase'],
    },
}
