<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue"
import Screen from "@/components/Screen.vue"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type Phase = "idle" | "listening" | "beacon" | "recorded"

const phase = ref<Phase>("idle")
const timers: number[] = []

const progress = computed(() => {
  if (phase.value === "listening") return 35
  if (phase.value === "beacon") return 70
  if (phase.value === "recorded") return 100
  return 0
})

const status = computed(() => {
  if (phase.value === "listening") return "Listening"
  if (phase.value === "beacon") return "Lecture found"
  if (phase.value === "recorded") return "In room"
  return "Ready"
})

const steps = computed(() => [
  {
    label: "Bluetooth",
    detail: phase.value === "idle" ? "Waiting to start" : "Lecture beacon heard",
    done: phase.value === "beacon" || phase.value === "recorded",
    active: phase.value === "listening",
  },
  {
    label: "Room tone",
    detail:
      phase.value === "recorded"
        ? "Chirp matched the beacon"
        : "Listening for the tone inside the room",
    done: phase.value === "recorded",
    active: phase.value === "beacon",
  },
  {
    label: "Attendance",
    detail: phase.value === "recorded" ? "Recorded for CSC 301" : "Not sent yet",
    done: phase.value === "recorded",
    active: false,
  },
])

function clearTimers() {
  for (const timer of timers) window.clearTimeout(timer)
  timers.length = 0
}

function start() {
  clearTimers()
  phase.value = "listening"
  timers.push(window.setTimeout(() => {
    phase.value = "beacon"
  }, 1600))
  timers.push(window.setTimeout(() => {
    phase.value = "recorded"
  }, 3400))
}

function end() {
  clearTimers()
  phase.value = "idle"
}

onUnmounted(clearTimers)
</script>

<template>
  <Screen eyebrow="CSC 301 · Room 204" title="Your attendance">
    <div v-if="phase === 'idle'" class="flex flex-1 flex-col justify-end gap-3 px-5 pt-8 pb-8">
      <p class="text-sm text-muted-foreground">
        Your phone will mark you when it hears this lecture.
      </p>
      <Button class="w-full" @click="start">Check in</Button>
    </div>

    <div v-else class="flex min-h-0 flex-1 flex-col gap-4 px-5 pt-6 pb-6">
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <Badge :variant="phase === 'recorded' ? 'default' : 'secondary'">
            {{ status }}
          </Badge>
          <span class="text-sm text-muted-foreground">CSC 301</span>
        </div>
        <Progress :model-value="progress" />
      </div>

      <Card v-if="phase === 'recorded'">
        <CardContent class="flex flex-col gap-1">
          <p class="text-lg font-semibold">Attendance recorded</p>
          <p class="text-sm text-muted-foreground">
            You can put your phone away. The room tone confirmed you are inside.
          </p>
        </CardContent>
      </Card>

      <ul class="flex flex-col gap-3">
        <li
          v-for="step in steps"
          :key="step.label"
          class="flex items-center justify-between gap-3"
        >
          <div class="flex min-w-0 flex-col">
            <p class="text-sm font-medium">{{ step.label }}</p>
            <p class="text-xs text-muted-foreground">{{ step.detail }}</p>
          </div>
          <Badge :variant="step.done ? 'default' : 'outline'">
            {{ step.done ? "Done" : step.active ? "Now" : "Waiting" }}
          </Badge>
        </li>
      </ul>

      <Button variant="ghost" class="mt-auto w-full" @click="end">
        Leave session
      </Button>
    </div>
  </Screen>
</template>
