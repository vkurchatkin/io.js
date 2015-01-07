var common = require('../common');
var assert = require('assert');

/**
 * If `rejection.handle()` is called rejection is not
 * thrown.
 */

var unhandledRejection = null;

process.on('exit', function() {
  assert.equal(unhandledRejection.promise, promise);
  assert.equal(unhandledRejection.value, error);
});

process.on('unhandledPromiseRejection', function(promise, rejection) {
  unhandledRejection = rejection;
  rejection.handle();
});

var error = new Error('error');
var promise = Promise.reject(error);
