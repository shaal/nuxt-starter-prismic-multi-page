<script setup lang="ts">
const navigation = useNavigation()

// Mobile menu state
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Split navigation links into left and right groups (for desktop)
const leftLinks = computed(() => {
  const links = navigation.value?.data.links || []
  return links.slice(0, Math.ceil(links.length / 2))
})

const rightLinks = computed(() => {
  const links = navigation.value?.data.links || []
  return links.slice(Math.ceil(links.length / 2))
})

// All links for mobile menu
const allLinks = computed(() => navigation.value?.data.links || [])

// Prevent body scroll when mobile menu is open
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="bg-summit-green">
    <!-- Desktop Header -->
    <div class="hidden lg:block py-8">
      <div class="mx-auto w-full max-w-[1600px] px-6">
        <div class="flex items-center justify-center gap-8">
          <!-- Left Navigation -->
          <nav class="flex flex-1 items-center">
            <ul class="flex items-center gap-2 justify-between w-full max-w-[1200px] mx-auto">
              <li
                v-for="item in leftLinks"
                :key="$prismic.asText(item.label) || ''"
              >
                <PrismicLink
                  :field="item.link"
                  class="group px-4 py-2 block"
                >
                  <span
                    class="font-barlow-condensed text-2xl font-bold uppercase tracking-wide text-white/90 group-hover:text-summit-cream transition-colors border-b border-transparent group-hover:border-summit-gold pb-1"
                  >
                    {{ $prismic.asText(item.label) }}
                  </span>
                </PrismicLink>
              </li>
              <li>
                <!-- Center Logo -->
                <NuxtLink
                  to="/"
                  class="shrink-0"
                >
                  <SummitLogo class="h-[124px] w-[225px]" />
                </NuxtLink>
              </li>
              <!-- Right Navigation -->
              <li
                v-for="item in rightLinks"
                :key="$prismic.asText(item.label) || ''"
              >
                <PrismicLink
                  :field="item.link"
                  class="group px-4 py-2 flex items-center gap-2"
                >
                  <span
                    class="font-barlow-condensed text-2xl font-bold uppercase tracking-wide text-white group-hover:text-summit-cream transition-colors"
                  >
                    {{ $prismic.asText(item.label) }}
                  </span>
                </PrismicLink>
              </li>
              <li>
                <NuxtLink
                  to="/contact"
                  class="border border-white px-6 py-4 font-barlow-condensed text-2xl font-bold uppercase text-white hover:bg-white hover:text-summit-green transition-colors"
                >
                  Where to buy
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Mobile Header -->
    <div class="lg:hidden">
      <div class="flex items-center justify-between p-3">
        <!-- Hamburger Menu Button -->
        <button
          type="button"
          class="flex items-center justify-center w-11 h-11 bg-summit-gold text-summit-green"
          aria-label="Open menu"
          @click="toggleMobileMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <!-- Center Logo -->
        <NuxtLink
          to="/"
          class="shrink-0"
        >
          <SummitLogo class="h-[63px] w-[115px]" />
        </NuxtLink>

        <!-- Placeholder for right side (keeps logo centered) -->
        <div class="w-11 h-11" />
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <Transition name="mobile-menu">
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 z-50 bg-summit-green flex flex-col lg:hidden"
        >
          <!-- Mobile Menu Header -->
          <div class="flex items-center justify-between p-3">
            <!-- Close Button -->
            <button
              type="button"
              class="flex items-center justify-center w-11 h-11 bg-summit-gold text-summit-green"
              aria-label="Close menu"
              @click="closeMobileMenu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <!-- Center Logo -->
            <NuxtLink
              to="/"
              class="shrink-0"
              @click="closeMobileMenu"
            >
              <SummitLogo class="h-[63px] w-[115px]" />
            </NuxtLink>

            <!-- Placeholder for right side -->
            <div class="w-11 h-11" />
          </div>

          <!-- Mobile Navigation Links -->
          <nav class="flex-1 overflow-y-auto">
            <ul>
              <li
                v-for="item in allLinks"
                :key="$prismic.asText(item.label) || ''"
                class="border-b border-[#0a5c36]"
              >
                <PrismicLink
                  :field="item.link"
                  class="block px-4 py-3"
                  @click="closeMobileMenu"
                >
                  <span class="font-barlow-condensed text-2xl font-bold uppercase text-white">
                    {{ $prismic.asText(item.label) }}
                  </span>
                </PrismicLink>
              </li>
            </ul>

            <!-- Mobile CTA Button -->
            <div class="px-4 py-6">
              <NuxtLink
                to="/contact"
                class="block w-full border border-white px-4 py-4 font-barlow-condensed text-lg font-bold uppercase text-white text-center hover:bg-white hover:text-summit-green transition-colors"
                @click="closeMobileMenu"
              >
                Where to buy
              </NuxtLink>
            </div>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
