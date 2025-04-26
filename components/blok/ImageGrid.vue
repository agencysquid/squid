<script lang="ts" setup>
import type { iImage } from '~/types/story'
import type { ISbRichtext } from 'storyblok-js-client'

interface iGridItem {
  vimeo_video_id?: string
  image: iImage
  _uid: string
}

interface iContent {
  title: string | ISbRichtext
  image: iGridItem[]
  disable_parallax?: boolean
}

interface iProps {
  blok: iContent
}

defineProps<iProps>()
</script>

<template>
  <div class="image-grid">
    <div class="container image-grid__wrapper">
      <RichText
        v-if="blok?.title"
        :text="blok?.title"
        class="image-grid__title"
      />
      <ul
        class="image-grid__img-list"
        :class="blok?.title && 'image-grid__img-list--with-title'"
      >
        <li
          v-for="item in blok?.image"
          :key="item._uid"
          class="image-grid__li"
          :data-parallax="!blok?.disable_parallax && -0.1"
        >
          <figure>
            <div v-if="item?.vimeo_video_id" class="p-img-wrapper">
              <div
                class="p-img-container"
                :data-parallax="!blok?.disable_parallax && 0.06"
              >
                <TheVideo
                  :video-id="item?.vimeo_video_id"
                  class="image-grid__video"
                  :data-parallax="!blok?.disable_parallax && 0.06"
                  :data-scale="!blok?.disable_parallax && 1.07"
                  :data-scale-animation="!blok?.disable_parallax && true"
                />
              </div>
            </div>

            <TheImage
              v-else
              :transform="true"
              :disabled-parallax="blok?.disable_parallax"
              class="image-grid__img"
              :src="item?.image?.filename"
              :alt="item?.image?.alt"
            />
            <figcaption v-if="item?.image?.name" class="figcaption">
              {{ item?.image?.name }}
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>
