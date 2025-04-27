<script setup lang="ts">
import { useTransition } from '~/composables/transition'
import { useBlogStories } from '~/composables/stories/blog.story'
import { useBreakLine } from '~/composables/breakLine'

useTransition()
useObserver('.section')

const route = useRoute()

const slug = route.params.slug

const { stories, categories, tags, listenStory } = await useBlogStories()

listenStory(slug)

const posts = computed(() => {
  return stories.value
})

const post = computed(() => {
  return stories.value?.find(story => story.slug === slug)?.content
})

if (!post.value) {
  navigateTo('/squid-blog/')
}

const activeCategory = computed(() => {
  return post?.value?.category?.name
})

const activeTags = computed(() => {
  const activeIds = post?.value?.tags

  return activeIds?.map(id => {
    return tags.value?.find(story => story?.uuid === id)
  })
})

const prevPost = computed(() => {
  const idx = posts.value?.findIndex(post => post.slug === slug)

  return idx <= 0 ? posts.value[posts.value.length - 1] : posts.value[idx - 1]
})

const nextPost = computed(() => {
  const idx = posts.value.findIndex(post => post.slug === slug)

  return idx >= posts.value.length - 1 ? posts.value[0] : posts.value[idx + 1]
})

const lastPosts = computed(() => {
  return [...posts.value].filter(s => s.slug !== slug).slice(0, 3)
})

const formattedDate = computed(() => {
  const date =
    stories.value.find(story => story.slug === slug)?.published_at ??
    stories.value.find(story => story.slug === slug)?.created_at

  if (!date) {
    return ''
  }

  return useFormattedDate(date)
})

const getFormattedDate = (date: string | number) => {
  return useFormattedDate(date)
}

const getCategory = (catId: string) => {
  return categories.value?.find(story => story.uuid === catId)?.name
}

const breakLine = useBreakLine()

const { headerColor } = useMenu()

onMounted(() => {
  headerColor.value = 'dark'
})
</script>

<template>
  <main>
    <PageMeta v-if="post?.meta?.length" :meta="post?.meta[0]" />
    <section class="section section--nm blog-1">
      <div v-if="post?.image?.filename" class="blog-1__img-wrapper" data-a-o>
        <TheImage
          class="blog-1__img"
          :src="post?.image?.filename"
          :alt="post.title"
        />
      </div>
      <TheSocials data-a-o class="bottom-nav-socials" />
    </section>
    <div data-a-o class="container blog-wrapper">
      <article class="article">
        <section class="section section--nm blog-2">
          <div class="blog-2__wrapper">
            <div class="blog-2__main">
              <p class="blog-2__category-name">
                Category: {{ activeCategory || 'None' }}
              </p>
              <p class="blog-2__date">{{ formattedDate }} / Miles Marmo</p>
              <h1 v-if="post?.title" class="blog-2__title">
                {{ post?.title }}
              </h1>
              <div class="blog-2__long-text">
                <p
                  v-if="post?.description"
                  class="blog-2__desc"
                  v-html="breakLine(post.description)"
                />
              </div>
            </div>
            <CaseInfo
              v-if="post?.blog_info && post?.blog_info[0]"
              v-editable="post.blog_info[0]"
              :items="post.blog_info[0].case_info"
              class="blog-2__info"
            />
            <div v-if="post" v-editable="post">
              <Blok
                v-for="(blok, idx) in post.body"
                :key="blok._uid"
                :data-idx="idx + 1"
                :body="blok.body"
              />
            </div>
          </div>
        </section>
      </article>
      <aside class="aside">
        <div class="aside__wrapper">
          <div v-if="categories && categories?.length" class="aside__filter">
            <h2 class="aside__filter-title">CATEGORIES</h2>
            <ul class="aside__filter-list">
              <li
                v-for="category in categories"
                :key="category._uid"
                class="aside__filter-li"
              >
                <NuxtLink
                  :class="[
                    activeCategory?.toLocaleLowerCase() ===
                      category.name?.toLocaleLowerCase() &&
                      'aside__filter-btn--active',
                  ]"
                  :to="`/squid-blog/?filter=${category.name
                    ?.toLocaleLowerCase()
                    .replace(/\s/gm, '_')}`"
                  class="aside__filter-btn"
                >
                  {{ category.name?.toLocaleLowerCase() }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div v-if="lastPosts?.length" class="aside__posts">
            <h2 class="aside__posts-main">LATEST POSTS</h2>
            <ul class="aside__posts-list">
              <li
                v-for="item in lastPosts"
                :key="item._uid"
                class="aside__posts-li"
              >
                <NuxtLink
                  :to="`/squid-blog/${item?.slug}/`"
                  class="aside__link"
                >
                  <img
                    v-if="item?.content?.image?.filename"
                    class="aside__posts-img"
                    :src="item?.content?.image?.filename"
                    alt="Image"
                  />
                  <div class="aside__posts-block">
                    <div class="aside__posts-text">
                      <p class="aside__posts-date">
                        {{
                          getFormattedDate(item.published_at || item.created_at)
                        }}
                      </p>
                      <p class="aside__posts-title">
                        {{ item.content?.title }}
                      </p>
                    </div>
                    <p class="aside__posts-name">
                      {{ getCategory(item.content?.category) }}
                    </p>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div v-if="activeTags?.length" class="aside__tags">
            <h2 class="aside__tags-main">TAGS</h2>
            <p class="aside__tags-text">
              <span
                v-for="(tag, idx) in activeTags"
                :key="tag._uid"
                class="aside__tags-text-wrapper"
              >
                {{ tag.name }}
                <span v-if="idx + 1 < tags.length">/</span>
              </span>
            </p>
          </div>
        </div>
      </aside>
    </div>
    <PostNavigation
      class="section blog__nav"
      :prev-post-link="`/squid-blog/${prevPost?.slug}/`"
      :next-post-link="`/squid-blog/${nextPost?.slug}/`"
      all-posts-link="/squid-blog/"
    />
    <TheFooter />
  </main>
</template>
