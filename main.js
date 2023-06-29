// API URLs
const API_URL = 'https://api.thecatapi.com/v1/'
const RANDOM = 'images/search?limit=2'
const FAVOURITES = 'favourites/'
const UPLOAD = 'images/upload'
const KEY = 'live_2otnti5VuAuVlqIiYpTAmOhj6dQISjQRyGjnez8iEJJrLoajHjZI8B3BTntmWVwv'

// DOM query selectors
const section = document.querySelector('#favoritesMininos')
const spanError = document.querySelector('#error')
const randomImg1 = document.querySelector('#randomImg1')
const randomImg2 = document.querySelector('#randomImg2')
const btn1 = document.querySelector('#btn-1')
const btn2 = document.querySelector('#btn-2')

// All Functions
async function loadRandomMininos(){
  const res = await fetch(API_URL + RANDOM, { headers: {'x-api-key': KEY} })
  const data = await res.json()

  if (res.status !== 200){
    spanError.innerHTML = `Ocurrio un error: ${res.status}`
  }
  else{
    randomImg1.src = data[0].url
    randomImg2.src = data[1].url

    btn1.onclick = () => saveFavouriteMinino(data[0].id)
    btn2.onclick = () => saveFavouriteMinino(data[1].id)
  }
}

async function loadFavouritesMininos(){
  const res = await fetch(API_URL + FAVOURITES, { headers: {'x-api-key': KEY} })
  const data = await res.json()

  if (res.status !== 200){
    spanError.innerHTML = `Ocurrio un error: ${res.status} Message: ${data.message}`
  }
  else{
    section.innerHTML = ''
    
    const h2 = document.createElement('h2')
    const h2Text = document.createTextNode('Mininos Favoritos')

    h2.appendChild(h2Text)
    section.appendChild(h2)


    data.forEach(minino => {
      const article = document.createElement('article')
      const img = document.createElement('img')
      const btn = document.createElement('button')
      const btnText = document.createTextNode('Quitar Minino de Favoritos')

      img.src = minino.image.url
      img.width = 150
      btn.appendChild(btnText)
      btn.onclick = () => deleteFavouriteMinino(minino.id)
      article.appendChild(img)
      article.appendChild(btn)
      section.appendChild(article)
    })
  }
}

async function saveFavouriteMinino(id){
  const res = await fetch(API_URL + FAVOURITES, {
    method: 'POST',
    headers: { 
      'x-api-key': KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify({"image_id": id})
  })
  const data = await res.json()

  if (res.status !== 200){
    spanError.innerHTML = `Ocurrio un error: ${res.status} Message: ${data.message}`
  }
  else{
    loadFavouritesMininos()
  }
}

async function deleteFavouriteMinino(id){
  const res = await fetch(API_URL + FAVOURITES + id, {
    method: 'DELETE',
    headers: { 
      'x-api-key': KEY,
    },
  })
  const data = await res.json()

  if (res.status !== 200){
    spanError.innerHTML = `Ocurrio un error: ${res.status} Message: ${data.message}`
  }
  else{
    loadFavouritesMininos()
  }
}

async function uploadMininoPicture(){
  const form = document.querySelector('#uploadingForm')
  const formData = new FormData(form)
  const res = await fetch(API_URL + UPLOAD, {
    method: 'POST',
    headers: {
      'x-api-key': KEY
    },
    body: formData
  })
  const data = await res.json()

  if(res.status !== 201){
    spanError.innerHTML = `Ocurrio un error: ${res.status}`
  }
  else{
    console.log(data.url)
    saveFavouriteMinino(data.id)
  }
}

loadRandomMininos()
loadFavouritesMininos()
