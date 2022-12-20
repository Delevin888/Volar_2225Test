<script setup lang="ts">
const emit = defineEmits<{
  (e: 'reset', data: string): void
  (e: 'search', data: string): void
}>()
</script>
<template>
  <div class="TestComp">
    <a-button @click="emit('reset', '')">reset</a-button>
    <a-button @click="emit('search', '')">search</a-button>
  </div>
</template>

<style lang="scss" scoped>
// prettier-ignore
.TestComp {
  box-sizing: border-box; width: 100%; height: 100%;
}
</style>
