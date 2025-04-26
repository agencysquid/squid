<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFonts } from '~/composables/fonts'

const GOOGLE_TM_ID = 'GTM-W9CZGXJ'

useFonts()

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const parallaxInit = async () => {
  const { Parallax } = await import('@emotionagency/parallax')

  window.parallax = new Parallax({ mobile: false })
}

onMounted(async () => {
  const { hello } = await import('~/assets/scripts/utils/hello')
  hello()

  const { winSizes } = await import('~/assets/scripts/utils/winSizes')
  const { resize } = await import('@emotionagency/utils')
  resize.on(winSizes)

  await parallaxInit()
})

onBeforeUnmount(() => {
  window.parallax && window.parallax.destroy()
})

useHead({
  htmlAttrs: {
    lang: 'en-US',
  },
  script: [
    {
      id: 'gtm',
      value: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GOOGLE_TM_ID}');`,
      type: 'text/javascript',
    },
    {
      src: 'https://player.vimeo.com/api/player.js',
    },
  ],
})

onErrorCaptured(error => {
  console.error('Error in app.vue:', error)
  return false
})
</script>

<template>
  <div id="app">
    <Head>
      <Title>Agency Squid</Title>
      <Meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      <Meta name="viewport" content="width=device-width"> </Meta>
      <Meta property="og:locale" content="en_US" />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://agencysquid.com/" />
      <Meta
        property="article:publisher"
        content="https://www.facebook.com/agencysquid/"
      />
      <Meta property="og:image" content="/meta/Squid-Wordmark.png" />
      <Meta property="og:image:width" content="180" />
      <Meta property="og:image:height" content="180" />
      <Meta property="og:image:type" content="image/png" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:image" content="/meta/twitter.png" />
      <Link rel="icon" type="image/x-icon" href="/favicon.ico"> </Link>
      <Link
        rel="sitemap"
        type="application/xml"
        title="Sitemap"
        href="/sitemap.xml"
      ></Link>
    </Head>
    <AppLoader />

    <AppGrid />
    <UiLoader />

    <SmoothScroll>
      <TheHeader />
      <slot />
    </SmoothScroll>
  </div>
</template>
