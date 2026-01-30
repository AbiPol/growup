const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
    name: 'student',
    exposes: {
        './Routes': './projects/student/src/app/app.routes.ts',
        './studentRoutes': './projects/student/src/app/app.routes.ts'
    },
    shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    },
    skip: [
        'rxjs/ajax',
        'rxjs/fetch',
        'rxjs/testing',
        'rxjs/webSocket',
        'react',
        'react-dom',
        'react-dom/server',
        'react-dom/static',
        'react-router-dom',
        'primereact',
        'primereact/api'
    ],
    features: {
        ignoreUnusedDeps: true
    }
});
