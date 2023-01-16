const webpackConfig = (MODE) => {
  const enabledSourceMap = MODE === 'development';

  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const CopyPlugin = require('copy-webpack-plugin');
  const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
  const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

  //ベースファイルのパス設定
  const srcPaths = {
    js: `${__dirname}/src/assets/js/`,
    sass: `${__dirname}/src/assets/sass/`,
    imgs: `${__dirname}/src/assets/images/`,
  };

  const entriesJS = WebpackWatchedGlobEntries.getEntries(
    [`${srcPaths.js}**/**.js`],
    {
      ignore: `${srcPaths.js}**/_*.js`,
    }
  )();

  //sassファイル分割
  const entriesScss = WebpackWatchedGlobEntries.getEntries(
    [`${srcPaths.sass}**/**.scss`],
    {
      ignore: `${srcPaths.sass}**/_*.scss`,
    }
  )();

  const cssGlobPlugins = (entriesScss) => {
    return Object.keys(entriesScss).map(
      (key) =>
        new MiniCssExtractPlugin({
          //出力ファイル名
          filename: `../assets/css/${key}.css`,
        })
    );
  };

  return {
    mode: MODE,
    devtool: enabledSourceMap ? 'source-map' : false,

    // エントリーポイント
    entry: entriesJS,

    output: {
      path: `${__dirname}/dist/assets`,
      filename: 'js/[name].js',
      clean: true, //clean up dist folder when you build
    },

    module: {
      rules: [
        {
          // 拡張子 .js の場合
          test: /\.js$/,
          exclude: /\node_modules/,
          loader: 'babel-loader',
        },
        // Sassファイルの読み込みとコンパイル
        {
          test: /\.scss/, // 対象となるファイルの拡張子
          use: [
            // CSSファイルを書き出すオプションを有効にする
            {
              loader: MiniCssExtractPlugin.loader,
            },
            // CSSをバンドルするための機能
            {
              loader: 'css-loader',
              options: {
                // オプションでCSS内のurl()メソッドを取り込む
                url: false,
                // ソースマップの利用有無
                sourceMap: enabledSourceMap,

                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
                importLoaders: 2,
              },
            },

            // PostCSSのための設定
            {
              loader: 'postcss-loader',
              options: {
                // PostCSS側でもソースマップを有効にする
                sourceMap: enabledSourceMap,
                postcssOptions: {
                  plugins: [
                    ['autoprefixer', { grid: true }],
                    ['postcss-normalize-charset', {}],
                    ['postcss-sort-media-queries', {}],
                  ],
                },
              },
            },

            {
              loader: 'sass-loader',
              options: {
                // ソースマップの利用有無
                sourceMap: enabledSourceMap,
              },
            },

            'glob-import-loader',
          ],
        },
      ],
    },

    plugins: [
      // CSSファイルを外だしにするプラグイン
      ...cssGlobPlugins(entriesScss),

      new CopyPlugin({
        patterns: [
          {
            from: `${__dirname}/src`,
            to: `${__dirname}/dist`,
            globOptions: {
              ignore: ['**/.DS_Store', '**/_*.*', '**/*.scss', '**/*.js'],
            },
          },
        ],
      }),

      new BrowserSyncPlugin({
        host: 'localhost',
        files: ['./dist/*.php'],
        port: 8000,
        proxy: {
          target: 'http://localhost:8888',
        },
      }),
    ],

    // node_modules を監視（watch）対象から除外
    watchOptions: {
      ignored: /node_modules/,
    },

    resolve: {
      alias: {
        '@sass': srcPaths.sass,
      },
      extensions: ['.js', '.scss']
    }
  };
};

module.exports = { webpackConfig };
