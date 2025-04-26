import { raf } from '@emotionagency/utils'

export default class NavbarPos {
  $sc = document.querySelector('#scroll-container')
  $navbar = document.querySelector('.navbar')
  hovered = false

  constructor() {
    this.mouseFunc = e => {
      this.mouseHandler(e)
    }
  }

  init() {
    this.scrollPos = 0
    this.scrollNav = this.scrollNav.bind(this)
    raf.on(this.scrollNav)
  }

  mouseHandler(e) {
    if (e.screenY <= 300 || this.isFixed) {
      document.body.classList.remove('nav-hidden')
      this.hovered = true
    } else {
      this.hovered = false
      document.body.classList.add('nav-hidden')
    }
  }

  scrollNav() {
    this.top = -this.$sc.scrollTop

    if (this.hovered) {
      return
    }

    this.isVisible && this.addVisibility()

    this.isHidden && this.removeVisibility()

    this.scrollPos = -this.$sc.scrollTop

    this.addBg()
  }

  addBg() {
    if (this.$sc.scrollTop > window.innerHeight) {
      this.$navbar.classList.add('header--bg')
      return
    }
    this.$navbar.classList.remove('header--bg')
  }

  get isHidden() {
    return this.top < this.scrollPos && this.scrollPos < 0 && -this.top >= 0
  }

  get isVisible() {
    return this.top > this.scrollPos || this.isFixed
  }

  get isFixed() {
    return window.ss ? window.ss.isFixed : false
  }

  addVisibility() {
    document.body.style.setProperty(
      '--nav-height',
      this.$navbar.getBoundingClientRect().height + 'px'
    )
    document.body.classList.remove('nav-hidden')
    document.removeEventListener('mousemove', this.mouseFunc)
  }

  removeVisibility() {
    document.body.style.setProperty('--nav-height', '0px')

    document.body.classList.add('nav-hidden')
    document.addEventListener('mousemove', this.mouseFunc)
  }

  destroy() {
    this.scrollPos = 0
    raf.off(this.scrollNav)
  }
}
