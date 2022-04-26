import { Router } from '@lightningjs/sdk'
import PageTemplate from './PageTemplate'

export default class NotFound extends PageTemplate {
  static _template() {
    return {
      ...super._template(),
      About: {
        x: 960,
        y: 200,
        mount: 0.5,
        text: {
          text: '404 Page Not Found',
        },
      },
      GoHome: {
        x: 960,
        y: 600,
        mount: 0.5,
        text: {
          text: '[Press back to return Home]',
        },
      },
    }
  }

  _handleBack() {
    Router.navigate('home')
  }
}
