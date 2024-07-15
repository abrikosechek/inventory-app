<template>
  <div class="bottom">
    <div class="bottom--content skeleton-pulsate" />
    <button class="bottom__close">
      <IconClose class="bottom__close--icon" />
    </button>
  </div>
</template>

<script setup>
import { IconClose } from "@/icons";
</script>

<style scoped lang="scss">
.bottom {
  grid-area: bottom;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 18px;
  padding-right: 70px;
  background: var(--grey);
  border: 1px solid var(--light-grey);
  border-radius: 12px;

  &--content {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    background: transparent;
    border: 0px;
    cursor: pointer;

    &--icon {
      height: 12px;
      width: 12px;
      fill: white;
    }
  }
}
</style>
