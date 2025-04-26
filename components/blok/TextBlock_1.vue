<script lang="ts" setup>
import type { ISbRichtext } from 'storyblok-js-client'

interface iContent {
  title?: string | ISbRichtext
  main_text: string | ISbRichtext
  aligned?: boolean
}

interface iProps {
  blok: iContent
}

const props = defineProps<iProps>()

const typeOfMainText = computed(() => {
  return typeof props.blok?.main_text
})

const typeOfTitle = computed(() => {
  return typeof props.blok?.title
})

const breakLine = useBreakLine()
</script>

<template>
  <div class="container">
    <div class="text-block-1" :class="!blok.aligned && 'text-block-1--aligned'">
      <RichText
        v-if="
          typeOfTitle === 'object' &&
          Array.isArray(blok.title) &&
          blok?.title?.length
        "
        class="text-block-1__title"
        :text="blok.title[0].text"
      />
      <RichText
        v-if="blok?.title && typeOfTitle === 'string'"
        class="text-block-1__title"
        :text="blok.title"
      />
      <p
        v-if="blok?.main_text && typeOfMainText === 'string'"
        v-html="breakLine(blok.main_text)"
      />
      <div
        v-else-if="blok?.main_text && typeOfMainText === 'object'"
        class="text-block-1__desc"
      >
        <RichText :text="blok.main_text" />
      </div>
    </div>
  </div>
</template>
