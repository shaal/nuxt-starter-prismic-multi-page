<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const { data: page } = await useAsyncData('landing', () =>
  prismic.client.getSingle('landing')
)
const settings = useSettings()

useHead({
  title: computed(() => `${page.value?.data.meta_title || 'Landing'} | ${prismic.asText(settings.value?.data.siteTitle)}`)
})
</script>


<template>
  <SliceZone
    wrapper="main"
    :slices="page?.data.slices ?? []"
    :components="components"
  />
</template>
