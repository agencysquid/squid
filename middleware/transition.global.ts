import { pageTransition } from '~/assets/scripts/transition'

export default defineNuxtRouteMiddleware((to, from) => {
  to.meta.pageTransition = pageTransition
  from.meta.pageTransition = pageTransition
})
