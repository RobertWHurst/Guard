
// modules
var test = require('tape');

// libs
var GuardError = require('../lib/guard-error');

// constants
var MESSAGE = 'ERROR_MESSAGE';

// test globals
var guardError;


test('GuardError()', function(t) {
  t.equal(typeof GuardError, 'function', 'is a function');
  guardError = new GuardError(MESSAGE);
  t.end();
});

test('guardError.message', function(t) {
  t.equal(guardError.message, MESSAGE);
  t.end();
});

test('guardError.fileName', function(t) {
  t.equal(guardError.fileName, __filename);
  t.end();
});

test('guardError.lineNumber', function(t) {
  t.equal(guardError.lineNumber, '17');
  t.end();
});

test('guardError.columnNumber', function(t) {
  t.equal(guardError.columnNumber, '16');
  t.end();
});
