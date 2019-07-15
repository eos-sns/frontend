const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const API_HOST = "http://localhost";
  const API_PORT = "4000";
  const API_URL = API_HOST + ":" + API_PORT;

  return {
    mode: 'development',
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    watch: true,
    plugins: [new HtmlWebpackPlugin({
      template: './src/index.html'
    })],
    devServer: {
      historyApiFallback: true
    },
    externals: {
      config: JSON.stringify({
        apiUrl: API_URL,
        usersApiUrl: API_URL + '/users',
        searchApiUrl: API_URL + '/search',
        jupyterUrl: '//localhost:8888'
      })
    }
  }
};