const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    
    this.limit = options.limit,
    this.memoryUsed = 0
  }

  _transform(chunk, encoding, callback) {
    this.memoryUsed += Buffer.byteLength(chunk);

    if (this.memoryUsed > this.limit) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
