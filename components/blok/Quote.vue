<script lang="ts" setup>
interface iContent {
  quote: string
  author: string
}

interface iProps {
  blok: iContent
}

defineProps<iProps>()
</script>

<template>
  <div class="section section--nm quote">
    <div class="container grid quote__wrapper">
      <blockquote v-if="blok?.quote" class="quote__title">
        {{ blok.quote }}
      </blockquote>
      <p v-if="blok?.author" class="quote__rotate-text">{{ blok.author }}</p>
    </div>
  </div>
</template>
