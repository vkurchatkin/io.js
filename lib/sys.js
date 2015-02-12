'use strict';

const util = require('util');

module.exports = util;

// the sys module was renamed to 'util'.
// this shim remains to keep old programs working.
// sys is deprecated and shouldn't be used

util._printDeprecationMessage('sys is deprecated. Use util instead.', true);
