<script setup lang="ts">
import { GraduationCap, Moon, Presentation, Sun } from "@lucide/vue"
import { computed, onMounted, onUnmounted, ref } from "vue"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  applyTheme,
  readThemeChoice,
  resolveDark,
  writeThemeChoice,
  type ThemeChoice,
} from "@/composables/theme"

const role = ref<"student" | "lecturer" | null>(null)
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

const themeLabel = computed(() =>
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
  <main class="flex h-full min-h-full flex-col bg-background text-foreground">
    <header class="flex items-start justify-between gap-4 px-5 pt-8">
      <div class="flex flex-col gap-1">
        <p class="text-sm text-muted-foreground">Lecture attendance</p>
        <h1 class="text-2xl font-semibold tracking-tight">How are you joining?</h1>
      </div>
      <Button
        variant="outline"
        size="icon"
        :aria-label="themeLabel"
        @click="toggleTheme"
      >
        <Sun v-if="dark" />
        <Moon v-else />
      </Button>
    </header>

    <div class="flex flex-1 flex-col justify-end gap-4 px-5 pt-8 pb-8">
      <Card>
        <CardHeader>
          <GraduationCap class="text-muted-foreground" />
          <CardTitle>I am a student</CardTitle>
          <CardDescription>
            Walk into the lecture and record your attendance.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            class="w-full"
            :variant="role === 'student' ? 'default' : 'outline'"
            @click="role = 'student'"
          >
            {{ role === "student" ? "Selected" : "Continue as student" }}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <Presentation class="text-muted-foreground" />
          <CardTitle>I am a lecturer</CardTitle>
          <CardDescription>
            Start the session and watch attendance come in.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            class="w-full"
            :variant="role === 'lecturer' ? 'default' : 'outline'"
            @click="role = 'lecturer'"
          >
            {{ role === "lecturer" ? "Selected" : "Continue as lecturer" }}
          </Button>
        </CardFooter>
      </Card>
    </div>
  </main>
</template>
