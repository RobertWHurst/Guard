
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
  'stream',
  'read-stream',
  'write-stream',
  'emitter',
  'function',
  'null',
  'undefined'
];

exports.check = function(key, val, type) {
  var self = this;

  if (typeof key !== 'string') {
    throw new TypeError('key must be a string');
  }
  if (typeof type !== 'string' && (
    type === null ||
    typeof type !== 'object' ||
    typeof type.length !== 'number'
  )) {
    throw new TypeError('type must be a string or array');
  }

  var typeErr = self._validateType(type);
  if (typeErr) {
    typeErr._setStackOffset(self._stackOffset);
    throw typeErr;
  }

  var valErr = self._validateVal(key, type, val);
  if (valErr) {
    valErr._setStackOffset(self._stackOffset);
    throw valErr;
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
  if (self.types.indexOf(type) === -1) {
    return new GuardError(
      'type must be one of the following values: ' + self.types.join(', ')
    );
  }
};

// validates the value against the type
exports._validateVal = function(key, type, val) {
  var self = this;

  // recursive
  if (
    type !== null &&
    typeof type === 'object' &&
    typeof type.length === 'number'
  ) {
    var ok = false;
    for (var i = 0; i < type.length; i += 1) {
      if (!self._validateVal(key, type[i], val)) {
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

  // object
  if (type === 'object' && (
    val === null ||
    typeof val !== 'object'
  )) {
    return new GuardError(key + ' must be an object');
  }

  // string
  else if (type === 'string' && typeof val !== 'string') {
    return new GuardError(key + ' must be a string');
  }

  // boolean
  else if (type === 'boolean' && typeof val !== 'boolean') {
    return new GuardError(key + ' must be a boolean');
  }

  // number
  else if (type === 'number' && typeof val !== 'number') {
    return new GuardError(key + ' must be a number');
  }

  // array
  else if (type === 'array' && (
    val === null ||
    typeof val !== 'object' ||
    typeof val.length !== 'number'
  )) {
    return new GuardError(key + ' must be an array');
  }

  // regex
  else if (type === 'regexp' && val.constructor !== RegExp) {
    return new GuardError(key + ' must be a regexp');
  }

  // date
  else if (type === 'date' && val.constructor !== Date) {
    return new GuardError(key + ' must be a date');
  }

  // emitter
  else if (type === 'emitter' && (
    typeof val.addListener !== 'function' ||
    typeof val.emit !== 'function'
  )) {
    return new GuardError(key + ' must be an emitter');
  }

  // stream
  else if (type === 'stream' && (
    typeof val.on !== 'function' ||
    typeof val.pipe !== 'function'
  )) {
    return new GuardError(key + ' must be a stream');
  }

  // read stream
  else if (type === 'read-stream' && (
    typeof val.on !== 'function' ||
    typeof val.pipe !== 'function' ||
    typeof val.read !== 'function'
  )) {
    return new GuardError(key + ' must be a read-stream');
  }

  // write stream
  else if (type === 'write-stream' && (
    typeof val.on !== 'function' ||
    typeof val.pipe !== 'function' ||
    typeof val.write !== 'function' ||
    typeof val.end !== 'function'
  )) {
    return new GuardError(key + ' must be a write-stream');
  }

  // function
  else if (type === 'function' && typeof val !== 'function') {
    return new GuardError(key + ' must be a function');
  }

  // null
  else if (type === 'null' && val !== null) {
    return new GuardError(key + ' must be a null');
  }

  // undefined
  else if (type === 'undefined' && val !== undefined) {
    return new GuardError(key + ' must be a undefined');
  }

  return null;
};

exports._stackOffset = 2;

