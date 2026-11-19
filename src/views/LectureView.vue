<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue"
import Screen from "@/components/Screen.vue"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type Arrival = {
  name: string
  index: string
  inRoom: boolean
}

const roster: Arrival[] = [
  { name: "Ama Mensah", index: "202100441", inRoom: true },
  { name: "Kwesi Boateng", index: "202200118", inRoom: false },
  { name: "Abena Owusu", index: "202300902", inRoom: true },
  { name: "Yaw Darko", index: "202100776", inRoom: true },
  { name: "Efua Sarpong", index: "202400215", inRoom: false },
  { name: "Kojo Antwi", index: "202200654", inRoom: true },
]

const windowMs = 20_000
const live = ref(false)
const arrived = ref<Arrival[]>([])
const now = ref(0)
const startedAt = ref(0)
let clock: number | undefined
let arrivals: number | undefined

const present = computed(() => arrived.value.length)
const inRoom = computed(() => arrived.value.filter((person) => person.inRoom).length)
const radioOnly = computed(() => present.value - inRoom.value)

const windowProgress = computed(() => {
  if (!live.value) return 0
  const elapsed = (now.value - startedAt.value) % windowMs
  return (elapsed / windowMs) * 100
})

const secondsLeft = computed(() => {
  if (!live.value) return 20
  const elapsed = (now.value - startedAt.value) % windowMs
  return Math.max(1, Math.ceil((windowMs - elapsed) / 1000))
})

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
}

function stopTimers() {
  if (clock !== undefined) window.clearInterval(clock)
  if (arrivals !== undefined) window.clearInterval(arrivals)
  clock = undefined
  arrivals = undefined
}

function start() {
  stopTimers()
  live.value = true
  arrived.value = []
  startedAt.value = Date.now()
  now.value = startedAt.value
  let next = 0
  clock = window.setInterval(() => {
    now.value = Date.now()
  }, 100)
  arrivals = window.setInterval(() => {
    const person = roster[next]
    if (!person) {
      if (arrivals !== undefined) window.clearInterval(arrivals)
      arrivals = undefined
      return
    }
    arrived.value = [person, ...arrived.value]
    next += 1
  }, 1500)
}

function end() {
  stopTimers()
  live.value = false
  arrived.value = []
  now.value = 0
}

onUnmounted(stopTimers)
</script>

<template>
  <Screen eyebrow="CSC 301 · Room 204" title="Today's lecture">
    <div v-if="!live" class="flex flex-1 flex-col justify-end gap-3 px-5 pt-8 pb-8">
      <p class="text-sm text-muted-foreground">
        Students can check in once the session is live.
      </p>
      <Button class="w-full" @click="start">Start lecture</Button>
    </div>

    <div v-else class="flex min-h-0 flex-1 flex-col gap-4 px-5 pt-6 pb-6">
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <Badge>Live</Badge>
          <span class="text-sm text-muted-foreground">{{ secondsLeft }}s</span>
        </div>
        <Progress :model-value="windowProgress" />
      </div>

      <Card>
        <CardContent class="grid grid-cols-3 gap-2 text-center">
          <div class="flex flex-col gap-1">
            <p class="text-2xl font-semibold">{{ present }}</p>
            <p class="text-xs text-muted-foreground">Present</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-2xl font-semibold">{{ inRoom }}</p>
            <p class="text-xs text-muted-foreground">In room</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-2xl font-semibold">{{ radioOnly }}</p>
            <p class="text-xs text-muted-foreground">Radio only</p>
          </div>
        </CardContent>
      </Card>

      <div class="min-h-0 flex-1 overflow-y-auto">
        <p v-if="arrived.length === 0" class="text-sm text-muted-foreground">
          No one has checked in yet.
        </p>
        <ul v-else class="flex flex-col gap-3">
          <li
            v-for="person in arrived"
            :key="person.index"
            class="flex items-center gap-3"
          >
            <Avatar>
              <AvatarFallback>{{ initials(person.name) }}</AvatarFallback>
            </Avatar>
            <div class="flex min-w-0 flex-1 flex-col">
              <p class="truncate text-sm font-medium">{{ person.name }}</p>
              <p class="text-xs text-muted-foreground">{{ person.index }}</p>
            </div>
            <Badge :variant="person.inRoom ? 'default' : 'secondary'">
              {{ person.inRoom ? "In room" : "Radio only" }}
            </Badge>
          </li>
        </ul>
      </div>

      <Button variant="ghost" class="w-full" @click="end">End lecture</Button>
    </div>
  </Screen>
</template>
