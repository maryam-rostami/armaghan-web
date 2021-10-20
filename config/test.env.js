'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ROOT_API: '"http://tst-api.farabin.news:3001/api"'
})
