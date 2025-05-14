import type { ISbStoriesParams } from '@storyblok/js'
import type { iStory } from '~/types/story'

type tResStory = {
  data: {
    stories: iStory[]
  }
}

export const useGetStories = async (opts: ISbStoriesParams) => {
  const response = ref<iStory[]>(null)

  const config = useRuntimeConfig()

  const storyapi = useStoryblokApi()
  const { isInEditor } = useLoadState()

  const maxRetries = 3

  const getStories = async (attempt?: number) => {
    if (!response.value) {
      try {
        const { data }: tResStory = await storyapi.get('cdn/stories/', {
          sort_by: 'name:asc',
          version:
            config.public.ENVIROMENT === 'development' || isInEditor.value
              ? 'draft'
              : 'published',
          per_page: 100,
          cv: Date.now(),
          resolve_relations: 'roi_points.case_study',
          ...opts,
        })

        response.value = data.stories
      } catch (e) {
        console.error(`Story fetch failed (attempt ${attempt + 1}):`, e.message)

        if (attempt + 1 >= maxRetries) {
          alert(
            'An error with our server occurred. Please try reloading the page.'
          )

          return
        }

        await getStories(attempt + 1)
      }
    }
  }
  await getStories()

  return response
}
