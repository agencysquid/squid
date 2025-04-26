<script lang="ts" setup>
import type { iImage } from '~/types/story'

interface iContent {
  image: iImage
  title: string
  disable_parallax: boolean
}

interface iProps {
  blok: iContent
}

defineProps<iProps>()
</script>

<template>
  <div class="image-with-text">
    <TheImage
      v-if="blok?.image"
      class="halfscreen"
      :transform="true"
      :src="blok?.image?.filename"
      :disabled-parallax="blok?.disable_parallax"
    />
    <h2 v-if="blok?.title" class="h2 image-with-text__h">{{ blok?.title }}</h2>
  </div>
</template>
