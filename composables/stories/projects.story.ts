import type { iStory } from '~/types/story'
import { useGetStories } from './getStories'

type tProjectStories = () => Promise<{
  stories: Ref<iStory[]>
  story: Ref<iStory>
  categories: Ref<iStory[]>
  featuredPost: Ref<iStory>
  listenStory: (arg0: string | string[]) => void
}>

export const useProjectsStories: tProjectStories = async () => {
  const stories = useState<iStory[]>('projectsStory', () => null)
  const story = useState<iStory>('projectStory', () => null)
  const categories = useState<iStory[]>('projectCategories', () => null)

  const res = await useGetStories({
    by_slugs: 'portfolio/*',
    excluding_slugs: 'portfolio/case-categories/*',
    resolve_relations: 'case.category',
  })

  const categoriesData = await useGetStories({
    by_slugs: 'portfolio/case-categories/*',
  })

  stories.value = res.value.filter(s => s.name !== 'Index')
  story.value = res.value.find(s => s.name === 'Index')

  categories.value = categoriesData.value

  const featuredPost = computed(() => {
    const featuredId = story?.value?.content?.Featured_case
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

  return { stories, story, categories, listenStory, featuredPost }
}
