import { Router } from '@lightningjs/sdk'
import Rail from '../components/Rail'
import { getSimilarMovies } from '../lib/API'
import { MAX_WIDTH } from '../lib/settings'
import PageTemplate from './PageTemplate'

export default class Movie extends PageTemplate {
  static _template() {
    return {
      ...super._template(),
      Backdrop: {
        src: this.bindProp('backdrop'),
        alpha: 0.7,
      },
      Poster: {
        x: 60,
        y: 40,
        w: 315,
        h: 405,
        src: this.bindProp('poster'),
      },
      Title: {
        x: 450,
        y: 40,
        w: MAX_WIDTH - 450 - 60,
        text: {
          text: this.bindProp('title'),
          fontSize: 50,
          fontStyle: 'bold',
          wordWrap: false,
          textOverflow: 'ellipsis',
        },
      },
      Released: {
        x: 450,
        y: 110,
        w: MAX_WIDTH - 450 - 60,
        text: {
          text: this.bindProp(
            'released',
            context => `Released ${new Date(context.released).toDateString()}`
          ),
          fontSize: 24,
          textOverflow: 'ellipsis',
        },
      },
      Overview: {
        x: 450,
        y: 150,
        w: MAX_WIDTH - 450 - 60,
        h: 500,
        text: {
          text: this.bindProp('overview'),
          fontSize: 32,
          textOverflow: 'ellipsis',
        },
      },
      Similar: {
        x: 10,
        y: 500,
        mount: 0,

        Title: {
          text: {
            text: 'Similar Movies',
          },
        },
        Rail: {
          type: Rail,
          y: 80,
          cardScale: 0.55,
          movieData: [],
        },
      },
    }
  }

  _getFocused() {
    return this.tag('Similar.Rail')
  }

  async _onChanged() {
    const rail = this.tag('Similar.Rail')

    const { results } = await getSimilarMovies(this.movieId, this.page)
    rail.patch({
      movieData: results,
    })
    rail.reload()
  }

  _handleBack() {
    Router.navigate('home')
  }
}
