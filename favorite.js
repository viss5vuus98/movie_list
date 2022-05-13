const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const movies = JSON.parse(localStorage.getItem('favoriteMovies')) || []

function addPanel(data) {
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `
     <div class="col-sm-2">
        <div class="mb-2">
          <div class="card">
            <img src="${POSTER_URL + item.image}" class="card-img-top" alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
            </div>
          </div>
        </div>
      </div>
    `
  })
  dataPanel.innerHTML = rawHTML
}
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

function removeToFavorite(id) {
  if (!movies || !movies.length) return  
  const movieIndex = movies.findIndex((movie) => {
    return movie.id === id
  })
  if (movieIndex === -1) return
  movies.splice(movieIndex, 1)

  localStorage.setItem('favoriteMovies', JSON.stringify(movies))
  addPanel(movies)
}


dataPanel.addEventListener('click',event =>{
  const target = event.target
  if (target.matches('.btn-show-movie')) {
    showMovieModal(target.dataset.id)
  } else if (target.matches('.btn-remove-favorite')){
    removeToFavorite(Number(target.dataset.id))
  }
})

addPanel(movies)
// localStorage.removeItem('favoriteMovies')



// localStorage.removeItem('favoriteMovies')