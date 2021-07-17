import model from '/assistant/timestamp/model.js'
import Renderer from '/assistant/timestamp/renderer.js'

const runner = {
  el: document.getElementById('timeStamp'),
  renderer: null,
  range: new Array(100).fill(0).map((_, i) => i),
  init() {
    this.test()
    this.setRenderer()

    this.forEachAsync.init.call(this)
  },
  setRenderer() {
    this.renderer = new Renderer(this.el)
  },
  test() {
    model.get().then(console.log)
  },
  forEachAsync: {
    init() {
      this.forEachAsync.run(this.range)
    },
    run(range) {
      range.forEach(async () => {
        const timeStamp = await model.get()
        runner.renderer.render(timeStamp)
      })
    }
  }
}

runner.init.call(runner)