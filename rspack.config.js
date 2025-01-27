const { composePlugins, withNx, withWeb } = require('@nrwl/rspack');

const { AngularWebpackPlugin } = require('@ngtools/webpack');
const {
  OccurrencesPlugin,
} = require('@angular-devkit/build-angular/src/webpack/plugins/occurrences-plugin');
const path = require('path');

module.exports = composePlugins(withNx(), withWeb(), (baseConfig) => {
  /*
   *  @type {() => import('@rspack/cli').Configuration}
   */
  const config = {
    ...baseConfig,
    // snapshot: {module: {hash: false}},
    // performance: {hints: false}, // throws error
    cache: true,
    experiments: {
      // 'backCompat': false, // throws error
      // 'syncWebAssembly': true, // throws error
      asyncWebAssembly: true,
      //incrementalRebuild: true,
    },
    optimization: {
      runtimeChunk: false,
      splitChunks: {
        // 'maxAsyncRequests': null, // throws error
        cacheGroups: {
          default: {
            chunks: 'async',
            minChunks: 2,
            priority: 10,
          },
          common: {
            name: 'common',
            chunks: 'async',
            minChunks: 2,
            // 'enforce': true, // throws error
            priority: 5,
          },
          // 'vendors': false, // throws error
          // 'defaultVendors': false // throws error
        },
      },
    },
    module: {
      parser: {
        javascript: {
          requireContext: false,
          // Disable auto URL asset module creation. This doesn't effect `new Worker(new URL(...))`
          // https://webpack.js.org/guides/asset-modules/#url-assets
          url: false,
        },
      },
      rules: [
        {
          test: /\.?(svg|html)$/,
          resourceQuery: /\?ngResource/,
          type: 'asset/source',
        },
        { test: /[/\\]rxjs[/\\]add[/\\].+\.js$/, sideEffects: true },
        {
          test: /\.[cm]?[tj]sx?$/,
          exclude: [
            /[\\/]node_modules[/\\](?:core-js|@babel|tslib|web-animations-js|web-streams-polyfill|whatwg-url)[/\\]/,
          ],
          use: [
            {
              loader: require.resolve(
                '@angular-devkit/build-angular/src/babel/webpack-loader.js'
              ),
              options: {
                cacheDirectory: path.join(
                  __dirname,
                  '/.angular/cache/15.2.4/babel-webpack'
                ),
                aot: true,
                optimize: true,
                supportedBrowsers: [
                  'chrome 111',
                  'chrome 110',
                  'edge 111',
                  'edge 110',
                  'firefox 111',
                  'firefox 102',
                  'ios_saf 16.3',
                  'ios_saf 16.2',
                  'ios_saf 16.1',
                  'ios_saf 16.0',
                  'ios_saf 15.6',
                  'ios_saf 15.5',
                  'ios_saf 15.4',
                  'ios_saf 15.2-15.3',
                  'ios_saf 15.0-15.1',
                  'safari 16.3',
                  'safari 16.2',
                  'safari 16.1',
                  'safari 16.0',
                  'safari 15.6',
                  'safari 15.5',
                  'safari 15.4',
                  'safari 15.2-15.3',
                  'safari 15.1',
                  'safari 15',
                ],
              },
            },
          ],
        },
        {
          test: /\.[cm]?tsx?$/,
          loader: require.resolve('@ngtools/webpack/src/ivy/index.js'),
          exclude: [
            /[\\/]node_modules[/\\](?:css-loader|mini-css-extract-plugin|webpack-dev-server|webpack)[/\\]/,
          ],
        },
      ],
    },
    plugins: [
      new OccurrencesPlugin({
        aot: true,
        scriptsOptimization: false,
      }),
      new AngularWebpackPlugin({
        tsconfig: './tsconfig.app.json',
        emitClassMetadata: false,
        emitNgModuleScope: false,
        jitMode: false,
        fileReplacements: {},
        substitutions: {},
        directTemplateLoading: true,
        compilerOptions: {
          sourceMap: false,
          declaration: false,
          declarationMap: false,
          preserveSymlinks: false,
        },
        inlineStyleFileExtension: 'scss',
      }),
    ],
  };

  return config;
});
