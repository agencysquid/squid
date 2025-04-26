<script lang="ts" setup>
import { raf } from '@emotionagency/utils'

const disableHover = ref(false)

interface iContent {
  full_screen?: boolean
  platform?: 'youtube' | 'vimeo'
  url: string
}

interface iProps {
  blok: iContent
}

defineProps<iProps>()

const detectScrolling = () => {
  const isScrolling = window?.ss?.state?.scrolling

  disableHover.value = isScrolling
}

onMounted(() => {
  raf.on(detectScrolling)
})

onBeforeUnmount(() => {
  raf.off(detectScrolling)
})
</script>

<template>
  <div
    v-if="blok?.platform === 'vimeo'"
    class="vimeo-video"
    :class="!blok?.full_screen && 'container'"
    :style="disableHover && { pointerEvents: 'none' }"
  >
    <div style="padding: 56.84% 0 0 0; position: relative">
      <iframe
        :src="blok.url"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
      ></iframe>
    </div>
  </div>
  <div
    v-if="blok?.platform === 'youtube'"
    class="youtube-video"
    :class="!blok?.full_screen && 'container'"
    :style="disableHover && { pointerEvents: 'none' }"
  >
    <div style="padding: 56.84% 0 0 0; position: relative">
      <iframe
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
        :src="blok.url"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>
