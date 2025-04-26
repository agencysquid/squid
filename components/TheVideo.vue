<script setup lang="ts">
interface iProps {
  videoId: string
  responsive?: boolean
}

const props = withDefaults(defineProps<iProps>(), {
  responsive: true,
})

const $el = ref(null)

onMounted(() => {
  const containerHeight = window.innerHeight

  // @ts-ignore
  new window.Vimeo.Player($el.value, {
    id: props.videoId,
    loop: true,
    autoplay: true,
    background: true,
    playsinline: true,
    responsive: props.responsive || window.innerWidth > window.innerHeight,
    // width: window.innerWidth,
    height: containerHeight,
  })
})
</script>

<template>
  <div ref="$el" class="s-video">
    <slot />
  </div>
</template>
