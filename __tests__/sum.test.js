module.exports = require("babel-jest").createTransformer({
    rootMode: "upward",
  });

test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});
