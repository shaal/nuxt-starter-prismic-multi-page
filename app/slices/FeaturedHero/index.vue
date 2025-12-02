<script setup lang="ts">
import { PrismicRichText, PrismicImage, PrismicLink } from "@prismicio/vue";
import type { Content } from "@prismicio/client";
import { defineComponent, h } from "vue";

defineProps(
  getSliceComponentProps<Content.FeaturedHeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

// Custom rich text components for white text on dark background
// Using inline styles because scoped CSS doesn't apply to dynamically rendered components
const HeroHeading = defineComponent({
  name: "HeroHeading",
  setup(_, { slots }) {
    return () =>
      h(
        "h1",
        {
          style: {
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: "72px",
            fontWeight: "700",
            lineHeight: "1.1",
            color: "#ffffff",
            margin: "0",
            textTransform: "uppercase",
          },
        },
        slots.default?.()
      );
  },
});

const HeroParagraph = defineComponent({
  name: "HeroParagraph",
  setup(_, { slots }) {
    return () =>
      h(
        "p",
        {
          style: {
            fontFamily: '"Barlow", sans-serif',
            fontSize: "24px",
            fontWeight: "400",
            lineHeight: "1.4",
            color: "#ffffff",
            margin: "0",
          },
        },
        slots.default?.()
      );
  },
});

const headingComponents = {
  heading1: HeroHeading,
};

const descriptionComponents = {
  paragraph: HeroParagraph,
};
</script>

<template>
  <section
    class="featured-hero"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <!-- Background image -->
    <PrismicImage
      class="featured-hero__background"
      :field="slice.primary.background_image"
    />

    <!-- Gradient overlays -->
    <div class="featured-hero__gradient" aria-hidden="true" />

    <div class="featured-hero__container">
      <div class="featured-hero__content">
        <!-- Eyebrow/Overline -->
        <p v-if="slice.primary.overline" class="featured-hero__eyebrow">
          {{ slice.primary.overline }}
        </p>

        <!-- Heading -->
        <div class="featured-hero__heading">
          <PrismicRichText
            :field="slice.primary.heading"
            :components="headingComponents"
          />
        </div>

        <!-- Description -->
        <div class="featured-hero__description">
          <PrismicRichText
            :field="slice.primary.description"
            :components="descriptionComponents"
          />
        </div>

        <!-- CTA Button -->
        <div class="featured-hero__actions">
          <PrismicLink
            v-if="slice.primary.button_link"
            :field="slice.primary.button_link"
            class="featured-hero__button"
          >
            {{ slice.primary.button_link.text || "PRIMARY ACTION" }}
          </PrismicLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 64px;
  overflow: hidden;
}

/* Background image */
.featured-hero__background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  z-index: 0;
}

/* Gradient overlays for readability - matches Figma exactly */
.featured-hero__gradient {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    /* Top gradient - dark green fading down */
    linear-gradient(
      180deg,
      rgba(24, 57, 43, 1) 0%,
      rgba(13, 77, 15, 0) 35%
    ),
    /* Diagonal gradient from bottom-left */
    linear-gradient(
      227deg,
      rgba(13, 77, 15, 0) 54%,
      rgba(24, 57, 43, 0.8) 83%
    );
}

/* Container */
.featured-hero__container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1312px;
  padding-top: 320px;
  padding-bottom: 80px;
}

/* Content area with shadow from Figma */
.featured-hero__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 650px;
  box-shadow:
    0px 20px 24px -4px rgba(16, 24, 40, 0.08),
    0px 8px 8px -4px rgba(16, 24, 40, 0.03);
}

/* Eyebrow text */
.featured-hero__eyebrow {
  font-family: "Glegoo", serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #e5ccad;
  margin: 0;
}

/* Heading and description wrappers */
.featured-hero__heading,
.featured-hero__description {
  margin: 0;
}

/* Actions/Button container */
.featured-hero__actions {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

/* Primary CTA Button */
.featured-hero__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 16px 20px;
  background-color: #e5ccad;
  border: 1px solid #e5ccad;
  color: #14452f;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.featured-hero__button:hover {
  background-color: #d4b894;
  border-color: #d4b894;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .featured-hero {
    padding: 0 40px;
  }

  .featured-hero__container {
    padding-top: 200px;
    padding-bottom: 60px;
  }
}

@media (max-width: 768px) {
  .featured-hero {
    padding: 0 24px;
  }

  .featured-hero__container {
    padding-top: 100px;
    padding-bottom: 48px;
  }

  .featured-hero__content {
    max-width: 100%;
    gap: 20px;
  }

  .featured-hero__eyebrow {
    font-size: 16px;
  }

  .featured-hero__button {
    font-size: 20px;
    padding: 14px 18px;
  }
}

@media (max-width: 480px) {
  .featured-hero {
    padding: 0 16px;
  }
}
</style>
