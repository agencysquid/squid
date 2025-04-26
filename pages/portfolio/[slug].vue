<script setup lang="ts">
import { useProjectsStories } from '~/composables/stories/projects.story'
import { useTransition } from '~/composables/transition'

useTransition()
useObserver('.section')

const route = useRoute()

const slug = route.params.slug

const { stories, listenStory } = await useProjectsStories()

listenStory(slug)

const posts = computed(() => {
  return stories.value
})

const post = computed(() => {
  return stories.value.find(story => story.slug === slug).content
})

const prevPost = computed(() => {
  const idx = posts.value.findIndex(post => post.slug === slug)

  return idx <= 0 ? posts.value[posts.value.length - 1] : posts.value[idx - 1]
})

const nextPost = computed(() => {
  const idx = posts.value.findIndex(post => post.slug === slug)

  return idx >= posts.value.length - 1 ? posts.value[0] : posts.value[idx + 1]
})

const { headerColor } = useMenu()

onMounted(() => {
  headerColor.value = 'dark'
})
</script>

<template>
  <main>
    <PageMeta v-if="post?.meta?.length" :meta="post.meta[0]" />
    <section
      v-if="post.title && post.title[0]"
      v-editable="post.title[0]"
      class="section section--nm post-1"
    >
      <div class="container post-1__wrapper">
        <div class="post-1__title">
          <RichText data-a-h :text="post?.title && post?.title[0].text" />
        </div>
        <div v-if="posts?.length > 1" data-a-o class="post-1__btns-wrapper">
          <NuxtLink
            :to="`/portfolio/${prevPost.slug}`"
            class="post-1__btn post-1__btn--prev"
            >PREVIOUS</NuxtLink
          >
          <NuxtLink
            :to="`/portfolio/${nextPost.slug}`"
            class="post-1__btn post-1__btn--next"
            >NEXT</NuxtLink
          >
        </div>
      </div>
      <TheSocials data-a-o class="bottom-nav-socials" />
      <NextBlockButton data-a-o>Scroll</NextBlockButton>
    </section>
    <section
      v-if="post?.image?.filename"
      v-editable="post"
      data-a-o
      class="section section--nm post-2"
    >
      <div class="post-2__wrapper">
        <TheImage
          :transform="true"
          class="post-2__img"
          :src="post?.image?.filename"
          alt="Image"
        />
      </div>
    </section>
    <section class="section post-3">
      <BlokTextBlock1
        v-if="post.scope && post.scope[0]"
        v-editable="post.scope[0]"
        class="post-3__wrapper"
        :blok="{
          aligned: post.scope[0]?.aligned,
          main_text: post.scope[0]?.main_text,
          title: post.scope[0]?.title,
        }"
      />
    </section>
    <CaseInfo
      v-if="post.case_info && post.case_info[0]"
      v-editable="post.case_info[0]"
      :items="post.case_info[0].case_info"
    />

    <div v-if="post" v-editable="post">
      <Blok v-for="blok in post.body" :key="blok._uid" :body="blok.body" />
    </div>

    <CaseInfo
      v-if="post.case_credits && post.case_credits[0]"
      v-editable="post.case_credits[0]"
      class="post-20"
      :items="post.case_credits[0].case_credit"
    />

    <div class="container">
      <h3 class="post-20__link-title">Other Case Studies</h3>
      <PostNavigation
        class="post-20__nav"
        :prev-post-link="`/portfolio/${prevPost.slug}/`"
        :next-post-link="`/portfolio/${nextPost.slug}/`"
        all-posts-link="/portfolio/"
      />
    </div>
    <TheFooter />
  </main>
</template>
