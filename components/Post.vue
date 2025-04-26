<script lang="ts" setup>
import type { ISbRichtext } from 'storyblok-js-client'
import type { iImage } from '~/types/story'
import TheVideo from './TheVideo.vue'

interface iProps {
  id: string
  title?: string
  category?: string
  date?: string | number
  author?: string
  description?: string | ISbRichtext
  image?: iImage
  video?: string
  link?: string
}

const props = defineProps<iProps>()

const formattedDate = useFormattedDate(props.date)

const typeOfDescription = computed(() => {
  return typeof props.description
})

const formattedDescription = computed(() => {
  if (typeof props.description !== 'string') {
    return
  }

  const descriptionWords = props.description.split(' ')
  if (!descriptionWords.length) {
    return ''
  }

  if (descriptionWords.length <= 40) {
    return props.description
  }

  return descriptionWords.slice(0, 40).join(' ') + '...'
})
</script>

<template>
  <li class="thoughts-2__li">
    <NuxtLink :to="link" class="thoughts-2__link">
      <div v-if="video">
        <TheVideo :video-id="video" class="thoughts-2__video" />
      </div>
      <TheImage
        v-else-if="image?.filename"
        :transform="true"
        class="thoughts-2__img"
        :src="image.filename"
        alt="Image"
      />
      <div class="thoughts-2__block">
        <div class="thoughts-2__text-wrapper">
          <div class="thoughts-2__name">
            <h3 class="thoughts-2__block-title">{{ title }}</h3>
            <p class="thoughts-2__category">
              Category <span>{{ category }}</span>
            </p>
          </div>
          <div class="thoughts-2__desc">
            <p v-if="formattedDate && author" class="thoughts-2__date">
              {{ formattedDate }} / {{ author }}
            </p>
            <p v-if="typeOfDescription === 'string'" class="thoughts-2__text">
              {{ formattedDescription }}
            </p>

            <ClientOnly v-else-if="typeOfDescription === 'object'">
              <RichText class="thoughts-2__text" :text="description" />
            </ClientOnly>
            <TextButton class="thoughts-2__text-btn" tag="button">
              READ MORE
            </TextButton>
          </div>
        </div>
      </div>
    </NuxtLink>
  </li>
</template>
