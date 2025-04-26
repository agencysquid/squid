<script setup lang="ts">
import gsap from 'gsap'

import { useTransition } from '~/composables/transition'
import { usePosts } from '~/composables/posts'
import { useProjectsStories } from '~/composables/stories/projects.story'

useTransition()
useObserver('.section')

const $posts = ref(null)

const { story, stories, categories } = await useProjectsStories()

const { filteredPosts, selectCategory, activeCategory } = usePosts(
  stories,
  'portfolio'
)

watch(filteredPosts, () => {
  if (import.meta.client) {
    const tl = gsap.timeline()
    tl.to($posts.value, { duration: 0, opacity: 0 })
    tl.to($posts.value, { duration: 0.5, opacity: 1 }, 0.5)
  }
})

const { headerColor } = useMenu()

onMounted(() => {
  headerColor.value = 'dark'
})
</script>

<template>
  <main>
    <PageMeta v-if="story.content.meta.length" :meta="story.content.meta[0]" />

    <TheSocials data-a-o class="bottom-nav-socials" />

    <section data-a-t class="section thoughts-2">
      <div class="container thoughts-2__wrapper">
        <p class="thoughts-2__title">CATEGORIES</p>
        <div class="thoughts-2__filter">
          <div
            v-for="category in categories"
            :key="category._uid"
            class="thoughts-2__btn-wrapper"
          >
            <button
              class="thoughts-2__btn"
              :class="[
                activeCategory === category.name?.toLocaleLowerCase() &&
                  'thoughts-2__btn--active',
              ]"
              @click="selectCategory(category.name)"
            >
              {{ category.name }}
            </button>
            <div class="thoughts-2__line">/</div>
          </div>
          <div class="thoughts-2__btn-wrapper">
            <button
              class="thoughts-2__btn"
              :class="[activeCategory === 'all' && 'thoughts-2__btn--active']"
              @click="selectCategory('all')"
            >
              All
            </button>
          </div>
        </div>
        <div ref="$posts" class="thoughts-2__img-list-wrapper">
          <ul v-if="filteredPosts.length" class="thoughts-2__img-list">
            <Post
              v-for="item in filteredPosts"
              :id="item.content._uid"
              :key="item.content._uid"
              :title="item.name"
              :category="item.content?.category?.name"
              :description="
                item.content?.scope && item.content.scope[0]?.main_text
              "
              :image="item.content?.preview_image ?? item.content?.image"
              :video="item.content?.vimeo_video_id"
              :link="`/portfolio/${item.slug}/`"
            />
          </ul>

          <div v-else class="no-posts">no posts yet</div>
        </div>
        <!-- <button
          v-if="filteredPosts.length"
          class="thoughts-2__posts-btn"
        >
          VIEW OLDER POSTS
        </button> -->
      </div>
    </section>
    <TheFooter />
  </main>
</template>
