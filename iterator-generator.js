const runner = {
  init() {
    this.run();
  },
  run() {
    this.onlyIterator.init()
    this.iterableIterator.init()
    this.generatorIterableIterator.init()
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

      console.groupEnd()
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
  },
  generatorIterableIterator: {
    init() {
      console.group('generatorIterableIterator')

      const iterator = this.generateIterator(10);

      this.useNext(iterator)
      this.useForOf(iterator)
      this.useSpread(this.generateIterator(10000))

      console.groupEnd()
    },
    generateIterator: function* (max = 10000) {
      for (let num = 2; num < max; num = num * 2) {
        yield num;
      }
    },
    useNext(iterator) {
      console.log(iterator.next().value)
    },
    useForOf(iterator) {
      for (const value of iterator) {
        console.log(value)
      }
    },
    useSpread(iterator) {
      console.log(...iterator)
    }
  }
}

window.addEventListener('DOMContentLoaded', runner.init.bind(runner))