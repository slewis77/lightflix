import { Lightning } from '@lightningjs/sdk'
import { BACKGROUND_COLOUR, MAX_HEIGHT, MAX_WIDTH } from '../lib/settings'

export default class PageTemplate extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: MAX_WIDTH,
        h: MAX_HEIGHT,
        color: BACKGROUND_COLOUR,
      },
    }
  }
}
