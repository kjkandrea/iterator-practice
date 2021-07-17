class Renderer {
  constructor(target) {
    this.target = target;
  }
  render(timeStamp) {
    const el = this.generatePartialElement(timeStamp);
    this.target.append(el)
  }
  generatePartialElement(timeStamp) {
    return Object.entries(timeStamp)
      .map(([label, time]) => [time, `${label} : ${time}`])
      .reduce((elements, [data, text]) => {
        const dataElement = document.createElement('data')
        const textNode = document.createTextNode(text)
        dataElement.setAttribute('value', data.toString())
        dataElement.append(textNode)
        elements.append(dataElement)
        return elements;
      }, document.createElement('li'))

  }
}

export default Renderer;