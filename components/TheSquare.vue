<script setup lang="ts">
import { raf } from '@emotionagency/utils'
interface iProps {
  axis?: 'x' | 'y'
  offset?: number
}

const props = withDefaults(defineProps<iProps>(), {
  axis: 'y',
  offset: 0.4,
})

const $el = ref<HTMLElement | null>(null)

const animate = () => {
  if (!$el.value) {
    return
  }

  const { top, left } = $el.value.getBoundingClientRect()

  if (props.axis === 'y') {
    if (top <= window.innerHeight * props.offset) {
      $el.value?.classList.add('js-active')
      return
    }
    // $el.value?.classList.remove('js-active')

    return
  }

  if (left <= window.innerWidth * props.offset) {
    $el.value?.classList.add('js-active')
    return
  }
  // $el.value?.classList.remove('js-active')
}

onMounted(() => {
  raf.on(animate)
})

onBeforeUnmount(() => {
  raf.off(animate)
})
</script>

<template>
  <div ref="$el" class="square"></div>
</template>
