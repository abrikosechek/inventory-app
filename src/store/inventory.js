import { defineStore } from "pinia";
import { set as LockrSet, get as LockrGet } from "lockr";

const defaultinventory = [
  {
    color: "green",
    amount: 4,
    place: 1,
  },
  {
    color: "orange",
    amount: 2,
    place: 2,
  },
  {
    color: "purple",
    amount: 5,
    place: 3,
  },
];

export const useInventoryStore = defineStore("inventory", {
  state: () => ({ inventoryState: [] }),
  getters: {
    inventory: (state) => state.inventoryState,
  },
  actions: {
    getInventory() {
      if (!LockrGet("inventory")) {
        LockrSet("inventory", defaultinventory);
      }
      this.inventoryState = LockrGet("inventory");
    },
    changeItemPlace(itemPlace, newPlace) {
      let inventoryArray = [...this.inventoryState];

      if (inventoryArray.some((item) => item.place == newPlace)) {
        inventoryArray.find((item) => item.place == newPlace).place = itemPlace;
      }
      inventoryArray.find((item) => item.place == itemPlace).place = newPlace;

      LockrSet("inventory", inventoryArray);
      this.getInventory();
    },
  },
});
