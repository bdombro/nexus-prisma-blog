const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  if (process.env.ANALYZE) config.plugins.push(new BundleAnalyzerPlugin());

  config.resolve.alias = {
    ...config.resolve.alias,
    react: "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat",
  };
  return config;
};
