
const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const targetMovie = JSON.parse(localStorage.getItem('thisMoviePage'))
const actors = []

const view = {
  renderDataPanel(movie) {
    document.querySelector('#data-panel').innerHTML = this.getMovieElement(movie)
  },
  getMovieElement(movie) {
    return `
    <div class="movie-page-body">
        <div class="movie-image col-sm-7">
          <img
            src="${POSTER_URL + movie.image}"
            alt="">
        </div>
        <div class="movie-info col-sm-5">
          <button type="button" class="btn btn-info btn-favorite">Favorite</button>
          <h2>${movie.title}</h2>
          <p>${movie.release_date}</p>
          <p>劇情介紹</p>
          <div class="movie-description"><p>${movie.description}</p></div> 
        </div>
    </div>
    `
  },
  renderActorList(...actors) {
    console.log(model.randomActors(actors))
    document.querySelector('.rander-actor-list').innerHTML = this.getActorElement(model.randomActors(actors))
    actors = []
  },
  getActorElement(actorList) {
    let rawHTML = ``
    actorList.map(actor => {
      rawHTML += `
      <div class="actor-body">
        <div class="actor-list-image">
          <img src="${actor.avatar}" alt="Avatar">
        </div>
        <div class="actor-name">
          <h5>${actor.name}<h5>
        </div>
      </div>
      `
    })
    return rawHTML
  }
}

const model = {
  randomActors(actors) {
    const actorList = []
    for(let i = 0; i <= 10; i++){
      const index = Math.floor(Math.random() * actors.length) + 1
      actorList.push(actors[index])
    }
    return actorList
  }
}
axios
    .get("https://lighthouse-user-api.herokuapp.com/api/v1/users/")
    .then((response) =>{
      actors.push(...response.data.results)
      view.renderActorList(...response.data.results)
    })
    .catch((error) =>{
      console.log("error")
    })


view.renderDataPanel(targetMovie[0])
localStorage.removeItem('thisMoviePage')

