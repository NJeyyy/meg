const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './itf.js', // Entry file for your React app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output folder
    filename: 'main.js', // Output JavaScript bundle
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './itf.html', // Template HTML file
      filename: 'index.html', // Generated HTML file
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve files from the 'dist' folder
    port: 8080, // Port to run the app
    open: false, // Automatically open browser when server starts
  },
  stats: {
    children: true
  },
  mode: 'development', // Set the mode to development for now
};
