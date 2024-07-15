<template>
  <div class="table">
    <div class="table__cells">
      <div
        v-for="item in 25"
        :key="`emptycell_${item}`"
        :style="`--i: i${item}`"
        class="table__cells--item"
      />
      <TableItem
        v-for="item in inventory"
        :key="item.place"
        :index="item.place"
        :color="item.color"
        :amount="item.amount"
        :active="itemInfo && itemInfo.place == item.place"
        @mouseup="openItem(item)"
        @mousedown="(e) => handleMouseDown(item, e)"
      />

      <div v-if="itemInfo" class="table__aside" @click.self="itemInfo = null">
        <div class="table-aside">
          <button class="table-aside__close" @click="itemInfo = null">
            <IconClose class="table-aside__close--icon" />
          </button>

          <Sqaures class="table-aside--logo" :color="itemInfo.color" />

          <div class="table-aside__content">
            <div class="table-aside__content--name skeleton-pulsate" />
            <div class="table-aside__content__description">
              <div
                v-for="line in 5"
                :key="line"
                class="table-aside__content__description--item skeleton-pulsate"
              />
            </div>
          </div>

          <div v-if="!deleting" class="table-aside__bottom">
            <Button lg color="red" @click="deleting = true">
              Удалить предмет
            </Button>
          </div>
          <div v-else class="table-aside__bottom lg">
            <input
              type="number"
              inputmode="numeric"
              class="table-aside__bottom--input"
              placeholder="Введите количество"
            />

            <div class="table-aside__bottom__buttons">
              <Button color="white" @click="deleting = false"> Отмена </Button>
              <Button color="red"> Подтвердить </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Draggable
    v-if="dragging"
    :color="draggableItem.color"
    :position="draggableItemPosition"
  />
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { useInventoryStore } from "@/store/inventory";
import { IconClose } from "@/icons";

import Button from "@/components/Button.vue";
import Draggable from "@/components/Draggable.vue";
import Sqaures from "@/components/Squares.vue";
import TableItem from "@/components/TableItem.vue";

const inventoryStore = useInventoryStore();

const itemInfo = ref(null);
const deleting = ref(false);

const inventory = computed(() => inventoryStore.inventory);

function openItem(item) {
  if (!dragging.value) itemInfo.value = item;
}

let dragging = ref(false);
let draggableItem = ref(null);
let draggableItemPosition = ref({
  y: 0,
  x: 0,
});

function handleMouseMove(e) {
  if (!e) return;
  dragging.value = true;
  draggableItemPosition.value.y = e.clientY - 70;
  draggableItemPosition.value.x = e.clientX - 70;
}

async function handleMouseUp(e) {
  const draggableItemPlace = draggableItem.value.place;
  dragging.value = false;
  draggableItem.value = null;

  await nextTick();
  const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
  if (elementUnderCursor.classList[0] == "table__cells--item") {
    const newItemPlace = elementUnderCursor.style.cssText
      .split("--i: i")
      .join("")
      .split(";")
      .join("");
    inventoryStore.changeItemPlace(draggableItemPlace, newItemPlace);
  }

  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseup", handleMouseUp);
}

function handleMouseDown(item) {
  draggableItem.value = item;

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
}
</script>

<style scoped lang="scss">
.table {
  grid-area: table;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1px;
  background: var(--light-grey);
  border-radius: 12px;
  border: 1px solid var(--light-grey);

  &__cells {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-template-areas:
      "i1  i2  i3  i4  i5"
      "i6  i7  i8  i9  i10"
      "i11 i12 i13 i14 i15"
      "i16 i17 i18 i19 i20"
      "i21 i22 i23 i24 i25";
    gap: 1px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;

    &--item {
      grid-area: var(--i);
      width: 100%;
      height: 100%;
      background: var(--grey);
    }
  }

  &__aside {
    position: absolute;
    z-index: 2;
    right: 1px;
    top: 1px;
    width: calc(100% - 1px);
    height: calc(100% - 2px);
    border-radius: 12px;
    overflow: hidden;
  }
}

.table-aside {
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  position: absolute;
  z-index: 1;
  right: 0;
  height: 100%;
  width: 250px;
  background: #26262690;
  backdrop-filter: blur(8px);
  border-left: 1px solid var(--light-grey);

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

  &--logo {
    width: 130px;
    height: 130px;
    margin-top: 55px;
  }

  &__content {
    width: 220px;
    margin-top: 30px;
    padding: 16px 4px 24px;
    border-top: 1px solid var(--light-grey);
    overflow: auto;

    &--name {
      height: 30px;
      width: 100%;
      border-radius: 8px;
    }

    &__description {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: 100%;
      margin-top: 24px;

      &--item {
        height: 10px;
        border-radius: 4px;

        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
          width: 100%;
        }
        &:nth-child(4) {
          width: 180px;
        }
        &:nth-child(5) {
          width: 80px;
        }
      }
    }
  }

  &__bottom {
    width: 220px;
    padding: 18px 15px;
    border-top: 1px solid var(--light-grey);

    &.lg {
      width: 100%;
    }

    &--input {
      width: 100%;
      height: 40px;
      padding: 10px 12px;
      background: var(--grey);
      border: 1px solid var(--light-grey);
      border-radius: 4px;
      color: white;

      &::placeholder {
        color: white;
        opacity: 40%;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      appearance: textfield;
      -moz-appearance: textfield;
    }

    &__buttons {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
