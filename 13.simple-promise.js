function MyPromise(fn) {
  this.status = "pending";
  this.value = undefined;
  this.reason = undefined;
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []
  const that = this;
  function _resolve(val) {
    if (that.status === "pending") {
      that.status = "resolved";
      that.value = val;
      that.resolvedCallbacks.forEach(cb => cb(that.value))
    }
  }

  function _reject(reason) {
    if (that.status === "pending") {
      that.status = "rejected";
      that.reason = reason;
      that.rejectedCallbacks.forEach(cb => cb(that.value))
    }
  }

  try {
    fn(_resolve, _reject)
  } catch (error) {
    _reject(error)
  }
}


MyPromise.prototype.then = function(resolve, reject) {
  const that = this
  switch (that.status) {
    case 'pending':
      that.resolvedCallbacks.push(function(){
        resolve(that.value)
      })
      that.rejectedCallbacks.push(function(){
        resolve(that.reason)
      })
      break;
    case 'resolved':
      resolve(that.value)
      break;
    case 'rejected':
      reject(that.reason)
    default:
      break;
  }
}