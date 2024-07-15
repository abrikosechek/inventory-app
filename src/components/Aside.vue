<template>
  <div class="aside">
    <img class="aside--logo" src="@/assets/Img_Blur.jpg" />
    <div class="aside--name skeleton-pulsate" />
    <div class="aside__description">
      <div
        v-for="line in 5"
        :key="line"
        class="aside__description--item skeleton-pulsate"
      />
    </div>
    <div class="aside--bottom skeleton-pulsate" />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.aside {
  grid-area: aside;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 14px;
  width: 100%;
  background: var(--grey);
  border: 1px solid var(--light-grey);
  border-radius: 12px;

  &--logo {
    width: 100%;
    height: 240px;
    border-radius: 11px;
  }

  &--name {
    width: 190px;
    height: 26px;
    margin-top: 20px;
    border-radius: 8px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 190px;
    margin-top: 24px;

    &--item {
      height: 10px;
      border-radius: 4px;

      &:nth-child(1) {
        width: 155px;
      }
      &:nth-child(2) {
        width: 100%;
      }
      &:nth-child(3) {
        width: 170px;
      }
      &:nth-child(4) {
        width: 160px;
      }
      &:nth-child(5) {
        width: 140px;
      }
    }
  }

  &--bottom {
    width: 80px;
    height: 10px;
    margin-top: 24px;
    border-radius: 4px;
  }
}
</style>
