<script lang="ts" setup>
import type { iStory } from '~/types/story'

interface iPoint {
  _uid: string
  roi_point_title: string
  case_study: iStory
}

interface iProps {
  title: string
  description: string
  items: iPoint[]
  isHome?: boolean
}

const props = defineProps<iProps>()

let es

const $el = ref(null)
const $scrollWrapper = ref(null)
const $wrapper = ref(null)
const $children = ref(null)
const $container = ref(null)

const blockHeight = ref(0)

onMounted(async () => {
  const { ExpertiseScroller } = await import(
    '~/assets/scripts/ExpertiseScroller'
  )

  es = new ExpertiseScroller($wrapper.value, $el.value, $children.value)
})

onBeforeUnmount(() => {
  es && es.destroy()
})

onMounted(() => {
  blockHeight.value = props.items.length * 100
})
</script>

<template>
  <section
    ref="$el"
    class="section expertise-6"
    :class="isHome && 'expertise-6--home'"
    :style="`--block-height: ${blockHeight}vh`"
  >
    <div ref="$container" class="container expertise-6__wrapper">
      <TheSquare class="expertise-6__square" />
      <div class="expertise-6__content">
        <h2 class="expertise-6__title">{{ title }}</h2>
        <p class="expertise-6__desc">
          {{ description }}
        </p>
      </div>
      <div ref="$scrollWrapper" class="expertise-6__scroll-wrapper">
        <ul ref="$wrapper" class="expertise-6__list-items">
          <li
            v-for="item in items"
            ref="$children"
            :key="item._uid"
            class="expertise-6__item"
          >
            <h3 class="expertise-6__item-title">
              {{ item.roi_point_title }}
            </h3>
            <p class="expertise-6__text">{{ item?.case_study?.name }}</p>
            <NuxtLink
              v-if="item?.case_study?.full_slug"
              :to="`/${item?.case_study?.full_slug}`"
              class="expertise-6__btn"
              >VIEW CASE STUDY</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
