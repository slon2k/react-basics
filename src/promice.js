let [PENDING, REJECTED, FULFILLED] = [undefined, false, true]

class PromiseX {
  static resolve(v) {
    return new PromiseX(res => res(v))
  }

  static reject(err) {
    return new PromiseX((_, rej) => rej(err))
  }

  constructor(executor) {
    this.state = PENDING
    this.chained = []
    this.value = undefined
    executor(this.resolve, this.reject)
  }

  resolve = (value) => {
    if (this.state != PENDING) return
    this.state = FULFILLED
    this.value = value
    for (let {onFulfilled} of this.chained) {
      setImmediate(onFulfilled, value)
    }
  }

  reject = (err) => {
    if (this.state != PENDING) return
    this.state = REJECTED
    this.value = err
    for (let {onRejected} of this.chained) {
      setImmediate(onRejected, err)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state == FULFILLED) {
      setImmediate(onFulfilled, this.value)
    } else if (this.state == REJECTED) {
      setImmediate(onRejected, this.value)
    } else {
      this.chained.push({onFulfilled, onRejected})
    }
  }
}

PromiseX.resolve("foo").then(console.log)
console.log("bar")

// let p = new PromiseX((resolve, reject) => {
//   resolve(1)
//   resolve(2)
//   // reject(new Error())
// })
// p.then(console.log, console.error)
// p.then(console.log, console.error)
//   // .then(console.log, console.error)
//
// // sink
