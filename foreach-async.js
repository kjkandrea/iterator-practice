import model from '/assistant/timestamp/model.js'
import Renderer from '/assistant/timestamp/renderer.js'

const runner = {
  renderer: new Renderer(document.getElementById('timeStamp')),
  range: new Array(10).fill(0).map((_, i) => i),
  init() {
    this.forEachAsync.init.call(this)
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

window.addEventListener('DOMContentLoaded', runner.init.bind(runner))