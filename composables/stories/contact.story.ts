import { useGetStory } from './getStory'

export const useContactStory = async () => {
  const initStory = ref(null)

  const res = await useGetStory('contact')
  initStory.value = res.value

  if (import.meta.client) {
    useStoryblokBridge(initStory.value.id, evStory => {
      initStory.value = evStory
    })
  }
  const story = computed(() => {
    return initStory.value?.content
  })

  return { story }
}
