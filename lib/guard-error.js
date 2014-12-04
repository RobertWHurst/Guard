
// modules
var inherits = require('util').inherits;


function GuardError(message, fileName, lineNumber) {
  Error.call(this, message, fileName, lineNumber);

  this.message = message;
  this.name = this.constructor.name;
  if (fileName) { this.fileName = fileName; }
  if (lineNumber) { this.lineNumber = lineNumber; }

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    var err = new Error();
    err.message = this.message;
    err.name = this.name;
    this.stack = err.stack;
  }
  this._setStackOffset(1);
}
inherits(GuardError, Error);

GuardError.prototype._setStackOffset = function(stackOffset) {
  try {
    throw new Error();
  } catch (dummyErr) {
    var firstLine = this.stack.split('\n')[0];
    var lines = dummyErr.stack.split('\n');
    var line = lines[stackOffset + 2];

    var lineMatches = line.match(/[\(\@](.+):(\d+):(\d+)\)?$/);
    this.stack = [ firstLine ].concat(lines.slice(stackOffset + 2)).join('\n');
    this.fileName = lineMatches[1];
    this.lineNumber = lineMatches[2];
    this.columnNumber = lineMatches[3];
  }
};


module.exports = GuardError;
