const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = (env) => {
  const API_HOST = 'http://localhost';
  const API_PORT = '4000';
  const API_URL = `${API_HOST}:${API_PORT}`;

  const mode = 'development';
  const externals = {
    config: JSON.stringify({
      apiUrl: API_URL,
      usersApiUrl: `${API_URL}/users`,
      searchApiUrl: `${API_URL}/search`,
      jupyterUrl: 'http://localhost:8888',
      resetPasswordApiUrl: `${API_URL}/users/resetPassword`,
    }),
  };
  const newConfig = {
    mode,
    externals,
  };

  return merge(baseConfig, newConfig);
};
