<script setup lang="ts">
import { PrismicRichText, PrismicImage, PrismicLink } from "@prismicio/vue";
import type { Content } from "@prismicio/client";
import { defineComponent, h } from "vue";

defineProps(
  getSliceComponentProps<Content.ProductCardsGridSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

// Custom rich text components for jumbo card
const JumboHeading = defineComponent({
  name: "JumboHeading",
  setup(_, { slots }) {
    return () =>
      h(
        "h2",
        {
          style: {
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: "64px",
            fontWeight: "700",
            lineHeight: "1.1",
            color: "#ffffff",
            margin: "0",
            textTransform: "uppercase",
            textAlign: "center",
          },
        },
        slots.default?.()
      );
  },
});

const JumboDescription = defineComponent({
  name: "JumboDescription",
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
            textAlign: "center",
          },
        },
        slots.default?.()
      );
  },
});

const headingComponents = {
  heading2: JumboHeading,
};

const descriptionComponents = {
  paragraph: JumboDescription,
};
</script>

<template>
  <section
    class="product-cards-grid"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div class="product-cards-grid__container">
      <!-- Product Cards -->
      <PrismicLink
        v-for="(card, index) in slice.primary.product_cards"
        :key="index"
        :field="card.product_link"
        class="product-card"
      >
        <!-- Product Frame with layered images -->
        <div class="product-card__frame">
          <!-- Background texture -->
          <div class="product-card__background">
            <PrismicImage
              v-if="card.background_image?.url"
              :field="card.background_image"
              class="product-card__background-image"
            />
          </div>

          <!-- Product image -->
          <PrismicImage
            v-if="card.product_image?.url"
            :field="card.product_image"
            class="product-card__product-image"
          />

          <!-- Badge/Tag -->
          <PrismicImage
            v-if="card.badge_image?.url"
            :field="card.badge_image"
            class="product-card__badge"
          />
        </div>

        <!-- Card bottom row with product info -->
        <div class="product-card__info">
          <div class="product-card__volume">
            <span>{{ card.volume }}</span>
          </div>
          <div class="product-card__details">
            <span class="product-card__name">{{ card.product_name }}</span>
            <span class="product-card__description">{{ card.product_description }}</span>
          </div>
        </div>
      </PrismicLink>

      <!-- Jumbo Promotional Card -->
      <div class="jumbo-card">
        <!-- Background image -->
        <PrismicImage
          v-if="slice.primary.jumbo_background_image?.url"
          :field="slice.primary.jumbo_background_image"
          class="jumbo-card__background"
        />
        <div class="jumbo-card__overlay" aria-hidden="true" />

        <div class="jumbo-card__content">
          <!-- Heading -->
          <div class="jumbo-card__heading">
            <PrismicRichText
              :field="slice.primary.jumbo_heading"
              :components="headingComponents"
            />
          </div>

          <!-- Description -->
          <div class="jumbo-card__description">
            <PrismicRichText
              :field="slice.primary.jumbo_description"
              :components="descriptionComponents"
            />
          </div>

          <!-- CTA Button -->
          <PrismicLink
            v-if="slice.primary.jumbo_button"
            :field="slice.primary.jumbo_button"
            class="jumbo-card__button"
          >
            {{ slice.primary.jumbo_button.text || "Join The List" }}
          </PrismicLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-cards-grid {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  width: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(15, 81, 50, 1) 0%,
    rgba(24, 57, 43, 1) 100%
  );
}

.product-cards-grid__container {
  display: flex;
  gap: 32px;
  align-items: stretch;
  width: 100%;
  max-width: 1312px;
  padding: 0 24px;
}

/* Product Card Styles */
.product-card {
  display: flex;
  flex-direction: column;
  width: 416px;
  flex-shrink: 0;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.product-card__frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
}

.product-card__background {
  position: absolute;
  inset: 0;
  background-color: #0a0a0a;
}

.product-card__background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.6;
}

.product-card__product-image {
  position: absolute;
  top: 22px;
  left: 19px;
  width: calc(100% - 38px);
  height: calc(100% - 44px);
  object-fit: contain;
  object-position: center;
  z-index: 1;
  filter: drop-shadow(0px 20px 24px rgba(16, 24, 40, 0.08))
    drop-shadow(0px 8px 8px rgba(16, 24, 40, 0.03));
}

.product-card__badge {
  position: absolute;
  top: 0;
  left: 24px;
  width: 100px;
  height: 168px;
  z-index: 2;
  object-fit: contain;
}

.product-card__info {
  display: flex;
  align-items: center;
  height: 70px;
  border-top: 1px solid #ffffff;
}

.product-card__volume {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 100%;
  padding: 8px;
  border-right: 1px dashed #ffffff;
  box-sizing: border-box;
}

.product-card__volume span {
  font-family: "Barlow Condensed", sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
}

.product-card__details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 0 16px;
  border-left: 1px dashed #ffffff;
}

.product-card__name,
.product-card__description {
  font-family: "Barlow Condensed", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  text-transform: uppercase;
}

/* Jumbo Card Styles */
.jumbo-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
  padding: 64px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  overflow: hidden;
}

.jumbo-card__background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

.jumbo-card__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(24, 57, 43, 0.5);
  z-index: 1;
}

.jumbo-card__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
}

.jumbo-card__heading,
.jumbo-card__description {
  width: 100%;
}

.jumbo-card__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 24px;
  border: 1px solid #ffffff;
  background: transparent;
  color: #ffffff;
  font-family: "DIN Condensed", "Barlow Condensed", sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.jumbo-card__button:hover {
  background-color: #ffffff;
  color: #18392b;
}

/* Responsive styles */
@media (max-width: 1400px) {
  .product-cards-grid__container {
    flex-wrap: wrap;
    justify-content: center;
  }

  .product-card {
    width: calc(50% - 16px);
    max-width: 416px;
  }

  .jumbo-card {
    width: 100%;
    min-height: 400px;
  }
}

@media (max-width: 900px) {
  .product-cards-grid {
    padding: 48px 0;
  }

  .product-cards-grid__container {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .product-card {
    width: 100%;
    max-width: 416px;
  }

  .jumbo-card {
    width: 100%;
    max-width: 416px;
    padding: 48px 32px;
  }
}

@media (max-width: 480px) {
  .product-cards-grid {
    padding: 32px 0;
  }

  .product-cards-grid__container {
    padding: 0 16px;
  }

  .product-card__volume span {
    font-size: 24px;
  }

  .product-card__name,
  .product-card__description {
    font-size: 16px;
  }

  .jumbo-card {
    padding: 32px 24px;
  }
}
</style>
