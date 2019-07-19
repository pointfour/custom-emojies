function emojiMagic(textNode, emojies) {
  // console.log(textNode, emojies)
  // for (let key in emojies) {
  //   let index = textNode.textContent.indexOf(`:${key}:`)
  // }
  for (let key in emojies) {
    let index = textNode.textContent.indexOf(`:${key}:`)
    console.log('hi')
    if (index != -1) {
      textNode.textContent = textNode.textContent.replace(`:${key}:`, '')
      emojiMagic(textNode.splitText(index), emojies)
      image = document.createElement('img')
      image.width = '24'
      image.height = '24'
      image.src = emojies[key]
      image.setAttribute('draggable', false)
      image.setAttribute('data-plain-text', `:${key}:`)
      textNode.parentElement.insertBefore(image, textNode.nextSibling)
    }
  }
}

function recursiveProcess(elem) {
  let children = elem.childNodes
  for (let i = 0; i < children.length; i++) {
    recursiveProcess(children[i])
  }
  if (elem.nodeName == '#text')
    process(
      elem.textContent,
      text => (elem.textContent = text),
      emojies => emojiMagic(elem, emojies)
    )
}

function magic() {
  let elems = document.querySelectorAll('mws-message-part-content:not([p])')
  elems.forEach(e => {
    e.setAttribute('p', '')
    recursiveProcess(e)
  })
}

function onChange(changes, observer) {
  magic()
}

var observer = new MutationObserver(onChange)
let observedElem

function init() {
  let newElem = document.querySelector('.content')
  setTimeout(() => init(), 500)
  if (newElem != observedElem) {
    // console.log(observedElem)
    observer.disconnect()
    observedElem = newElem
    magic()
    observer.observe(observedElem, {
      childList: true,
      characterData: true,
      attributes: true
    })
  }
}
init()
