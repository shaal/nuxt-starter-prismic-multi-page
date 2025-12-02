<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="$props.class">
    <img
      src="/images/summit-logo.svg"
      alt="Summit & Co."
      class="w-full h-full object-contain"
    >
  </div>
</template>
