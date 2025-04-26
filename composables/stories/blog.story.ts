import type { iStory } from '~/types/story'

import { useGetStories } from './getStories'

type tBlogStories = () => Promise<{
  stories: Ref<iStory[]>
  story: Ref<iStory>
  categories: Ref<iStory[]>
  tags: Ref<iStory[]>
  featuredPost: Ref<iStory>
  listenStory: (arg0: string | string[]) => void
}>

export const useBlogStories: tBlogStories = async () => {
  const stories = useState<iStory[]>('blogStory', () => null)
  const story = useState<iStory>('blogSingleStory', () => null)
  const categories = useState<iStory[]>('blogCategories', () => null)
  const tags = useState<iStory[]>('blogTags', () => null)

  const res = await useGetStories({
    by_slugs: 'squid-blog/*',
    excluding_slugs: 'squid-blog/blog-categories/*,squid-blog/blog-tags/*',
    resolve_relations: 'Article.category',
    sort_by: 'created_at:desc',
  })

  const categoriesData = await useGetStories({
    by_slugs: 'squid-blog/blog-categories/*',
  })

  const tagsData = await useGetStories({
    by_slugs: 'squid-blog/blog-tags/*',
  })

  stories.value = res.value.filter(s => s.name !== 'Index')
  story.value = res.value.find(s => s.name === 'Index')

  categories.value = categoriesData.value
  tags.value = tagsData.value

  const featuredPost = computed(() => {
    const featuredId = story?.value?.content?.Featured_article
    return stories.value.find(story => story.uuid === featuredId)
  })

  if (import.meta.client) {
    useStoryblokBridge(story.value.id, evStory => {
      story.value = evStory as unknown as iStory
    })
  }

  const listenStory = (slug: string) => {
    if (import.meta.client) {
      const currentStory = stories.value.find(story => story.slug === slug)
      useStoryblokBridge(currentStory.id, evStory => {
        stories.value = stories.value.filter(story => story.slug !== slug)
        stories.value = [...stories.value, evStory as unknown as iStory]
      })
    }
  }

  return { stories, story, categories, listenStory, tags, featuredPost }
}
