import {defineStore} from "pinia";

export const useCore = defineStore('core', {
  state: () => ({
    visible: false
  }),
});
