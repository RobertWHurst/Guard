
// modules
var test = require('tape');
var sinon = require('sinon');

// libs
var index = require('../');
var guard = require('../lib/guard');
var GuardError = require('../lib/guard-error');


test('index()', function(t) {
  sinon.stub(guard, 'check').returns('RESULT');

  t.equal(typeof index, 'function', 'is a function');
  t.equal(index(), 'RESULT', 'returns the correct result');
  t.equal(guard.check.called, true, 'calls guard.check');

  guard.check.restore();
  t.end();
});

test('index.GuardError()', function(t) {
  t.equal(index.GuardError, GuardError, 'is a reference to GuardError');
  t.end();
});

test('index.types[]', function(t) {
  t.equal(index.types, guard.types, 'is a reference to guard.types');
  t.end();
});
