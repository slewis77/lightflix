const API_KEY = 'b4a6413a432c59408e1afe3aa9434d94'
const BASE_URI = 'https://api.themoviedb.org/3/movie'
const IMAGE_BASE_URI = 'https://image.tmdb.org/t/p/original/'

const constructURI = (path, params) => {
  let uri = `${BASE_URI}${path}?api_key=${API_KEY}`

  params &&
    params.forEach(param => {
      uri += `&${param.name}=${param.value}`
    })

  return uri
}

export const getUpcomingMovies = async (page = 1) => {
  const response = await fetch(constructURI('/upcoming', [{ name: 'page', value: page }]))
  return await response.json()
}

export const getSimilarMovies = async (id, page = 1) => {
  const response = await fetch(constructURI(`/${id}/similar`, [{ name: 'page', value: page }]))
  return await response.json()
}

export const getImageURI = path => {
  return `${IMAGE_BASE_URI}${path}`
}

export const getMovie = async id => {
  const response = await fetch(constructURI(`/${id}`))
  return await response.json()
}
