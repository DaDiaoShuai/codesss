var a = {
  valueOf() {
    return 0;
  },
  toString() {
    return "1";
  },
  [Symbol.toPrimitive]() {
    return 2;
  },
};

console.log(1 + a);
console.log("1" + a);
console.log(+a);
