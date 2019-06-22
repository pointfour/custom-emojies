function magic() {
    let elems = document.querySelectorAll('.FTBzM div div .copyable-text:not([p])')
    elems.forEach(e => {
        e.setAttribute("p", "")
        recursiveProcess(e)
    })
}
function recursiveProcess(elem) {
    let children = elem.childNodes
    for (let i = 0; i < children.length; i++) {
        recursiveProcess(children[i])
    }
    if (elem.nodeName == "#text") process(elem.textContent, text => elem.textContent = text, emojies => emojiMagic(elem, emojies))
}

function emojiMagic(textNode, emojies) {
    for (let key in emojies) {
        let index = textNode.textContent.indexOf(`:${key}:`)
        if (index != -1) {
            textNode.textContent = textNode.textContent.replace(`:${key}:`, "")
            emojiMagic(textNode.splitText(index), emojies)
            image = document.createElement("img")
            image.width = "20"
            image.height = "20"
            image.src = emojies[key]
            image.classList = "b65 emoji wa selectable-text invisible-space copyable-text"
            image.setAttribute("data-plain-text", `:${key}:`)
            textNode.parentElement.insertBefore(image, textNode.nextSibling)
        }
    }
}


function onChange(changes, observer) {
    magic()
}

var observer = new MutationObserver(onChange);

function init() {
    let observedElem = document.querySelector("._1ays2")
    if (!observedElem) {
        console.log("called")
        setTimeout(() => init(), 1000)
    } else {
        console.log(observedElem)
        magic()
        observer.observe(observedElem, {
            childList: true, characterData: true, attributes: true
        });
    }
}
init()