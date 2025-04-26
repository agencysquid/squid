import gsap from 'gsap'
import type { TransitionProps } from 'vue'
import { resetScroll } from './utils/resetScroll'

export const pageTransition: TransitionProps = {
  mode: 'out-in',
  css: false,
  appear: true,
  onEnter(el, done) {
    setTimeout(() => {
      resetScroll()

      document.documentElement.style.cursor = 'auto'
      document.body.style.pointerEvents = 'auto'
    }, 150)

    gsap.fromTo(
      el,
      { opacity: 0 },
      { duration: 0.5, opacity: 1, onComplete: done }
    )
  },

  onLeave(el, done) {
    document.documentElement.style.cursor = 'wait'
    document.body.style.pointerEvents = 'none !important'

    setTimeout(() => {
      window.ss.isFixed = true
    }, 200)

    gsap.fromTo(
      el,
      { opacity: 1 },
      { duration: 0.5, opacity: 0, y: -100, onComplete: done }
    )
    setTimeout(() => {
      resetScroll()
    }, 500)
  },
}
