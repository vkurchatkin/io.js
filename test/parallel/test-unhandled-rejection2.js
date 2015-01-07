var common = require('../common');
var assert = require('assert');

/**
 * In `unhandledPromiseRejection` handler `rejection`
 * object is available. If `rejection.handle()` is
 * not called `rejection.value` is thrown.
 */

var caught = false;
var unhandledRejection = null;

process.once('uncaughtException', function() {
  caught = true;
});

process.on('exit', function() {
  assert(caught);
  assert.equal(unhandledRejection.promise, promise);
  assert.equal(unhandledRejection.value, error);
  assert.equal(unhandledRejection.isHandled(), false);
});

process.on('unhandledPromiseRejection', function(promise, rejection) {
  unhandledRejection = rejection;
});

var error = new Error('error');
var promise = Promise.reject(error);
