const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'shell',

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
    'react-router-dom',
    'primereact',
    'primereact/api',
    'react-dom/server',
    'react-dom/static'
  ],

  features: {
    ignoreUnusedDeps: true
  }
});
