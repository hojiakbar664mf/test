import {defineStore} from "pinia";
import {api} from "@/stores/api/index.js";

export const useUsers = defineStore('users', {
  state: () => ({
    users: [],
  }),
  actions: {
    getUsers() {
      api({
        url: 'users',
        method: 'get'
      }).then(({data}) => {
        this.users = data;
      }).catch((error) => {
        console.log(error)
      }).finally(() => {})
    }
  }
});