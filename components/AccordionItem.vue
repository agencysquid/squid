<script lang="ts" setup>
import { resize } from '@emotionagency/utils'

interface iProps {
  title: string
  text: string
  id: string
  isOpen: boolean
  lastItem: boolean
  numberItem: number
}

const props = defineProps<iProps>()

const emit = defineEmits(['clicked'])

const $el = ref(null)
const $child = ref(null)
const height = ref(0)

const onResize = () => {
  height.value = $child.value.scrollHeight * 0.01
  $el.value.style.setProperty('--h', `${height.value}px`)
}

const onClick = () => {
  onResize()
  emit('clicked', props.id)
}

onMounted(() => {
  setTimeout(() => {
    resize.on(onResize)
  }, 0)
})

onBeforeUnmount(() => {
  resize.off(onResize)
})

defineExpose({
  onClick,
})
</script>

<template>
  <button
    ref="$el"
    class="accordion__btn"
    :class="[isOpen && 'opened']"
    @click="onClick"
  >
    <div class="accordion__line" />
    <div class="accordion__content">
      <p class="accordion__number">0{{ numberItem }}</p>
      <h2 class="accordion__title">{{ title }}</h2>
      <div class="accordion__plus-container">
        <span></span>
        <span></span>
      </div>
      <p ref="$child" class="accordion__text">
        {{ text }}
      </p>
    </div>
    <div v-if="lastItem" class="accordion__line" />
  </button>
</template>
