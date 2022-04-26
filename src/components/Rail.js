import { Lightning, Router } from '@lightningjs/sdk'
import { MAX_WIDTH } from '../lib/settings'
import Card from './Card'

const CARD_WIDTH = 300
const CARD_HEIGHT = 450
const CARD_MARGIN = 10
const SELECTED_SCALE = 1.2

export default class Rail extends Lightning.Component {
  static _template() {
    return {
      w: MAX_WIDTH,
      rect: true,
      Movies: {
        flex: {
          wrap: false,
          justifyContent: 'space-between',
        },
        children: [],
      },
    }
  }

  _init() {
    this.startIndex = 0
  }

  _handleLeft() {
    if (!this.movies) {
      return
    }

    if (this.index > 0) {
      this.index--
    } else if (this.startIndex > 0) {
      this.startIndex--
      this.loadMovies()
    }

    if (this.currentAnimation) {
      this.currentAnimation.stopNow()
    }
    this.currentAnimation = this.getAnimationFromCardIndex(this.index)
    this.currentAnimation.start()
  }

  _handleRight() {
    if (!this.movies) {
      return
    }

    if (this.index < this.movies.length - 1) {
      this.index++

      if (this.currentAnimation) {
        this.currentAnimation.stopNow()
      }

      if (!this.isSelectedCardVisible()) {
        this.startIndex++
        this.index--
        this.loadMovies()
      }

      this.currentAnimation = this.getAnimationFromCardIndex(this.index)
      this.currentAnimation.start()
    }
  }

  _handleEnter() {
    if (this.index < 0) {
      return
    }

    Router.navigate(`movie/${this.movies[this.index].movieId}`)
  }

  async reload() {
    this.index = 0
    if (!this.cardScale) {
      this.cardScale = 1
    }

    this.loadMovies()
    this.currentAnimation = this.getAnimationFromCardIndex(this.index)
    this.currentAnimation.start()
  }

  loadMovies() {
    if (!this.movieData) {
      return
    }

    const movies = this.movieData
      .filter((movie, index) => index >= this.startIndex)
      .map(movie => {
        return {
          type: Card,
          flexItem: {
            margin: CARD_MARGIN,
          },
          w: CARD_WIDTH * this.cardScale,
          h: CARD_HEIGHT * this.cardScale,
          movieId: movie.id,
          title: movie.title,
          wordWrap: false,
          poster: movie.poster_path,
        }
      })

    this.tag('Movies').patch({
      children: movies,
    })

    this.movies = this.tag('Movies').children
  }

  getAnimationFromCardIndex(index) {
    if (!this.movies[index].highlight) {
      this.movies[index].highlight = this.movies[index].animation({
        duration: 0.01,
        actions: [
          {
            p: 'w',
            v: {
              0: CARD_WIDTH * this.cardScale,
              1: CARD_WIDTH * this.cardScale * SELECTED_SCALE,
            },
          },
          {
            p: 'h',
            v: {
              0: CARD_HEIGHT * this.cardScale,
              1: CARD_HEIGHT * this.cardScale * SELECTED_SCALE,
            },
          },
          {
            p: 'wordWrap',
            v: {
              0: false,
              0.1: true,
            },
          },
        ],
      })
    }

    return this.movies[index].highlight
  }

  isSelectedCardVisible() {
    let space = CARD_WIDTH * this.cardScale * SELECTED_SCALE + CARD_MARGIN * 2
    if (this.index > 1) {
      space += this.index * (CARD_WIDTH * this.cardScale + CARD_MARGIN * 2)
    }
    return space < this.w
  }
}
