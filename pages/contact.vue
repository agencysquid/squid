<script setup lang="ts">
import { useTransition } from '~/composables/transition'
import { useContactStory } from '~~/composables/stories/contact.story'

useTransition()

const { headerColor } = useMenu()

onMounted(() => {
  headerColor.value = 'white'
})

const { story } = await useContactStory()
</script>

<template>
  <main data-a-o>
    <PageMeta v-if="story.meta.length" :meta="story.meta[0]" />
    <TheFooter />
  </main>
</template>
