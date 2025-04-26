import Scrolling from './Scrolling'
import { resize } from '@emotionagency/utils'

export class ExpertiseScroller extends Scrolling {
  constructor($wrapper, $el, $children) {
    super($wrapper, $el)
    this.$el = $wrapper

    this.$children = $children
    this.resize = this.resize.bind(this)
    resize.on(this.resize)
  }

  resize() {
    if (screen.width >= 960) {
      super.init()
    }
  }

  get length() {
    return this.$children.length
  }

  get top() {
    const min = 0
    const max =
      this.$el.getBoundingClientRect().width -
      this.$children[this.length - 1].getBoundingClientRect().width
    return this.computeFromMinToMax(min, max)
  }

  onScroll() {
    super.onScroll()

    this.$el.style.transform = `translateX(${-this.top + 'px'})`
  }
  destroy() {
    super.destroy()
    resize.off(this.resize)
  }
}
