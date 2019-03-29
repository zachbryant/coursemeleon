import words from "code_words.js";

// Secure random range
export function randRange(min, max) {
  var range = max - min;
  if (range <= 0) {
      throw new Exception('max must be larger than min');
  }
  var requestBytes = Math.ceil(Math.log2(range) / 8);
  if (!requestBytes) { // No randomness required
      return min;
  }
  var maxNum = Math.pow(256, requestBytes);
  var ar = new Uint8Array(requestBytes);

  while (true) {
      window.crypto.getRandomValues(ar);

      var val = 0;
      for (var i = 0;i < requestBytes;i++) {
          val = (val << 8) + ar[i];
      }

      if (val < maxNum - maxNum % range) {
          return min + (val % range);
      }
  }
}

// Returns a single random 3-4 letter word
function randCodeWord() {
  return words[randRange(0, words.length)];
}

// Returns a code of 4 3-4 length words
export default function randPassword() {
  var password = randCodeWord();
  var limit = randRange(4,5);
  for (var i = 1; i < limit; i++)
    password += "-" + randCodeWord();
  return password;
}