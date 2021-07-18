const runner = {
  init() {
    this.run();
  },
  run() {
    console.log('run')
  },
}

window.addEventListener('DOMContentLoaded', runner.init.bind(runner))