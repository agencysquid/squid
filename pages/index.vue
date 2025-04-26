<script setup lang="ts">
import { useTransition } from '~/composables/transition'
import { useProjectsStories } from '~/composables/stories/projects.story'
import { useHomeStory } from '~~/composables/stories/home.story'

import { delayPromise } from '@emotionagency/utils'

useTransition()
useObserver('.section')

const { stories: projects } = await useProjectsStories()

const $el = ref(null)
const $container = ref(null)
const $scroller = ref(null)

const $scrollEl = ref(null)
const $colorEl = ref(null)
const $overlay = ref(null)
let sa

const { story } = await useHomeStory()

const { bottomText, isRotated, isVisible, init, destroy } = useBottomBlock()
const { headerColor } = useMenu()

onMounted(async () => {
  const { HorizontalScroll } = await import('~/assets/scripts/HorizontalScroll')

  const { OnScrollColor } = await import('~/assets/scripts/OnScrollColor')

  const { OnScrollAppereance } = await import(
    '~/assets/scripts/OnScrollAppereance'
  )

  await delayPromise(500)
  new OnScrollColor($colorEl.value, $overlay.value)

  new HorizontalScroll($el.value, $container.value, $scroller.value)

  await delayPromise(100)

  sa = new OnScrollAppereance($scrollEl.value, $container.value)

  init()

  headerColor.value = 'white'
})

onBeforeUnmount(() => {
  sa && sa.destroy()

  destroy()
})
</script>

