<template>
  <div class="squares">
    <div class="squares--fill" :style="`background: var(--${color})`" />
    <div class="squares--glass" :style="`background: var(--${color}-blur)`" />
  </div>
</template>

<script setup>
defineProps({
  color: String,
});
</script>

<style scoped lang="scss">
.squares {
  flex: 0 0 auto;
  position: relative;

  &--fill,
  &--glass {
    position: absolute;
    width: 88%;
    height: 88%;
  }

  &--fill {
    z-index: 0;
    left: 0;
    bottom: 0;
  }
  &--glass {
    z-index: 1;
    right: 0;
    top: 0;
    backdrop-filter: blur(8px);
  }
}
</style>
