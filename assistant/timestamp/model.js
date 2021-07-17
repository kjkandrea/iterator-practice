const model = {
  randomTimer(next) {
    const msMargin = Math.floor(Math.random() * 50)

    setTimeout(next, 200 + msMargin)
  },
  get() {
    const startUnixTime = Date.now()

    return new Promise(resolve => {
      const next = () => {
        const nextUnixTime = Date.now()
        resolve({
          start: startUnixTime,
          end: nextUnixTime,
          margin: nextUnixTime - startUnixTime,
        })
      }

      return this.randomTimer(next)
    })
  }
}

export default model