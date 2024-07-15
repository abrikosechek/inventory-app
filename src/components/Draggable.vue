<template>
  <div
    class="draggable"
    :style="`top: ${position.y}px; left: ${position.x}px;`"
  >
    <Sqaures class="draggable__squares" :color="color" />
  </div>
</template>

<script setup>
import Sqaures from "@/components/Squares.vue";

defineProps({
  color: String,
  position: Object,
});
</script>

<style scoped lang="scss">
.draggable {
  position: fixed;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: var(--grey);
  border-radius: 16px;
  border: 1px solid var(--light-grey);
  cursor: grabbing;
  user-select: none;

  &__squares {
    width: 50px;
    height: 50px;
  }
}
</style>
