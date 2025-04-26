<script setup lang="ts">
import { useTransition } from '~/composables/transition'
import { useExpertiseStory } from '~/composables/stories/expertise.story'

useTransition()
useObserver('.section')

const { story } = await useExpertiseStory()

const $rotatingEl = ref(null)
let ros

const { headerColor } = useMenu()

onMounted(async () => {
  const { RotateOnScroll } = await import('~/assets/scripts/RotateOnScroll')

  ros = new RotateOnScroll($rotatingEl.value.$el)

  ros.animate()

  headerColor.value = 'white'
})

onBeforeUnmount(() => {
  ros && ros.destroy()
})

const screen4Dropdown = computed(() => {
  return story.value?.screen_4?.find(item => item.component === 'dropdown_list')
})

const screen4Badge = computed(() => {
  return story.value?.screen_4?.find(item => item.component === 'badge')
})
</script>

<template>
  <main>
    <PageMeta v-if="story.meta.length" :meta="story.meta[0]" />
    <section class="section section--nm expertise-1">
      <div class="container expertise-1__wrapper">
        <div
          v-if="story.screen_1[0].title_1[0].text"
          v-editable="story.screen_1[0]"
          class="grid expertise-1__text-wrapper"
        >
          <RichText
            data-a-h
            :text="story.screen_1[0].title_1[0].text"
            class="expertise-1__text"
          />
          <RichText
            data-a-t
            :text="story.screen_1[0].title_2[0].text"
            class="expertise-1__title"
          />
        </div>
      </div>
      <TheSocials data-a-o class="bottom-nav-socials" />
      <NextBlockButton data-a-o>Scroll</NextBlockButton>
    </section>
    <section v-editable="story" class="section expertise-2">
      <div class="container expertise-2__wrapper">
        <div class="grid expertise-2__text-wrapper">
          <p class="expertise-2__text">
            {{ story.screen_2 }}
          </p>
        </div>
      </div>
    </section>
    <section class="section expertise-3">
      <div class="container expertise-3__wrapper">
        <IconsCircle ref="$rotatingEl" class="expertise-3__img" />
      </div>
    </section>
    <section
      v-if="story.screen_3[0]"
      v-editable="story.screen_3[0]"
      class="section expertise-4"
    >
      <div class="container expertise-4__wrapper">
        <BlokTableText2
          class="expertise-4__table-text"
          :blok="{
            title: story.screen_3[0].title,
            content: story.screen_3[0].content,
          }"
        />
      </div>
    </section>
    <section
      v-if="screen4Dropdown"
      v-editable="screen4Dropdown"
      class="section expertise-5"
    >
      <div class="container grid expertise-5__wrapper">
        <TheAccordion
          class="expertise-5__accordion"
          :items="screen4Dropdown.dropdown_points"
        >
          <p v-if="screen4Badge" class="expertise-5__rotate-text">
            {{ screen4Badge.text }}
          </p>
        </TheAccordion>
      </div>
    </section>
    <RoiScroller
      v-if="story.screen_5[0]"
      v-editable="story.screen_5[0]"
      :title="story.screen_5[0].title"
      :description="story.screen_5[0].description"
      :items="story.screen_5[0].points"
    />
    <section
      v-if="story.screen_6[0]"
      v-editable="story.screen_6[0]"
      class="section expertise-7"
    >
      <BlokTextBlock1
        class="expertise-7__text-blok"
        :blok="{
          title: story.screen_6[0].title,
          main_text: story.screen_6[0].main_text,
          aligned: story.screen_6[0].aligned,
        }"
      />
    </section>
    <ExpertiseScrollBottom />
    <TheFooter />
  </main>
</template>
