import PageTemplate from './PageTemplate'
import Rail from '../components/Rail'
import { getUpcomingMovies } from '../lib/API'

const UPCOMING_PANEL_TAG = 'UpcomingPanel'
export default class Home extends PageTemplate {
  static _template() {
    return {
      ...super._template(),
      Title: {
        x: 10,
        y: 10,
        text: {
          text: 'Upcoming Movies',
        },
      },
      [UPCOMING_PANEL_TAG]: {
        type: Rail,
        y: 100,
        movieData: [],
      },
    }
  }

  async _init() {
    const { results } = await getUpcomingMovies(this.page)

    this.tag(UPCOMING_PANEL_TAG).patch({
      movieData: results,
    })
    this.tag(UPCOMING_PANEL_TAG).reload()
  }

  _getFocused() {
    return this.tag(UPCOMING_PANEL_TAG)
  }
}
