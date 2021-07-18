import model from './assistant/timestamp/model.js'
import Renderer from './assistant/timestamp/renderer.js'

const runner = {
  range: new Array(5).fill(0).map((_, i) => i),
  init() {
    this.run();

    this.bindReplayEvent()
  },
  run() {
    this.forEachAsync.init.call(this)
    this.promiseAll.init.call(this)
    this.stepByStep.init.call(this)
  },
  bindReplayEvent() {
    const replayButtonElement = document.getElementById('replay')
    replayButtonElement.addEventListener('click', () => { window.location.reload() })
  },
  forEachAsync: {
    renderer: new Renderer(document.getElementById('forEachAsync'), Date.now()),
    init() {
      this.forEachAsync.run(this.range)
    },
    run(range) {
      range.forEach(async () => {
        const timeStamp = await model.get()
        this.renderer.render(timeStamp)
      })
    }
  },
  promiseAll: {
    renderer: new Renderer(document.getElementById('promiseAll'), Date.now()),
    init() {
      this.promiseAll.run(this.range)
    },
    run(range) {
      const timeStampGetters = range.map(() => model.get())
      Promise.all(timeStampGetters)
        .then(timeStamps => timeStamps.forEach(this.renderer.render.bind(this.renderer)))
        .then(() => console.log('promiseAll Done. loop count : %s', timeStampGetters.length)) // forEach 는 완료시점 포착 불가.
    }
  },
  stepByStep: {
    renderer: new Renderer(document.getElementById('stepByStep'), Date.now()),
    init() {
      this.stepByStep.run(this.range)
    },
    async run(range) {
      for (const _ of range) {
        const timeStamp = await model.get()
        this.renderer.render(timeStamp)
      }
    }
  },
}

window.addEventListener('DOMContentLoaded', runner.init.bind(runner))