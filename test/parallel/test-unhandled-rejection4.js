var common = require('../common');
var assert = require('assert');

/**
 * `rejection.promise` should be last
 * promise in chain, not original rejected
 * promise.
 */

var unhandledRejection = null;

process.on('exit', function() {
  assert.equal(unhandledRejection.promise, promise2);
  assert.equal(unhandledRejection.value, error);
});

process.on('unhandledPromiseRejection', function(promise, rejection) {
  unhandledRejection = rejection;
  rejection.handle();
});

var error = new Error('error');
var promise = new Promise(function(resolve, reject) {
  setImmediate(reject.bind(null, error));
});

var promise2 = promise.then(function() {});
