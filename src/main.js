// API URLs
const API_URL = 'https://api.thecatapi.com/v1/'
const RANDOM = 'images/search?limit=2'
const FAVOURITES = 'favourites/'
const UPLOAD = 'images/upload'
const KEY = 'live_2otnti5VuAuVlqIiYpTAmOhj6dQISjQRyGjnez8iEJJrLoajHjZI8B3BTntmWVwv'

// DOM query selectors
const section = document.querySelector('#favoritesMininos')
const spanError = document.querySelector('#error')
const randomImgContainer = document.querySelector('#randomImgContainer')
const randomImg1 = document.querySelector('#randomImg1')
const randomImg2 = document.querySelector('#randomImg2')
const form = document.querySelector('#uploadingForm')
const selectImg = document.querySelector('#selectImg')
const uploadImg = document.querySelector('#file')
const articleContainer = document.querySelector('#articleContainer')

selectImg.addEventListener('click', () => {uploadImg.click()})
uploadImg.addEventListener('change', () => {
  const [file] = uploadImg.files
  if (file) {
    selectImg.innerHTML = ''
    selectImg.innerHTML = `<img class="w-full object-cover rounded-xl" src="${URL.createObjectURL(file)}" alt="Your cat Picture">`
  }
})

// All Functions
async function loadRandomMininos(){
  const res = await fetch(API_URL + RANDOM, { headers: {'x-api-key': KEY} })
  const data = await res.json()
  const pinkStar = 'absolute bottom-0 right-0 p-1.5 rounded-br-xl rounded-tl-xl bg-pink-300 bg-opacity-75 text-4xl text-yellow-200 cursor-pointer md:text-4xl md hydrated'

  randomImgContainer.setAttribute('class', 'flex flex-col w-full h-full place-items-center justify-center gap-5 md:col-start-1 md:col-end-3 md:row-start-1 row-end-3 md:gap-8 lg:flex-row lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 lg:justify-center')
  randomImgContainer.innerHTML = ''

  let counter = 1
  data.forEach(minino => {
    randomImgContainer.innerHTML += `
    <article class="relative shadow-neon border-2 border-CyanNeon rounded-xl h-1/3 w-full md:h-1/2 md:min-w-[200px] lg:h-full lg:w-auto">
    <img class="block w-full h-full object-top object-cover rounded-xl lg:object-center lg:w-auto" src="${minino.url}" id="randomImg${counter}" alt="Foto gatito aleatorio">
    <ion-icon class="absolute bottom-0 right-0 p-1.5 rounded-br-xl rounded-tl-xl bg-pink-300 bg-opacity-75 text-4xl cursor-pointer md:text-4xl md hydrated" id="btn-${counter}" onclick="saveFavouriteMinino()" name="star"></ion-icon>
    </article>
    `
    counter++
  });

  const btn1 = document.querySelector('#btn-1')
  const btn2 = document.querySelector('#btn-2')

  btn1.onclick = () => {
    btn1.setAttribute('class', pinkStar)
    saveFavouriteMinino(data[0].id)
  }
  btn2.onclick = () => {
    btn2.setAttribute('class', pinkStar)
    saveFavouriteMinino(data[1].id)
  }
}

async function loadFavouritesMininos(){
  const res = await fetch(API_URL + FAVOURITES, { headers: {'x-api-key': KEY} })
  const data = await res.json()

  articleContainer.innerHTML = ''

  data.forEach(minino => {
    articleContainer.innerHTML += `
    <article class="w-full h-4/10 flex flex-col place-items-center gap-y-5 px-4 md:flex-row md:justify-between lg:flex-col lg:p-0">
    <img class="w-full h-full object-center object-cover rounded-xl shadow-neon shadow-pink-600 border-2 border-pink-600 md:w-2/3 lg:w-full lg:h-[450px]" src="${minino.image.url}" alt="Tu gatito favorito">
    <button class="font-bold shadow-neon shadow-CyanNeon border-2 border-CyanNeon bg-cyan-300 text-cyan-800 rounded-xl py-2 px-4 text-xl md:py-6" id="${minino.id}" onclick="deleteFavouriteMinino(this.id)">Quitar Favorito<button>
    </article>
    `
  })
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

  loadFavouritesMininos()
}

async function deleteFavouriteMinino(id){
  const res = await fetch(API_URL + FAVOURITES + id, {
    method: 'DELETE',
    headers: { 
      'x-api-key': KEY,
    },
  })
  const data = await res.json()

  loadFavouritesMininos()
}

async function uploadMininoPicture(){
  const formData = new FormData(form)
  const res = await fetch(API_URL + UPLOAD, {
    method: 'POST',
    headers: {
      'x-api-key': KEY
    },
    body: formData
  })
  const data = await res.json()

  console.log(data.url)
  saveFavouriteMinino(data.id)
}

loadRandomMininos()
loadFavouritesMininos()
