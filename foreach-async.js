import asyncTimeStamp from '/assistant/asyncTimeStamp.js'

const runner = {
  init() {
    this.test()
  },
  test() {
    asyncTimeStamp.get().then(console.log)
  }
}

runner.init.call(runner)