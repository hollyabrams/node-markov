/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length - 1; i++) {
        let currentWord = this.words[i];
        let nextWord = this.words[i + 1];

        if (!chains.has(currentWord)) {
            chains.set(currentWord, []);
        }

        chains.get(currentWord).push(nextWord);
    }

    this.chains = chains;
}

  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let out = [];
    let currentWord = MarkovMachine.choice(Array.from(this.chains.keys()));

    while (out.length < numWords && currentWord) {
        out.push(currentWord);
        let nextWords = this.chains.get(currentWord);
        currentWord = MarkovMachine.choice(nextWords);
    }

    return out.join(" ");
}
}

module.exports = {
MarkovMachine,
};