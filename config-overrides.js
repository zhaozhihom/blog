module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack(config, env) {

    // Drop noisy eslint pre-rule
    config.module.rules.splice(1, 1);

    // Drop noisy tslint plugin
    const EXCLUDED_PLUGINS = ['ForkTsCheckerWebpackPlugin'];
    config.plugins = config.plugins.filter(plugin => !EXCLUDED_PLUGINS.includes(plugin.constructor.name));
    return config;
  },
  // The paths config to use when compiling your react app for development or production.
  paths: function(paths, env) {
    // Disable react-scripts TypeScript handling
    //paths.appTsConfig = '';
    return paths;
  }
};