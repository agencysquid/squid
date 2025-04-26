import { raf, delayPromise } from '@emotionagency/utils'

export const useBottomBlock = () => {
  const bottomText = ref('Scroll')
  const isRotated = ref(false)
  const isVisible = ref(true)
  const $items = ref(null)

  const animate = () => {
    $items.value.forEach($item => {
      const data = $item.dataset.bottomS
      const text = data.split('|')[0].replace("'", '').replace("'", '')
      const rotated = data.split('|')[1] === 'true'

      if (
        $item.getBoundingClientRect().top <= 0 &&
        $item.getBoundingClientRect().left <= 0
      ) {
        isVisible.value = !(data === 'undefined') && text !== 'undefined'

        bottomText.value = text
        isRotated.value = rotated
      }
    })
  }

  const init = () => {
    delayPromise(1000).then(() => {
      $items.value = document.querySelectorAll('[data-bottom-s]')

      raf.on(animate)
    })
  }

  const destroy = () => {
    raf.off(animate)
  }

  return { bottomText, isRotated, isVisible, init, destroy }
}
