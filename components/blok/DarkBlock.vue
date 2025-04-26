<script lang="ts" setup>
import type { ISbRichtext } from 'storyblok-js-client'

interface iContent {
  title: ISbRichtext
  text: ISbRichtext
}

interface iProps {
  blok: iContent
}

defineProps<iProps>()
</script>

<template>
  <div v-if="blok" class="section section--nm dark-block">
    <div class="container dark-block__wrapper">
      <div class="grid dark-block__text-wrapper">
        <RichText
          v-if="blok?.title"
          :text="blok?.title"
          class="dark-block__title"
        />
        <RichText
          v-if="blok?.text"
          class="dark-block__text"
          :text="blok?.text"
        />
      </div>
    </div>
  </div>
</template>
