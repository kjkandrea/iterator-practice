import model from '/assistant/timestamp/model.js'
import Renderer from '/assistant/timestamp/renderer.js'

const runner = {
  target: document.getElementById('timeStamp'),
  range: new Array(100).fill(0).map((_, i) => i),
  init() {
    this.test()

    this.forEachAsync.init.call(this)
  },
  test() {
    model.get().then(console.log)

    this.render()
  },
  render() {
    const renderer = new Renderer(this.target);
    renderer.render()
  },
  forEachAsync: {
    timeStampList: [],
    init() {
      runner.forEachAsync.run(this.range)
    },
    run(range) {
      range.forEach(async () => {
        const timeStamp = await model.get()
        this.timeStampList.push(timeStamp)
      })
    }
  }
}

runner.init.call(runner)