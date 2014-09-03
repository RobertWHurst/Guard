
// modules
var inherits = require('util').inherits;


function GuardError(message, fileName, lineNumber) {
  Error.call(this, message, fileName, lineNumber);

  this.message = message;
  this.name = this.constructor.name;
  if (fileName) { this.fileName = fileName; }
  if (lineNumber) { this.lineNumber = lineNumber; }

  Error.captureStackTrace(this, this.constructor);
  this._setStackOffset(1);
}
inherits(GuardError, Error);

GuardError.prototype._setStackOffset = function(stackOffset) {
  try {
    throw new Error();
  } catch(dummyErr) {
    var firstLine = this.stack.split('\n')[0];
    var lines = dummyErr.stack.split('\n');
    var line = lines[stackOffset + 2];
    var lineChunks = line.match(/\(([^\)]+)\)/)[1].split(':');
    this.stack = [firstLine].concat(lines.slice(stackOffset + 2)).join('\n');
    this.fileName = lineChunks[0];
    this.lineNumber = lineChunks[1];
    this.columnNumber = lineChunks[2];
  }
};


module.exports = GuardError;
