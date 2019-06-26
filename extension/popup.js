window.onload = () => {
    document.getElementById("btn").addEventListener("click", submit)
    document.getElementById("name").value = "blobross"
    document.getElementById("src").value = "https://discordemoji.com/assets/emoji/blobross.png"
}



function submit() {
    const name = document.getElementById("name").value
    const src = document.getElementById("src").value
    const url = `https://firestore.googleapis.com/v1beta1/projects/customemojiextension/databases/(default)/documents/emojies/`
    let data = {
        fields: {
            created: { timestampValue: new Date() },
            modified: { timestampValue: new Date() }
        }
    }
    window.fetch(url, {
        method: "POST"
    }).then(res => {
        console.log(res)
    }).catch(err => {
        if (err) document.getElementById("output").innerText = err
    })
}