// function MyDate() {
//   Date.apply(MyDate.prototype, arguments);
// }

// MyDate.prototype.test = function () {
//   return this.getTime();
// };

// const d = new Date();

// Object.setPrototypeOf(d, MyDate.prototype);

// Object.setPrototypeOf(MyDate.prototype, Date.prototype);

// class MyDate extends Date {
//   // constructor() {
//   //   super()
//   //   this.n = 'mydate'
//   // }

//   test() {
//     return this.getTime()
//   }
// }

// const mydate = new MyDate();

// const res = mydate.test();

// console.log(res);

function Sup(n) {
  this.n = n || "sup";
}

Sup.prototype.getN = function (n) {
  return n || this.n;
};

function Sub() {
  Sup.apply(Sub.prototype, arguments);
}

Sub.prototype = new Sup()

// Sub.prototype = Object.create(Sup.prototype);

const sub = new Sub("sub");

console.log(sub.getN());
