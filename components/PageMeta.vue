<script lang="ts" setup>
import type { iMeta } from '~/types/story'

interface iProps {
  meta: iMeta
}

defineProps<iProps>()
</script>

<template>
  <Head>
    <Title>{{ meta?.title }}</Title>
    <Meta name="description" :content="meta?.description.trim()" />

    <Meta name="og:title" :content="meta?.title.trim()" />
    <Meta name="title" property="og:title" :content="meta?.title.trim()" />
    <Meta name="og:description" :content="meta?.description.trim()" />

    <Meta name="twitter:title" :content="meta?.title.trim()" />
    <Meta name="twitter:description" :content="meta?.description.trim()" />

    <Meta
      v-if="meta?.image?.filename"
      name="twitter:image"
      :content="meta?.image.filename"
    >
    </Meta>
    <Meta
      v-if="meta?.image?.filename"
      property="og:image"
      :content="meta?.image.filename"
    >
    </Meta>
  </Head>
</template>
