import type { iStory } from '~/types/story'

type tResStory = {
  data: {
    story: iStory
  }
}

export const useGetStory = async (route: string) => {
  const response = ref<iStory>(null)

  const config = useRuntimeConfig()
  const storyapi = useStoryblokApi()

  const { isInEditor } = useLoadState()

  const maxRetries = 3

  const getStory = async (attempt = 0) => {
    if (!response.value) {
      try {
        const { data }: tResStory = await storyapi.get(`cdn/stories/${route}`, {
          version:
            config.public.ENVIROMENT === 'development' || isInEditor.value
              ? 'draft'
              : 'published',
          cv: Date.now(),

          resolve_relations: 'roi_points.case_study',
        })

        response.value = data.story
      } catch (e) {
        console.error(`Story fetch failed (attempt ${attempt + 1}):`, e.message)

        if (attempt + 1 >= maxRetries) {
          alert(
            'An error with our server occurred. Please try reloading the page.'
          )
          return
        }

        await getStory(attempt + 1)
      }
    }
  }
  await getStory()

  return response
}
