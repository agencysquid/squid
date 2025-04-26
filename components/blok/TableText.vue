<script lang="ts" setup>
interface iItem {
  title: any
  text: string
}

interface iContent {
  content: iItem[]
}

interface iProps {
  blok: iContent
}

defineProps<iProps>()
</script>

<template>
  <div class="table-text">
    <div class="container table-text__wrapper">
      <div class="grid table-text__content-wrapper">
        <RichText
          v-if="blok?.content?.[0]?.title?.[0]"
          class="table-text__title"
          :text="blok.content[0].title[0].text"
        />
        <p v-if="blok?.content?.[0]?.text" class="table-text__desc">
          {{ blok?.content?.[0]?.text }}
        </p>
        <RichText
          v-if="blok?.content?.[1]?.title?.[0]"
          class="table-text__title"
          :text="blok.content[1].title[0].text"
        />
        <p v-if="blok?.content?.[1]?.text" class="table-text__desc">
          {{ blok?.content?.[1]?.text }}
        </p>
      </div>
    </div>
  </div>
</template>
