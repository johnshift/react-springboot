const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");

export default (config, _env, helpers) => {
  config.plugins.push(new VanillaExtractPlugin());

  // disable css-modules for linaria
  const css = helpers.getLoadersByName(config, "css-loader")[0];
  css.loader.options.modules = false;
};
