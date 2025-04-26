import type { iStory } from '~/types/story'
import { useGetStory } from './getStory'

export const useAboutStory = async () => {
  const initStory = ref(null)

  const res = await useGetStory('about')
  initStory.value = res.value

  if (import.meta.client) {
    useStoryblokBridge(initStory.value.id, evStory => {
      initStory.value = evStory as unknown as iStory
    })
  }

  const story = computed(() => {
    return initStory.value?.content
  })

  return { story }
}
