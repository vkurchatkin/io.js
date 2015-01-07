var common = require('../common');
var assert = require('assert');

/**
 * Unhandled rejections are thrown by default
 * and should be available in `uncaughtException`.
 */

var caught = null;

process.once('uncaughtException', function(error) {
  caught = error;
});

process.on('exit', function() {
  assert(caught);
});

var error = new Error('error');
Promise.reject(error);
