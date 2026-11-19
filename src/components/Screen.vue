<script setup lang="ts">
import { ArrowLeft } from "@lucide/vue"
import { RouterLink } from "vue-router"
import ThemeToggle from "@/components/ThemeToggle.vue"
import { Button } from "@/components/ui/button"

defineProps<{
  title: string
  eyebrow: string
  backTo?: string
}>()
</script>

<template>
  <main class="flex h-full min-h-full flex-col bg-background text-foreground">
    <header class="flex items-start justify-between gap-4 px-5 pt-16">
      <div class="flex min-w-0 items-start gap-2">
        <Button
          v-if="backTo"
          variant="ghost"
          size="icon"
          :as="RouterLink"
          :to="backTo"
          aria-label="Back"
        >
          <ArrowLeft />
        </Button>
        <div class="flex min-w-0 flex-col gap-1">
          <p class="text-sm text-muted-foreground">{{ eyebrow }}</p>
          <h1 class="text-2xl font-semibold tracking-tight">{{ title }}</h1>
        </div>
      </div>
      <ThemeToggle />
    </header>
    <div class="flex min-h-0 flex-1 flex-col">
      <slot />
    </div>
  </main>
</template>