<template>
  <main>
    <PageMeta v-if="story.meta.length" :meta="story.meta[0]" />
    <div ref="$colorEl" class="color-changer">
      <TheVideo
        data-a-o
        class="home-1__video"
        :video-id="story?.hero_video"
        :responsive="false"
      >
        <div ref="$overlay" class="home-1__video-overlay"></div>
      </TheVideo>

      <section
        v-if="story.storytelling[0].screen_1[0].text"
        v-editable="story.storytelling[0].screen_1[0]"
        :data-bottom-s="`${story?.bottom_phrases[0]?.text}|${story?.bottom_phrases[0]?.rotated}`"
        class="section section--nm home-1"
      >
        <div class="container home-1__wrapper">
          <RichText
            data-a-h
            class="home-1__title"
            :text="story.storytelling[0].screen_1[0].text"
          />
        </div>
        <TheSocials data-a-o class="bottom-nav-socials" />
        <NextBlockButton
          data-a-o
          :is-fixed="true"
          :is-rotated="isRotated"
          :is-visible="isVisible"
          >{{ bottomText }}</NextBlockButton
        >
      </section>
      <section
        v-if="story.storytelling[0].screen_2[0].text"
        v-editable="story.storytelling[0].screen_2[0]"
        :data-bottom-s="`${story?.bottom_phrases[1]?.text}|${story?.bottom_phrases[1]?.rotated}`"
        class="section section--nm home-2"
      >
        <div class="container home-2__wrapper">
          <RichText
            class="home-1__title"
            :text="story.storytelling[0].screen_2[0].text"
          />
        </div>
      </section>
      <div class="home-all-w">
        <div ref="$container" class="wrapper">
          <div ref="$scroller" class="scroller">
            <div ref="$el" class="scroller-el">
              <section
                v-if="story.storytelling[0].screen_3[0].text"
                v-editable="story.storytelling[0].screen_3[0]"
                :data-bottom-s="`${story?.bottom_phrases[2]?.text}|${story?.bottom_phrases[2]?.rotated}`"
                class="section section--nm home-3"
              >
                <div class="container home-3__wrapper">
                  <div class="home-1__title">
                    <RichText :text="story.storytelling[0].screen_3[0].text" />
                    <RichText :text="story.storytelling[0].screen_3[1].text" />
                  </div>
                </div>
              </section>
              <section
                v-if="story.storytelling[0].screen_4[0]"
                v-editable="story.storytelling[0].screen_4[0]"
                :data-bottom-s="`${story?.bottom_phrases[3]?.text}|${story?.bottom_phrases[3]?.rotated}`"
                class="section section--nm home-4"
              >
                <div class="container grid home-4__wrapper">
                  <TheSquare axis="x" class="home-4__square" />
                  <RichText
                    class="home-4__text"
                    :text="story.storytelling[0].screen_4[0].text"
                  />
                </div>
              </section>
              <section
                v-if="story.dropdown_list[0]"
                v-editable="story.dropdown_list[0]"
                :data-bottom-s="`${story?.bottom_phrases[4]?.text}|${story?.bottom_phrases[4]?.rotated}`"
                class="section section--nm home-5"
              >
                <div class="container grid home-5__wrapper">
                  <TheAccordion
                    class="home-5__accordion"
                    :items="story.dropdown_list[0].dropdown_points"
                  >
                    <p v-if="story?.dropdown_text" class="home-5__rotate-text">
                      {{ story?.dropdown_text }}
                    </p>
                  </TheAccordion>
                </div>
              </section>
              <section
                v-if="story.table_texts[0] || story.table_texts[1]"
                :data-bottom-s="`${story?.bottom_phrases[5]?.text}|${story?.bottom_phrases[5]?.rotated}`"
                class="section section--nm home-6"
              >
                <div class="container grid home-6__wrapper">
                  <div
                    v-if="story.table_texts[0]"
                    v-editable="story.table_texts[0]"
                    class="home-6__text-wrapper"
                  >
                    <RichText
                      v-if="story.table_texts[0]?.title[0]?.text"
                      class="home-6__title"
                      :text="story.table_texts[0]?.title[0]?.text"
                    />
                    <div class="home-6__content">
                      <p class="home-6__desc">
                        {{ story.table_texts[0]?.text }}
                      </p>
                      <NuxtLink
                        :to="story?.table_texts[0]?.link_url?.cached_url"
                        class="home-6__btn-wrapper"
                      >
                        <div class="home-6__btn">
                          {{ story?.table_texts[0]?.link_text_1 }}
                        </div>
                        <small class="home-6__btn-text">{{
                          story?.table_texts[0]?.link_text_2
                        }}</small>
                      </NuxtLink>
                    </div>
                  </div>
                  <div
                    v-if="story.table_texts[1]"
                    v-editable="story.table_texts[1]"
                    class="home-6__text-wrapper"
                  >
                    <RichText
                      v-if="story.table_texts[1]?.title[0]?.text"
                      class="home-6__title"
                      :text="story.table_texts[1]?.title[0]?.text"
                    />
                    <div class="home-6__content">
                      <p class="home-6__desc">
                        {{ story.table_texts[1]?.text }}
                      </p>
                      <NuxtLink
                        :to="story?.table_texts[1]?.link_url?.cached_url"
                        class="home-6__btn-wrapper"
                      >
                        <div class="home-6__btn">
                          {{ story?.table_texts[1]?.link_text_1 }}
                        </div>
                        <small class="home-6__btn-text">{{
                          story?.table_texts[1]?.link_text_2
                        }}</small>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </section>

              <section
                v-if="story.headings[0].text"
                :data-bottom-s="`${story?.bottom_phrases[6]?.text}|${story?.bottom_phrases[6]?.rotated}`"
                class="section section--nm home-7"
              >
                <div class="grid home-7__wrapper">
                  <div class="container home-7__top-block">
                    <RichText
                      v-editable="story.headings[0]"
                      class="home-7__top-title"
                      :text="story.headings[0].text"
                    />
                  </div>
                  <div
                    ref="$scrollEl"
                    class="container home-7__bottom-block"
                    :data-bottom-s="`${story?.bottom_phrases[7]?.text}|${story?.bottom_phrases[7]?.rotated}`"
                  >
                    <RichText
                      v-editable="story.headings[1]"
                      class="home-7__bottom-title"
                      :text="story.headings[1].text"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RoiScroller
      v-if="story.roi_list[0]"
      v-editable="story.roi_list[0]"
      :title="story.roi_list[0].title"
      :description="story.roi_list[0].description"
      :items="story.roi_list[0].points"
      :is-home="true"
    />
    <section
      v-if="projects?.length"
      data-bottom-s="undefined"
      class="section home-8"
    >
      <div class="home-8__wrapper">
        <TheSquare :offset="0.5" class="home-8__square" />
        <div class="container home-8__text">
          <h1 class="home-8__title">CASE STUDIES</h1>
          <p class="home-8__desc">
            {{ story.cases_description }}
          </p>
        </div>
      </div>
      <ul class="container home-8__img-list">
        <li v-for="post in projects" :key="post._uid" class="home-8__img-li">
          <NuxtLink class="home-8__img-link" :to="`/portfolio/${post.slug}/`">
            <TheImage
              v-if="
                post.content?.preview_image?.filename ??
                post.content?.image?.filename
              "
              :src="
                post.content?.preview_image?.filename ??
                post.content?.image?.filename
              "
              alt="Image"
            />
            <div class="home-8__text-wrapper">
              <p class="home-8__name">{{ post.name }}</p>
              <div class="home-8__line-wrapper">
                <span class="home-8__line"></span>
              </div>
              <button class="home-8__link">view case study</button>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>
    <section
      v-if="story.clients_list[0].clients_points.length"
      v-editable="story.clients_list[0]"
      data-bottom-s="undefined"
      class="section home-9"
    >
      <div class="container home-9__wrapper">
        <div class="home-9__title-wrapper">
          <TheSquare class="home-9__square" />
          <h2 class="home-9__title">Some clients We’ve helped</h2>
        </div>
        <div class="home-9__list-wrapper">
          <ul class="home-9__list">
            <li
              v-for="item in story.clients_list[0].clients_points"
              :key="item._uid"
              class="home-9__li"
            >
              <div class="home-9__item-wrapper">
                <h3 class="home-9__item-text">
                  {{ item.title }}
                </h3>
                <div class="home-9__item-img-wrapper">
                  <img
                    class="home-9__item-img"
                    :src="item.image.filename"
                    alt=""
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <TheFooter />
  </main>
</template>
