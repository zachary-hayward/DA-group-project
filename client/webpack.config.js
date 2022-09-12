const path = require('path')

module.exports = {
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, '../server/public'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /.(j|t)sx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /\.module\.css$/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
}

// const path = require('path')
// module.exports = {
//   mode: 'production',
//   entry: './src/index.js',
//   output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' },
//   module: {
//     rules: [
//       {
//         test: /\.js$/i,
//         include: path.resolve(__dirname, 'src'),
//         use: {
//           loader: 'babel-loader',
//           options: { presets: ['@babel/preset-env'] },
//         },
//       },
//       {
//         test: /\.css$/i,
//         include: path.resolve(__dirname, 'src'),
//         use: ['style-loader', 'css-loader', 'postcss-loader'],
//       },
//     ],
//   },
//   devServer: { static: 'dist', watchContentBase: true },
// }
