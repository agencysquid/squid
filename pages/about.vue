<script setup lang="ts">
import { useTransition } from '~/composables/transition'
import { useAboutStory } from '~/composables/stories/about.story'

useTransition()
useObserver('.section')

const { story } = await useAboutStory()

const { headerColor } = useMenu()

onMounted(() => {
  headerColor.value = 'dark'
})
</script>

<template>
  <main>
    <PageMeta v-if="story.meta.length" :meta="story.meta[0]" />
    <section class="section section--nm about-1">
      <div class="container about-1__wrapper">
        <div
          v-if="story.screen_1[0].title_1[0].text"
          v-editable="story.screen_1[0]"
          class="grid about-1__text-wrapper"
        >
          <RichText
            data-a-h
            :text="story.screen_1[0].title_1[0].text"
            class="about-1__text"
          />
          <RichText
            data-a-t
            :text="story.screen_1[0].title_2[0].text"
            class="about-1__title"
          />
        </div>
      </div>
      <TheSocials data-a-o class="bottom-nav-socials" />
      <NextBlockButton :colorful="true" data-a-o>Scroll</NextBlockButton>
    </section>
    <section v-editable="story" class="section about-2">
      <div class="container about-2__wrapper">
        <TheSquare class="about-2__square" />
        <div class="grid about-2__text-wrapper">
          <p class="about-2__text">
            {{ story.screen_2 }}
          </p>
        </div>
      </div>
    </section>
    <section class="section about-3">
      <BlokImage
        v-if="story.screen_3[0].image"
        v-editable="story.screen_3[0]"
        class="about-3__img"
        :blok="{
          image: story.screen_3[0].image,
          fullscreen: story.screen_3[0].fullscreen,
          halfscreen: story.screen_3[0].halfscreen,
        }"
      />
    </section>
    <section
      v-if="story.screen_4[0]"
      v-editable="story.screen_4[0]"
      class="section about-4"
    >
      <BlokTableText2
        class="about-4__table-text"
        :blok="{
          title: story.screen_4[0].title,
          content: story.screen_4[0].content,
        }"
      />
    </section>
    <section
      v-if="story.screen_5[0]"
      v-editable="story.screen_5[0]"
      class="section about-5"
    >
      <BlokImageGrid
        class="about-5__img-grid"
        :blok="{
          title: story.screen_5[0].title[0].text,
          image: story.screen_5[0].image,
        }"
      />
    </section>
    <section
      v-if="story.screen_6[0]"
      v-editable="story.screen_6[0]"
      class="section about-6"
    >
      <div class="container about-6__wrapper">
        <div class="grid about-6__text-wrapper">
          <h2 class="about-6__title">{{ story.screen_6[0].title }}</h2>
          <p class="about-6__text">
            {{ story.screen_6[0].main_text }}
          </p>
        </div>
      </div>
    </section>
    <section
      v-if="story.screen_7[0]"
      v-editable="story.screen_7"
      class="section about-7"
    >
      <BlokImageGrid
        class="about-7__img-grid"
        :blok="{
          title: story.screen_7?.title,
          image: story.screen_7,
        }"
      />
    </section>
    <section
      v-if="story.screen_8[0]"
      v-editable="story.screen_8[0]"
      class="section about-8"
    >
      <BlokTableText :blok="story.screen_8[0]" />
    </section>
    <AboutScrollBottom v-if="story" v-editable="story" />
    <TheFooter />
  </main>
</template>
