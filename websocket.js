require('dotenv').config();

const env = process.env;
const EchoServer = require('laravel-echo-server');

const options = {
    authHost: env.APP_URL,
    authEndpoint: "/api/broadcasting/auth",
    clients: [],
    database: "redis",
    databaseConfig: {
        redis: {},
        sqlite: {
            databasePath: "/database/laravel-echo-server.sqlite"
        }
    },
    devMode: env.APP_ENV !== 'production',
    host: null,
    port: "6001",
    protocol: "http",
    socketio: {},
    secureOptions: 67108864,
    sslCertPath: "",
    sslKeyPath: "",
    sslCertChainPath: "",
    sslPassphrase: "",
    subscribers: {
        http: true,
        redis: true
    },
    apiOriginAllow: {
        allowCors: false,
        allowOrigin: "",
        allowMethods: "",
        allowHeaders: ""
    }
};

EchoServer.run(options);
