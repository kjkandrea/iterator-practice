const model = {
  randomTimer(next, msMin = 200) {
    const msMargin = Math.floor(Math.random() * 50)

    setTimeout(next, msMin + msMargin)
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