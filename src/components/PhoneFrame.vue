<script setup lang="ts"></script>

<template>
  <div
    class="flex min-h-svh items-center justify-center bg-muted p-6 max-[480px]:bg-background max-[480px]:p-0"
  >
    <div
      class="relative h-[min(852px,calc(100svh-3rem))] w-[393px] rounded-[3rem] bg-foreground p-[5px] shadow-2xl max-[480px]:h-svh max-[480px]:w-full max-[480px]:rounded-none max-[480px]:bg-transparent max-[480px]:p-0 max-[480px]:shadow-none"
    >
      <div
        class="relative h-full overflow-hidden rounded-[2.7rem] bg-background max-[480px]:rounded-none"
      >
        <div
          class="bg-foreground pointer-events-none absolute top-3 left-1/2 z-10 h-[37px] w-[126px] -translate-x-1/2 rounded-full max-[480px]:hidden"
          aria-hidden="true"
        />
        <div class="h-full overflow-y-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
