<template>
  <div class="table-item" :class="{ active }">
    <Sqaures class="table-item__squares" :color="color" />
    <div class="table-item__amount">
      <p>
        {{ amount }}
      </p>
    </div>
  </div>
</template>

<script setup>
import Sqaures from "@/components/Squares.vue";

defineProps({
  index: Number,
  color: String,
  amount: Number,
  active: Boolean,
});
</script>

<style scoped lang="scss">
.table-item {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--grey);
  cursor: pointer;
  transition: background 0.2s;
  user-select: none;

  &:hover,
  &.active {
    background: #2f2f2f;
  }

  &__squares {
    width: 54px;
    height: 54px;
  }

  &__amount {
    display: flex;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 3px 6px 2px;
    background: var(--grey);
    border-radius: 6px 0 0 0;
    border-top: 1px solid var(--light-grey);
    border-left: 1px solid var(--light-grey);

    & p {
      font-size: 12px;
      line-height: 12px;
      opacity: 40%;
    }
  }
}
</style>
