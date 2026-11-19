<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import Screen from "@/components/Screen.vue"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const props = defineProps<{
  role: "student" | "lecturer"
}>()

const router = useRouter()
const identifier = ref("")
const password = ref("")
const submitted = ref(false)

const copy = computed(() =>
  props.role === "lecturer"
    ? {
        eyebrow: "Lecturer",
        title: "Sign in",
        idLabel: "Staff email",
        idType: "email",
        idAutocomplete: "username",
        idPlaceholder: "name@university.edu",
      }
    : {
        eyebrow: "Student",
        title: "Sign in",
        idLabel: "Index number",
        idType: "text",
        idAutocomplete: "username",
        idPlaceholder: "202400123",
      },
)

const identifierInvalid = computed(
  () => submitted.value && identifier.value.trim().length === 0,
)
const passwordInvalid = computed(
  () => submitted.value && password.value.trim().length === 0,
)

function submit() {
  submitted.value = true
  if (identifierInvalid.value || passwordInvalid.value) return
  router.push({ name: "verify", params: { role: props.role } })
}
</script>

<template>
  <Screen :eyebrow="copy.eyebrow" :title="copy.title" back-to="/">
    <form class="flex flex-1 flex-col px-5 pt-8 pb-8" @submit.prevent="submit">
      <FieldGroup>
        <Field :data-invalid="identifierInvalid || undefined">
          <FieldLabel :for="`${role}-id`">{{ copy.idLabel }}</FieldLabel>
          <Input
            :id="`${role}-id`"
            v-model="identifier"
            :type="copy.idType"
            :autocomplete="copy.idAutocomplete"
            :placeholder="copy.idPlaceholder"
            :aria-invalid="identifierInvalid || undefined"
          />
          <FieldError v-if="identifierInvalid" :errors="['Enter this to continue.']" />
        </Field>
        <Field :data-invalid="passwordInvalid || undefined">
          <FieldLabel :for="`${role}-password`">Password</FieldLabel>
          <Input
            :id="`${role}-password`"
            v-model="password"
            type="password"
            autocomplete="current-password"
            :aria-invalid="passwordInvalid || undefined"
          />
          <FieldError v-if="passwordInvalid" :errors="['Enter your password.']" />
        </Field>
      </FieldGroup>
      <Button class="mt-auto w-full" type="submit">Continue</Button>
    </form>
  </Screen>
</template>
