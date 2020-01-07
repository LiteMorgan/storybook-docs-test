let defaultPresets

if (process.env.BABEL_ENV === 'es') {
  defaultPresets = []
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: ['esm', 'production-umd'].includes(process.env.BABEL_ENV) ? false : 'commonjs'
      }
    ]
  ]
}

const productionPlugins = [
  'babel-plugin-transform-react-remove-prop-types',
]

module.exports = {
  presets: defaultPresets.concat(['@babel/preset-react']),
  plugins: [
    "babel-plugin-transform-react-constant-elements",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-runtime",
    [
      "react-css-modules",
      {
        "generateScopedName": "[name]_[local]__[hash:base64:5]",
        "filetypes": {
          ".scss": {
            "syntax": "postcss-scss",
            "plugins": [
              "postcss-nested"
            ]
          }
        }
      }
    ],
    // for IE 11 support
    "@babel/plugin-transform-object-assign"
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    cjs: {
      plugins: productionPlugins
    },
    development: {
      plugins: []
    },
    esm: {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', {
          useESModules: true
        }]
      ]
    },
    production: {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', {
          useESModules: true
        }]
      ]
    },
    'production-umd': {
      plugins: [
        ...productionPlugins,
        ['@babel/plugin-transform-runtime', {
          useESModules: true
        }]
      ]
    },
    test: {
      sourceMaps: 'both',
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            root: ['./'],
            // alias: defaultAlias,
          },
        ],
      ],
    }
  }
}