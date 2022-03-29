const PENDING = "pending";
const RESOlVED = "resolved";
const REJECTED = "rejected";

function P(fn) {
  let _this = this;
  _this.currentState = PENDING;

  _this.value = undefined;

  _this.resolvedCbs = [];
  _this.rejectedCbs = [];
  _this.resolve = function (value) {
    if (value instanceof P) {
      return value.then(_this.resolve, _this.reject);
    }

    setTimeout(() => {
      if (_this.currentState === PENDING) {
        _this.currentState = RESOlVED;
        _this.value = value;
        _this.resolvedCbs.forEach((cb) => cb());
      }
    });
  };

  _this.reject = function (reason) {
    setTimeout(() => {
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED;
        _this.value = reason;
        _this.rejectedCbs.forEach((cb) => cb());
      }
    });
  };

  try {
    fn(_this.resolve, _this.reject);
  } catch (error) {
    _this.reject(error);
  }
}

P.prototype.then = function (onResolved, onRejected) {
  const _this = this;

  let promise2;

  onResolved = typeof onResolved === "function" ? onResolved : (v) => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (r) => {
          throw r;
        };

  if (_this.currentState === RESOlVED) {
    return (promise2 = new P(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onResolved(_this.value);
          resolution(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (_this.currentState === REJECTED) {
    return (promise2 = new P(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onRejected(_this.value);
          resolution(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (_this.currentState === PENDING) {
    return (promise2 = new P(function (resolve, reject) {
      _this.resolvedCbs.push(function () {
        try {
          let x = onResolved(_this.value);
          resolution(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });

      _this.rejectedCbs.push(function () {
        try {
          let x = onRejected(_this.value);
          resolution(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  function resolution(promise, x, resolve, reject) {
    if (promise === x) {
      return reject(new TypeError("Error"));
    }

    if (x instanceof P) {
      if (x.currentState === PENDING) {
        x.then(function (value) {
          resolution(promise, value, resolve, reject);
        }, reject);
      } else {
        x.then(resolve, reject);
      }
      return;
    }

    let called = false;

    if (x !== null && (typeof x === "object" || typeof x === "function")) {
      try {
        let then = x.then;
        if (typeof then === "function") {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              resolution(promise, y, resolve, reject);
            },
            (e) => {
              if (called) return;
              called = true;
              reject(e);
            }
          );
        } else {
          resolve(x);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  }
};

P.prototype.catch = function (cb) {
  return new P((resolve, reject) => {
    reject(cb);
  });
};

let p = new P((resolve, reject) => {
  setTimeout(function () {
    console.log(p.currentState);
    resolve("xxx");
  }, 2000);
});

p.then((res) => {
  console.log(p.currentState);
  console.log(res + "then");
}, error => {
  console.log(error)
})