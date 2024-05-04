import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      id: 1,
      name: "Денис Зорин",
      email: "likovdenis12@gmail.com",
      nickName: "@zorin36",
      diamonds: 214,
      riddleCoins: 136.84,
      cleverCoins: 100.000001,
      raiting: 418.00,
      schools: [
        {
          id: 1,
          alerts: 0,
          fixed: false,
          alertsDisabled: false,
        },
        {
          id: 2,
          alerts: 12,
          fixed: true,
          alertsDisabled: true,
        },
        {
          id: 3,
          alerts: 2,
          fixed: false,
          alertsDisabled: false,
        },
      ],
      startedCourses: [
        {
          id: 2
        }
      ],
      startedLessons: [
        
      ],
      startedQuizes: [],
      services: [
        {
          id: 1,
          name: "kingdom",
          maxPower: 500,
          currentPower: 500,
          powerSpeed: 1, // скорость энергии в секунду
          tokensSpeed: 0, // скорость токенов в секунду
          tapCount: 0.000001, // токенов за клик
          boosts: [
          
          ]
        }
      ]
    }
  })
})