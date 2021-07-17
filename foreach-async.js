import asyncTimeStamp from '/assistant/asyncTimeStamp.js'

const runner = {
  range: new Array(100).fill(0).map((_, i) => i),
  init() {
    this.forEachAsync.init.call(this)
  },
  test() {
    asyncTimeStamp.get().then(console.log)
  },
  forEachAsync: {
    timeStampList: [],
    init() {
      runner.forEachAsync.run(this.range)
    },
    run(range) {
      range.forEach(async () => {
        const timeStamp = await asyncTimeStamp.get()
        this.timeStampList.push(timeStamp)
      })
    }
  }
}

runner.init.call(runner)