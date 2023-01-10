const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {
    test('makeChains creates a map of word chains', () => {
        let mm = new MarkovMachine("hello world test");
        expect(mm.chains.get("hello")).toEqual(["world"]);
        expect(mm.chains.get("world")).toEqual(["test"]);
    });

    test('makeText generates text of the correct length', () => {
        let mm = new MarkovMachine("hello world test");
        let text = mm.makeText(2);
        expect(text.split(" ").length).toEqual(2);
    });

    test('makeText generates text starting with a random word', () => {
        let mm = new MarkovMachine("hello world test");
        let text = mm.makeText(2);
        expect(["hello", "world", "test"]).toContain(text.split(" ")[0]);
    });
    
    test('makeText generates text with valid current word', () => {
        let mm = new MarkovMachine("hello world test");
        let text = mm.makeText(2);
        let currentWord = text.split(" ")[0];
        expect(mm.chains.has(currentWord)).toBe(true);
    });
});