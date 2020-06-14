const Dotenv = require('dotenv-webpack')

module.exports = {
  /* config options here */
  webpack(config) {
    config.plugins.push(
        new Dotenv({
          path: './.env.local',
          systemvars: true,
        })
      );

    return config;
  },
  crossOrigin: 'anonymous', // CORS aware request
  poweredByHeader: false, // Remove nextJS header,
}
