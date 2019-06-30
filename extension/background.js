chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "emoji-fetch") {
        if (emojies[request.name]) {
            sendResponse(emojies[request.name])
        } else {
            window.fetch(`https://customemojiextension.firebaseio.com/${request.name}.json`).then(res => {
                return res.json()
            }).then(src => {
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