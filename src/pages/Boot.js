import { Router, Utils } from '@lightningjs/sdk'
import PageTemplate from './PageTemplate'

export default class Boot extends PageTemplate {
  static _template() {
    return {
      ...super._template(),
      Title: {
        x: 960,
        y: 150,
        mount: 0.5,
        text: {
          text: 'LightFlix',
          fontSize: 56,
        },
      },
      Logo: {
        x: 960,
        y: 540,
        size: 20,
        mountX: 0.5,
        mountY: 1,
        src: Utils.asset('images/logo.png'),
      },
      Enter: {
        x: 960,
        y: 800,
        mount: 0.5,
        text: {
          text: '[Press enter to continue]',
        },
      },
    }
  }

  _init() {
    this.enterAnimation = this.tag('Logo').animation({
      duration: 3,
      actions: [
        {
          p: 'scale',
          v: { 0: 1, 0.5: 2, 0.8: 4, 1: 8 },
        },
        {
          p: 'y',
          v: { 0: 540, 0.5: 760, 1: 920 },
        },
      ],
    })
  }

  _handleEnter() {
    this.animateHomeNavigate()
  }

  animateHomeNavigate() {
    this.tag('Title').patch({ alpha: 0 })
    this.tag('Enter').patch({ alpha: 0 })
    this.enterAnimation.play()
    this.enterAnimation.on('finish', () => {
      Router.navigate('home')
    })
  }
}
