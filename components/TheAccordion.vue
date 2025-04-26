<script lang="ts" setup>
import type { iAccordionItem } from '~/types/accordion'
import { keysGenerator } from '@emotionagency/utils'
import type { AccordionItem } from '#build/components'

interface iProps {
  items: iAccordionItem[]
}

const props = defineProps<iProps>()

const updatedItems = ref(
  { ...props }.items.map(item => ({
    ...item,
    isOpen: false,
    id: keysGenerator(8),
  }))
)

const onClick = (id: string) => {
  updatedItems.value = updatedItems.value.map(el => {
    if (id === el.id) {
      return {
        ...el,
        isOpen: !el.isOpen,
      }
    }

    return {
      ...el,
      isOpen: false,
    }
  })
}

const $accordionItems = ref<(typeof AccordionItem)[]>([])

onMounted(() => {
  setTimeout(() => {
    $accordionItems.value[0].onClick()
  }, 1000)
})
</script>

<template>
  <div class="accordion">
    <slot></slot>
    <AccordionItem
      v-for="(item, idx) in updatedItems"
      ref="$accordionItems"
      :id="item.id"
      :key="item.title"
      :title="item.title"
      :text="item.text"
      :is-open="item.isOpen"
      :last-item="idx === updatedItems.length - 1"
      :number-item="idx + 1"
      @clicked="onClick"
    />
  </div>
</template>
