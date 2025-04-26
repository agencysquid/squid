import gsap from 'gsap'

export class RotateOnScroll {
  constructor($el) {
    this.$el = $el
  }

  animate() {
    this.tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: document.getElementById('scroll-container'),
          pin: false,
          scrub: 0.2,
          start: 0,
          scroller: document.getElementById('scroll-container'),
          end: '+=10000',
        },
      })
      .to(this.$el, {
        rotation: 360 * 5,
        duration: 1,
        ease: 'none',
      })
  }

  destroy() {
    this.tl && this.tl.kill()
  }
}
