class Renderer {
  constructor(target, startUnixTime) {
    this.target = target;
    this.startUnixTime = startUnixTime
  }
  render(timeStamp) {
    const el = this.generatePartialElement(timeStamp);
    this.target.append(el)
  }
  generatePartialElement(timeStamp) {
    return Object.entries(timeStamp)
      .map(([label, time]) => [time, `${label} : ${time}`, label])
      .reduce((element, [data, text, className]) => {
        const dataElement = document.createElement('data')
        const textNode = document.createTextNode(text)

        // set node & attr
        dataElement.setAttribute('value', data.toString())
        dataElement.append(textNode)
        dataElement.classList.add(className)

        // set style
        const unit = 'px'
        switch(className) {
          case 'start':
            element.style.paddingLeft = (timeStamp.start - this.startUnixTime) + unit
            break;
          case 'end':
            dataElement.style.width = (timeStamp.end - timeStamp.start) + unit
            break;
          case 'margin':
            dataElement.style.width = (timeStamp.margin) + unit;
            break;
        }

      element.append(dataElement)
        return element;
      }, document.createElement('li'))

  }
}

export default Renderer;