```let [PENDING, REJECTED, FULFILLED] = [undefined, false, true]

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
    if (value && value.then) {
      return value.then(this.resolve, this.reject) // ассимиляция промиса
    }
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
    onFulfilled = onFulfilled || (x => x)
    onRejected = onRejected || (err => { throw err })
    return new PromiseX((resolve, reject) => {
      if (this.state == FULFILLED) {
        resolve(onFulfilled(this.value))
      } else if (this.state == REJECTED) {
        resolve(onRejected(this.value))
      } else {
        this.chained.push({onFulfilled, onRejected})
      }
    })
  }

  static race(ps) {
    if (!Array.isArray(ps)) {
      throw Error("ps must be of Promise type")
    }
    return new PromiseX((resolve, reject) => {
      for (let p of ps) {
        PromiseX.resolve(PromiseX.resolve(p)).then(resolve, reject)
      }
    })
  }

  static all(ps) {
    if (!Array.isArray(ps)) {
      throw Error("ps must be of Promise type")
    }
    let result = []
    let c = ps.length
    return new PromiseX((resolve, reject) => {
      ps.forEach((p, i) => {
        p.then(res => {
          result[i] = res
          c--
          if (!c) {
            resolve(result)
          }
        })
          .catch(reject)
      })
    })
  }

  catch (fn) {
    return this.then(x => x, fn)
  }
}

function delay(timeMs) {
  return new Promise(resolve => {
    setTimeout(resolve, timeMs)
  })
}

Promise.race([
  Promise.resolve("Y"),
  "X",
  delay(1000).then(_ => "A"),
  delay(2000).then(_ => "B"),
  delay(500).then(_ => "C"),
]).then(console.log)

// Promise.all([
//   delay(2000).then(_ => "A"),
//   delay(1).then(_ => "B"),
//   delay(1).then(_ => "C"),
// ]).then(console.log) // [C, A, B] vs [A, B, C]

// let p = PromiseX.resolve(2)
//   .then(_ => 3)
//
// p.then(console.log)
// p.then(console.log)

// PromiseX.resolve("foo").then(console.log)
// console.log("bar")

// let p = new PromiseX((resolve, reject) => {
//   resolve(1)
//   resolve(2)
//   // reject(new Error())
// })
// p.then(console.log, console.error)
// p.then(console.log, console.error)
  // .then(console.log, console.error)```

(edited)

Message Input


Message #jrd-19-06-01
