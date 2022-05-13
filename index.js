const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const movies =[]

function getMovieContent(id) {
  const movieTemp = movies.find(movie => movie.id === id)
  transFormat(movieTemp)

}
function transFormat(movie) {
  const format = []
  format.push(movie)
  localStorage.setItem('thisMoviePage', JSON.stringify(format))
}

function addPanel(data) {
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `
     <div class="col-sm-2 movie-card">
        <div class="mb-2">
          <div class="card">
            <a href="movie.html"><img src="${POSTER_URL + item.image}" class="card-img-top" alt="Movie Poster" data-id="${item.id}"></a>
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      </div>
    `
  })
  dataPanel.innerHTML = rawHTML
}
axios
  .get(INDEX_URL)
  .then((response) => {
    movies.push(...response.data.results)
    addPanel(movies)
  })
  .catch((err) => {
    console.log('err')
  })
function showMovieModal(id) {
  const movieModalTitle = document.querySelector('#movie-modal-title')
  const movieModalImage = document.querySelector('#modal-movie-image')
  const movieModalDate = document.querySelector('#modal-movie-date')
  const movieModalDescription = document.querySelector('#modal-movie-des')
  axios
    .get(INDEX_URL + id)
    .then((response) => {
      const data = response.data.results
      movieModalTitle.innerText = data.title
      movieModalImage.innerHTML = `<img
                  src="${POSTER_URL + data.image}"
                  alt="Movie Poster">`
      movieModalDate.innerText = 'Release date: ' + data.release_date
      movieModalDescription.innerText = data.description
    })
}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || [] 
  const movie = movies.find((movie) => {
    return movie.id === id
  })
  if (list.some((movie) => movie.id === id)) {
    return alert('此電影已經在收藏清單中！')
  }
  list.push(movie)
  localStorage.setItem('favoriteMovies', JSON.stringify(list))
}


dataPanel.addEventListener('click',event =>{
  const target = event.target
  if (target.matches('.btn-show-movie')) {
    showMovieModal(target.dataset.id)
  } else if (target.matches('.btn-add-favorite')){
    addToFavorite(Number(target.dataset.id))
  } else if (target.matches('.card-img-top')){
    getMovieContent(Number(target.dataset.id))
  }
})

  // search bar

searchForm.addEventListener('submit', function onSearchFormSubmite(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  if(!keyword.length){
    addPanel(movies)
  }
  let filterMovies = []
  filterMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  )
  if(filterMovies.length === 0){
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
  }
  addPanel(filterMovies)
})



// localStorage.removeItem('favoriteMovies')



// localStorage.removeItem('favoriteMovies')