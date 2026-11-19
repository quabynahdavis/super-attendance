<script setup lang="ts"></script>

<template>
  <div
    class="flex min-h-svh items-center justify-center bg-muted p-8 max-[480px]:bg-background max-[480px]:p-0"
  >
    <div
      class="relative flex h-[min(844px,calc(100svh-4rem))] w-[390px] flex-col rounded-[2.75rem] bg-foreground p-3 shadow-2xl max-[480px]:h-svh max-[480px]:w-full max-[480px]:rounded-none max-[480px]:bg-transparent max-[480px]:p-0 max-[480px]:shadow-none"
    >
      <div
        class="bg-foreground pointer-events-none absolute top-5 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rounded-full max-[480px]:hidden"
        aria-hidden="true"
      />
      <div
        class="min-h-0 flex-1 overflow-hidden rounded-[2.15rem] bg-background max-[480px]:rounded-none"
      >
        <div class="h-full overflow-y-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
