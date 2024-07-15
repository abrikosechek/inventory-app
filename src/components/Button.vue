<template>
  <button class="button" :class="[color, { lg }]">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  color: String,
  lg: Boolean,
});
</script>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 15px;
  border-radius: 8px;
  border: 0px;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;

  &.lg {
    width: 100%;
    height: 40px;
  }

  &.white {
    background: white;
    color: black;
  }
  &.red {
    background: #fa7272;
    color: white;

    &:not(.lg) {
      box-shadow: 0 0 15px #fa7272;
    }
  }
}
</style>
