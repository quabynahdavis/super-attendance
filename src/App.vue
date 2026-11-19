<script setup lang="ts">
import { Moon, Sun } from "@lucide/vue"
import { computed, onMounted, onUnmounted, ref } from "vue"
import PhoneFrame from "@/components/PhoneFrame.vue"
import { Button } from "@/components/ui/button"
import {
  applyTheme,
  readThemeChoice,
  resolveDark,
  writeThemeChoice,
  type ThemeChoice,
} from "@/composables/theme"

const choice = ref<ThemeChoice>("system")
const dark = ref(false)

function sync() {
  dark.value = resolveDark(choice.value)
  applyTheme(choice.value)
}

function toggleTheme() {
  choice.value = dark.value ? "light" : "dark"
  writeThemeChoice(choice.value)
  dark.value = resolveDark(choice.value)
}

const label = computed(() =>
  dark.value ? "Switch to light theme" : "Switch to dark theme",
)

let media: MediaQueryList | undefined
function onSystemChange() {
  if (choice.value === "system") sync()
}

onMounted(() => {
  choice.value = readThemeChoice()
  sync()
  media = window.matchMedia("(prefers-color-scheme: dark)")
  media.addEventListener("change", onSystemChange)
})

onUnmounted(() => {
  media?.removeEventListener("change", onSystemChange)
})
</script>

<template>
  <PhoneFrame>
    <main class="flex h-full min-h-full flex-col bg-background text-foreground">
      <header class="flex items-center justify-end p-4">
        <Button
          variant="outline"
          size="icon"
          :aria-label="label"
          @click="toggleTheme"
        >
          <Sun v-if="dark" />
          <Moon v-else />
        </Button>
      </header>
      <div class="flex flex-1 items-center justify-center p-6">
        <Button>Click me</Button>
      </div>
    </main>
  </PhoneFrame>
</template>
