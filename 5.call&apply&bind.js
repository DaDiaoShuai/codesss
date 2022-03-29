function mycall(context = window) {
  context.fn = this;

  var args = [...arguments].slice(1);

  var result = context.fn(...args);

  delete context.fn;

  return result;
}

function myapply(context = window) {
  context.fn = this;

  var args = arguments[1];

  var result;

  if (args) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
}

function mybind(context = window) {
  var that = this;

  var args = [...arguments].slice(1);

  return function F() {
    if (this instanceof F) {
      return new that(...args, ...arguments);
    }
    return that.apply(context, args.concat(...arguments));
  };
}
