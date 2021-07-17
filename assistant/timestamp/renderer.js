class Renderer {
  constructor(target) {
    this.target = target;
  }
  render() {
    const el = this.generatePartialElement({start: 1, end: 3, margin: 2});
    this.target.append(el)
  }
  generatePartialElement(timeStamp) {
    const liElement = document.createElement('li')
    Object.entries(timeStamp)
      .map(([label, time]) => [time, `${label} : ${time}`])
      .forEach(([data, text]) => {
        const dataElement = document.createElement('data')
        const textNode = document.createTextNode(text)
        dataElement.setAttribute('value', data.toString())
        dataElement.append(textNode)
        liElement.append(dataElement)
      })
    return liElement
  }
}

export default Renderer;