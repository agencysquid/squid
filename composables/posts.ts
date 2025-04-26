import type { iStory } from '~/types/story'

export const usePosts = (posts: Ref<iStory[]>, routePath: string) => {
  const filteredPosts = ref<iStory[]>(posts.value)

  const router = useRouter()
  const route = useRoute()

  const selectCategory = (category: string) => {
    try {
      if (import.meta.client) {
        setTimeout(() => {
          window?.parallax && window?.parallax?.update()
        }, 500)
      }
    } catch (error) {
      console.log(error)
    }

    if (category === 'all') {
      filteredPosts.value = posts.value
      router.push({ query: null })
      return
    }

    filteredPosts.value = [...posts.value].filter(
      post =>
        post?.content?.category?.name?.toLocaleLowerCase() ===
        category.toLocaleLowerCase()
    )

    router.push(
      `/${routePath}/?filter=${category.toLocaleLowerCase().replace(' ', '_')}`
    )
  }

  const activeCategory = computed(() => {
    return String(route?.query?.filter || 'all')
      ?.toLocaleLowerCase()
      ?.replace('_', ' ')
  })

  selectCategory(activeCategory.value)

  return { filteredPosts, selectCategory, activeCategory }
}
