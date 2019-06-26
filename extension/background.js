chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "emoji-fetch") {
        if (emojies[request.name]) {
            sendResponse(emojies[request.name])
        } else {
            window.fetch(`https://firestore.googleapis.com/v1beta1/projects/customemojiextension/databases/(default)/documents/emojies/${request.name}`).then(res => {
                return res.json()
            }).then(actualres => {
                let src = actualres.fields.src.stringValue
                emojies[request.name] = src
                sendResponse(src)
            })
        }
        return true
    }
});


let emojies = {
    "test": "https://i.imgur.com/bYb5By0.jpg"
}