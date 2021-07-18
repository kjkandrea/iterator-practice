const runner = {
  init() {
    this.run();
  },
  run() {
    this.onlyIterator.init()
    this.iterableIterator.init()
  },
  onlyIterator: {
    init() {
      console.group('onlyIterator')

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
  },
  iterableIterator: {
    init() {
      console.group('iterableIterator')

      this.useNext()
      this.useForOf()
      this.useSpread()
    },
    iterator : (() => {
      let num = 1

      const next = () => {
          num = num * 2
          return num > 10000
            ? { done: true }
            : { done: false, value: num }
        }

      return {
        [Symbol.iterator]: () => ({ next }),
        next,
      }
    })(),
    useNext() {
      console.log(this.iterator.next().value)
    },
    useForOf() {
      for (const value of this.iterator) {
        console.log(value)
        if (value > 100) break;
      }
    },
    useSpread() {
      console.log(...this.iterator)
    }
  }
}

window.addEventListener('DOMContentLoaded', runner.init.bind(runner))