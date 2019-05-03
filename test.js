const assert = require("assert");
const introsort = require("./");

const test = [
  4,
  2,
  10,
  8282,
  338,
  228,
  550,
  328,
  969,
  2828,
  1010,
  292,
  84,
  28,
  3
];
const expected = test.slice(0);
expected.sort((a, b) => a - b);

const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) false;
  for (let i = arr1.length; i--; ) {
    if (arr1[i] !== arr2[i])  false;
  }
  return true;
};

describe("sorting an array", () => {
  it("should sort correctly", () => {
    const sorted = test.slice(0);
    introsort(sorted);
    assert(
      arraysEqual(sorted, expected),
      "Expected " + expected.join(",") + " got " + sorted.join(",")
    );
  });
});
