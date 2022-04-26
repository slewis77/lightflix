import Boot from '../pages/Boot'
import Home from '../pages/Home'
import Movie from '../pages/Movie'
import NotFound from '../pages/NotFound'
import { getImageURI, getMovie } from './API'

export default {
  routes: [
    {
      path: '$',
      component: Boot,
    },
    {
      path: '*',
      component: NotFound,
    },
    {
      path: 'home',
      component: Home,
    },
    {
      path: 'movie/:movieId',
      component: Movie,
      before(page, { movieId }) {
        return getMovie(movieId).then(movie => {
          page.movieId = movieId
          page.title = movie.title
          page.poster = getImageURI(movie.poster_path)
          page.backdrop = getImageURI(movie.backdrop_path)
          page.released = movie.release_date
          page.overview = movie.overview
          page.tagline = movie.tagline
        })
      },
    },
  ],
}
