const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.output = ''
  }

  _transform(chunk, encoding, callback) {
    chunk.toString().split(os.EOL).forEach((value, i, arr) => {
      this.output += value;

      if (i === arr.length - 1) return;

      this.push(this.output);
      this.output = '';
    })

    callback();
  }

  _flush(callback) {
    callback(null, this.output);
  }
}

module.exports = LineSplitStream;
