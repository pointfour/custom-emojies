

const process = (() => {
    // let emojies = {
    //     "test": "https://i.imgur.com/bYb5By0.jpg"
    // }
    //https://firestore.googleapis.com/v1beta1/projects/customemojiextension/databases/(default)/documents/emojies/creepytree

    async function loadNewEmojies(querys, converts) {
        let promises = []
        for (let i = 0; i < querys.length; i++) {
            promises.push(loadEmoji(querys[i], converts))
        }
        return Promise.all(promises)
    }

    async function loadEmoji(name, converts) {
        // console.log(`loaded the :${name}: emoji`)
        return new Promise(resolve => {
            chrome.runtime.sendMessage({
                type: 'emoji-fetch',
                name
            }, src => {
                // emojies[name] = src
                converts[name] = src
                resolve('')
            })
        })


    }

    return function process(text, textcallback, emojicallback) {
        if (text == "/shrug") textcallback(`¯\\_(ツ)_/¯`)

        let converts = {}
        // for (let key in emojies) {
        //     if (text.includes(`:${key}:`)) converts[key] = emojies[key]
        // }
        let iterate = text.matchAll(/:(.*?):/g)
        let next = iterate.next()
        let querys = []
        while (!next.done) {
            // console.log(next.value, text)
            // if (text.includes(next.value[0])) {
            //     if (emojies[next.value[1]]) {
            //         converts[next.value[1]] = emojies[next.value[1]]
            //     } else {
            //         if (!querys.includes(next.value[1])) querys.push(next.value[1])
            //     }
            // }
            querys.push(next.value[1])
            next = iterate.next()
        }
        loadNewEmojies(querys, converts).then(() => {
            if (Object.keys(converts).length > 0) emojicallback(converts)
        })
    }
}
)()