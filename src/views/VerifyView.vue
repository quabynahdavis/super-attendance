<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue"
import { useRouter } from "vue-router"
import Screen from "@/components/Screen.vue"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const props = defineProps<{
  role: "student" | "lecturer"
}>()

const router = useRouter()

const steps = [
  { title: "Center your face", detail: "Hold still inside the circle." },
  { title: "Turn left", detail: "Turn your head slowly to the left." },
  { title: "Turn right", detail: "Turn your head slowly to the right." },
  { title: "Blink", detail: "Blink twice, then look forward." },
  { title: "Smile", detail: "Smile, then return to a neutral face." },
]

const index = ref(-1)
const timer = ref<number | undefined>()

const current = computed(() => (index.value >= 0 ? steps[index.value] : null))
const done = computed(() => index.value >= steps.length)
const progress = computed(() =>
  index.value < 0 ? 0 : Math.min(100, Math.round(((index.value + 1) / steps.length) * 100)),
)

const pose = computed(() => {
  if (index.value === 1) return "-rotate-12"
  if (index.value === 2) return "rotate-12"
  if (index.value === 4) return "scale-105"
  return ""
})

function stop() {
  if (timer.value !== undefined) window.clearInterval(timer.value)
  timer.value = undefined
}

function start() {
  stop()
  index.value = 0
  timer.value = window.setInterval(() => {
    if (index.value >= steps.length - 1) {
      index.value = steps.length
      stop()
      return
    }
    index.value += 1
  }, 2200)
}

onUnmounted(stop)

const eyebrow = computed(() =>
  props.role === "lecturer" ? "Lecturer verification" : "Student verification",
)
</script>

<template>
  <Screen :eyebrow="eyebrow" title="Face check" :back-to="`/login/${role}`">
    <div class="flex flex-1 flex-col items-center gap-6 px-5 pt-8 pb-8">
      <div
        class="bg-muted relative flex size-56 items-center justify-center rounded-full border-4 border-primary transition-transform duration-500"
        :class="pose"
      >
        <div class="bg-background size-44 rounded-full border border-border" />
      </div>

      <div class="flex w-full flex-col gap-2 text-center">
        <p class="text-lg font-medium">
          {{ done ? "Check complete" : current?.title ?? "Ready when you are" }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{
            done
              ? "You can continue into the app."
              : current?.detail ?? "A circle will guide each step. This preview does not use the camera."
          }}
        </p>
      </div>

      <Progress class="w-full" :model-value="done ? 100 : progress" />

      <Button v-if="index < 0" class="mt-auto w-full" @click="start">
        Start face check
      </Button>
      <Button
        v-else-if="done"
        class="mt-auto w-full"
        @click="router.push({ name: role === 'lecturer' ? 'lecture' : 'attend' })"
      >
        Done
      </Button>
      <p v-else class="text-muted-foreground mt-auto text-sm">
        Step {{ index + 1 }} of {{ steps.length }}
      </p>
    </div>
  </Screen>
</template>
