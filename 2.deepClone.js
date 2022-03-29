// function deepClone(ori) {
//   const { port1, port2 } = new MessageChannel();
//   return new Promise((resolve) => {
//     port2.onmessage = ev => resolve(ev.data);
//     port1.postMessage(ori);
//   });
// }

// var obj = {
//   a: undefined,
//   b: {
//     c: 1,
//     d: 2,
//   },
// };
// obj.c = obj.b;
// obj.b.c = obj.c;

// const target = await deepClone(obj)

// console.log(target)

Object.prototype.deepClone = function deepClone() {
  const copy = this.constructor === Array ? [] : {};

  for (let k in this) {
    if (typeof this[k] === "object") {
      copy[k] = this[k].deepClone();
    } else if (typeof this[k] === "function") {
      copy[k] = this[k].bind(copy);
    } else {
      copy[k] = this[k];
    }
  }
};
