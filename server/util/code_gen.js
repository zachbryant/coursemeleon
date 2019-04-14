var crypto = require("crypto");

module.exports = {
  words: require("./code_words.js").words,
  randRange: function(min, max) {
    var range = max - min;
    if (range <= 0) {
      throw "max must be larger than min";
    }
    var requestBytes = Math.ceil(Math.log2(range) / 8);
    if (!requestBytes) {
      // No randomness required
      return min;
    }
    var maxNum = Math.pow(256, requestBytes);
    var ar = new Uint8Array(requestBytes);

    while (true) {
      crypto.randomFillSync(ar);

      var val = 0;
      for (var i = 0; i < requestBytes; i++) {
        val = (val << 8) + ar[i];
      }

      if (val < maxNum - (maxNum % range)) {
        return min + (val % range);
      }
    }
  },
  // Returns a single random 3-4 letter word
  randCodeWord: function() {
    return this.words[this.randRange(0, this.words.length)];
  },
  // Returns a code of 4 3-4 length words
  randPassword: function() {
    var password = this.randCodeWord();
    var limit = this.randRange(4, 5);
    for (var i = 1; i < limit; i++) password += "-" + this.randCodeWord();
    return password;
  }
};
