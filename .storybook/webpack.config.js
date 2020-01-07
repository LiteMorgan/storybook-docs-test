const path = require('path')
// const webpack = require('webpack')
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')

module.exports = async ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.(stories|story)\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          // may or may not need this line depending on your app's setup
          options: {
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {
            compilers: [createCompiler({})],
          },
        },
      ],
    },
    {
      test: /\.(stories|story)\.[tj]sx?$/,
      loader: require.resolve('@storybook/source-loader'),
      exclude: [/node_modules/],
      enforce: 'pre',
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              {
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                  "@babel/plugin-proposal-object-rest-spread",
                  "@babel/plugin-transform-runtime",
                  [
                    "react-css-modules",
                    {
                      generateScopedName: "[name]_[local]__[hash:base64:5]",
                      filetypes: {
                        ".scss": {
                          syntax: "postcss-scss",
                          plugins: [ "postcss-nested" ]
                        }
                      }
                    }
                  ]
                ]
              }
            ]
          }
        }
      ]
    },
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: /\.module\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.module\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: '[name]_[local]__[hash:base64:5]',
            },
            sourceMap: true,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            // config: {
            //   path: ''
            // }
          }
        },
        'sass-loader'
      ]
    }
  )

  config.resolve = {
    modules: [
      ...config.resolve.modules,
      path.resolve(process.cwd(), 'node_modules'),

    ],
    extensions: [
      ...config.resolve.extensions,
      '.js',
      '.jsx',
      '.scss',
      '.mdx'
    ]
  }

  return config
}
