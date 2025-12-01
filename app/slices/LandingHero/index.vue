<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicRichText, PrismicImage, PrismicLink } from "@prismicio/vue";

defineProps(
  getSliceComponentProps<Content.LandingHeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div>
      <PrismicRichText :field="slice.primary.heroTitle" />
      <PrismicImage :field="slice.primary.heroImage" />
      <PrismicLink :field="slice.primary.heroButtonLink">
        {{ slice.primary.heroButtonText }}
      </PrismicLink>
    </div>

    <div v-if="slice.primary.featureRows">
      <div v-for="(row, index) in slice.primary.featureRows" :key="index">
        <PrismicRichText :field="row.featureRowTitle" />
        <PrismicRichText :field="row.featureRowDescription" />
        <PrismicImage :field="row.featureRowImage" />
      </div>
    </div>

    <div>
      <PrismicRichText :field="slice.primary.contactTitle" />
      <PrismicRichText :field="slice.primary.contactDescription" />
    </div>
  </section>
</template>
