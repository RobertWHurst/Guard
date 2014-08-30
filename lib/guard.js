
// libs
var GuardError = require('./guard-error');


exports.types = [
  'object',
  'string',
  'boolean',
  'number',
  'array',
  'regexp',
  'date',
  'function',
  'null',
  'undefined'
];

exports.check = function(key, val, type, cb) {
  var self = this;

  cb = cb || function(err) {
    if (err) { throw err; }
  };

  if (typeof cb !== 'function') {
    throw new TypeError('cb must be a function');
  }
  if (typeof key !== 'string') {
    return cb(new TypeError('key must be a string'));
  }
  if (typeof type !== 'string' && (
    type === null ||
    typeof type !== 'object' ||
    typeof type.length !== 'number'
  )) {
    return cb(new TypeError('type must be a string or array'));
  }

  var typeErr = self._validateType(type);
  if (typeErr) {
    typeErr._stackOffset(self._stackOffset);
    return cb(valErr);
  }

  var valErr = self._validateVal(key, type, val);
  if (valErr) {
    valErr._setStackOffset(self._stackOffset);
    return cb(valErr);
  }

  return null;
};

exports._validateType = function(type) {
  var self = this;

  if (
    type !== null &&
    typeof type === 'object' &&
    typeof type.length === 'number'
  ) {
    for (var i = 0; i < type.length; i += 1) {
      var err = self._validateType(type[i]);
      if (err) { return err; }
    }
    return null;
  }
  if (self.types.indexOf(type) === -1 && type !== '*') {
    var err = new GuardError(
      'type must be one of the following values: ' + self.types.join(', ')
    );
    return err;
  }
};

// validates the value against the type
exports._validateVal = function(key, type, val) {
  var self = this;

  if (
    type !== null &&
    typeof type === 'object' &&
    typeof type.length === 'number'
  ) {
    var ok = false;
    for (var i = 0; i < type.length; i += 1) {
      if(!self._validateVal(key, type[i], val)) {
        ok = true;
        break;
      }
    }
    if (ok) {
      return null;
    } else {
      return new GuardError(
        key + ' must be one of the following types: ' + type.join(', ')
      );
    }
  }

  if (type === 'object' && (
    val === null ||
    typeof val !== 'object'
  )) {
    return new GuardError(key + ' must be an object');
  } else if (type === 'string' && typeof val !== 'string') {
    return new GuardError(key + ' must be a string');
  } else if (type === 'boolean' && typeof val !== 'boolean') {
    return new GuardError(key + ' must be a boolean');
  } else if (type === 'number' && typeof val !== 'number') {
    return new GuardError(key + ' must be a number');
  } else if (type === 'array' && (
    val === null ||
    typeof val !== 'object' ||
    typeof val.length !== 'number'
  )) {
    return new GuardError(key + ' must be an array');
  } else if (type === 'regexp' && val.constructor !== RegExp) {
    return new GuardError(key + ' must be a regexp');
  } else if (type === 'date' && val.constructor !== Date) {
    return new GuardError(key + ' must be a date');
  } else if (type === 'function' && typeof val !== 'function') {
    return new GuardError(key + ' must be a function');
  } else if (type === 'null' && val !== null) {
    return new GuardError(key + ' must be a null');
  } else if (type === 'undefined' && val !== undefined) {
    return new GuardError(key + ' must be a undefined');
  }

  return null;
};

exports._stackOffset = 2;

