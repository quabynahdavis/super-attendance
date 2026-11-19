<script setup lang="ts">
import { GraduationCap, Presentation } from "@lucide/vue"
import { useRouter } from "vue-router"
import Screen from "@/components/Screen.vue"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const router = useRouter()

function choose(role: "student" | "lecturer") {
  router.push({ name: "login", params: { role } })
}
</script>

<template>
  <Screen eyebrow="Lecture attendance" title="How are you joining?">
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
          <Button class="w-full" @click="choose('student')">
            Continue as student
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
          <Button class="w-full" variant="outline" @click="choose('lecturer')">
            Continue as lecturer
          </Button>
        </CardFooter>
      </Card>
    </div>
  </Screen>
</template>
