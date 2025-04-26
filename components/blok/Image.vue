<script lang="ts" setup>
import type { iImage } from '~/types/story'

interface iContent {
  fullscreen?: boolean
  halfscreen?: boolean
  image: iImage
  disable_parallax?: boolean
}

interface iProps {
  blok: iContent
}

defineProps<iProps>()
</script>

<template>
  <div v-if="!blok.fullscreen" class="container">
    <figure>
      <TheImage
        :transform="true"
        :class="blok?.halfscreen && 'halfscreen'"
        :src="blok?.image?.filename"
        :disabled-parallax="blok?.disable_parallax"
      />
      <figcaption v-if="blok?.image?.name" class="figcaption">
        {{ blok?.image?.name }}
      </figcaption>
    </figure>
  </div>
  <figure v-else>
    <TheImage
      :transform="true"
      :src="blok?.image?.filename"
      :class="blok?.halfscreen && 'halfscreen'"
      :disabled-parallax="blok?.disable_parallax"
    />
    <figcaption v-if="blok?.image?.name" class="figcaption">
      {{ blok?.image?.name }}
    </figcaption>
  </figure>
</template>
