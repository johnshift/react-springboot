export default (config, _env, helpers) => {
  const { options, ...babelLoaderRule } = config.module.rules[0]; // Get the babel rule and options
  options.presets.push(
    "@babel/preset-typescript",
    "@babel/preset-react",
    "@linaria"
  ); // Push the necessary presets
  config.module.rules[0] = {
    ...babelLoaderRule,
    loader: undefined, // Disable the predefined babel-loader on the rule
    use: [
      {
        loader: "babel-loader",
        options,
      },
      {
        loader: "@linaria/webpack-loader",
        options: {
          babelOptions: options, // Pass the current babel options to linaria's babel instance
        },
      },
    ],
  };

  // disable css-modules for linaria
  const css = helpers.getLoadersByName(config, "css-loader")[0];
  css.loader.options.modules = false;
};
