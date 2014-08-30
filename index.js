

// libs
var GuardError = require('./lib/guard-error');
var guard = require('./lib/guard');


exports = module.exports = function(    ) {
  return guard.check.apply(guard, arguments);
};
exports.GuardError = GuardError;
exports.guard = guard;
exports.types = guard.types;
