window.onload = () => {
  document.getElementById('btn').addEventListener('click', submit)
}



function submit() {
  const name = document.getElementById('name').value
  const src = document.getElementById('src').value
  const url = `https://customemojiextension.firebaseio.com/${name}.json`
  if (name) {
    window.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(src)
    }).then(res => {
      console.log(res)
      document.getElementById('name').value = ''
      document.getElementById('src').value = ''
    }).catch(err => {
      if (err) document.getElementById('output').innerText = err
    })
  }
}