import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      id: 1,
      name: "Zorin36",
      email: "likovdenis12@gmail.com",
      diamonds: 214,
      riddleCoins: 0,
      raiting: 418.00
    }
  })
})