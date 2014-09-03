
// modules
var test = require('tape');
var Stream = require('stream');
var Readable = Stream.Readable;
var Writable = Stream.Writable;
var EventEmitter = require('events').EventEmitter;

// libs
var guard = require('../lib/guard');
var GuardError = require('../lib/guard-error');


test('guard{}', function(t) {
  t.equal(typeof guard, 'object', 'is an object');
  t.end();
});

test('guard.check()', function(t) {
  t.equal(typeof guard.check, 'function', 'is a function');
  t.throws(function() {
    guard.check();
  }, 'throws on missing arguments');
  t.throws(function() {
    guard.check(0, 'val', 'string');
  }, 'throws if key is not a string');
  t.throws(function() {
    guard.check('key', 'val', 'foo');
  }, 'throws if type is not a supported guard type');
  t.throws(function() {
    guard.check('key', 'val', 'string', 'foo');
  }, 'throws if cb is not a function');

  var typeMap = {
    object: {},
    string: 'string',
    boolean: false,
    number: 0,
    array: [],
    regexp: /RegExp/,
    date: new Date(),
    'function': function() {},
    'read-stream': new Readable(),
    'write-stream': new Writable(),
    stream: new Stream(),
    emitter: new EventEmitter(),
    'null': null,
    'undefined': undefined
  };

  for(var type in typeMap) {
    var val = typeMap[type];
    guard.check(type, val, type, function(err) {
      t.equal(
        err,
        null,
        'returns null for val ' + val + ' matching type ' + type
      );
    });
  }
  for(var type in typeMap) {
    guard.check(type, val, type, function(err) {
      t.equal(
        err.constructor,
        GuardError,
        'returns a GuardError instance for val ' + val +
        ' expecting type ' + type
      );
    });
    val = typeMap[type];
  }

  t.end();
});
