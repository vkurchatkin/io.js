'use strict';
// Flags: --expose_internals
var common = require('../common');
var assert = require('assert');
var net = require('net');
var TCPWrap = require('binding/tcp_wrap').TCP;

var echoServer = net.createServer(function(connection) {
  connection.end();
});
echoServer.listen(common.PORT);

var callCount = 0;

var Socket = net.Socket;
var setNoDelay = TCPWrap.prototype.setNoDelay;

TCPWrap.prototype.setNoDelay = function(enable) {
  setNoDelay.call(this, enable);
  callCount++;
};

echoServer.on('listening', function() {
  var sock1 = new Socket();
  // setNoDelay before the handle is created
  // there is probably a better way to test this

  var s = sock1.setNoDelay();
  assert.ok(s instanceof net.Socket);
  sock1.connect(common.PORT);
  sock1.on('end', function() {
    assert.equal(callCount, 1);
    echoServer.close();
  });
});
