<template>
  <div class="layout">
    <Aside />
    <Bottom />
    <Table />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useInventoryStore } from "@/store/inventory";

import Aside from "@/components/Aside.vue";
import Bottom from "@/components/Bottom.vue";
import Table from "@/components/Table.vue";

const inventoryStore = useInventoryStore();

onMounted(() => {
  inventoryStore.getInventory();
});
</script>

<style lang="scss">
.layout {
  display: grid;
  grid-template-columns: 236px 525px;
  grid-template-rows: 500px 72px;
  gap: 24px;
  grid-template-areas:
    "aside table"
    "bottom bottom";
  width: 890px;
  padding: 32px;
  margin: 0 auto;
}
</style>
