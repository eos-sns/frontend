const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = (env) => {
  const API_HOST = "https://eos.sns.it";
  const API_PORT = "2000";
  const API_URL = API_HOST + ":" + API_PORT;

  const mode = 'production';
  const externals = {
    config: JSON.stringify({
      apiUrl: API_URL,
      usersApiUrl: API_URL + '/users',
      searchApiUrl: API_URL + '/search',
      jupyterUrl: 'https://eos.sns.it:2001'
    })
  };
  const newConfig = {
    mode: mode,
    externals: externals
  };

  return merge(baseConfig, newConfig);
};