const runner = {
  init() {
    this.run();
  },
  run() {
    this.createLikedIterator.init()
  },
  createLikedIterator: {
    init() {
      console.group('createLikedIterator')

      this.useNext()

      console.log(this.iterator.next().value)
      console.log(this.iterator.next().done)

      console.groupEnd()
    },
    iterator : (() => {
      let num = 1

      return {
        next: () => {
          num = num * 2
          return num > 10
          ? { done: true }
          : { done: false, value: num }
        }
      }
    })(),
    useNext() {
      console.log(this.iterator.next().value)
      console.log(this.iterator.next().value)
      console.log(this.iterator.next().value)
    }
  }
}

window.addEventListener('DOMContentLoaded', runner.init.bind(runner))