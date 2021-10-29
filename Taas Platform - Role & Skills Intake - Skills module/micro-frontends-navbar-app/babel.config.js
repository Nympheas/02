let cssLocalIdent;
if (process.env.APPMODE == 'development') {
  cssLocalIdent = 'navbar_[path][name]___[local]___[hash:base64:6]';
} else {
  cssLocalIdent = '[hash:base64:6]';
}

const config = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: true,
        regenerator: false
      }
    ],
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx'],
        root: [
          './src'
        ]
      }
    ],
    [
      'inline-react-svg',
      {
        ignorePattern: '[/\/]assets[/\/]images'
      }
    ],
    [
      'react-css-modules',
      {
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss'
          }
        },
        generateScopedName: cssLocalIdent
      }
    ]
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: 'current node'
          }
        ]
      ]
    }
  }
}

module.exports = config;
