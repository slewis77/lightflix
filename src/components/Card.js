import { Lightning } from '@lightningjs/sdk'
import { getImageURI } from '../lib/API'

export default class Card extends Lightning.Component {
  static _template() {
    return {
      Label: {
        y: y => y + 50,
        w: w => w,
        text: {
          text: this.bindProp('title'),
          fontSize: 24,
          textOverflow: 'ellipsis',
          wordWrap: this.bindProp('wordWrap'),
        },
      },
    }
  }

  _init() {
    this.patch({
      src: getImageURI(this.poster),
    })
  }
}
