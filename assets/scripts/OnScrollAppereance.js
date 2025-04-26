import gsap from 'gsap'

export class OnScrollAppereance {
  constructor($el, $wrapper, opts = {}) {
    this.$el = $el
    this.$wrapper = $wrapper
    this.offset = opts.offset || 0
    this.breakpoint = opts.breakpoint || 960

    this.animation()
  }

  animation() {
    if (screen.width > 960) {
      this.tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.$wrapper,
          pin: false,
          start: this.$el.getBoundingClientRect().left + window.innerWidth,
          scrub: 0.1,
          scroller: document.getElementById('scroll-container'),
        },
      })
    } else {
      this.tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.$wrapper.querySelector('.home-7'),
          pin: true,
          end: this.$wrapper.querySelector('.home-7').top,
          scrub: 0.1,
          scroller: document.getElementById('scroll-container'),
        },
      })
    }

    this.tl.to(this.$el, {
      y: 0,
      ease: 'linear.none',
    })
  }

  destroy() {
    this.tl.kill()
  }
}
