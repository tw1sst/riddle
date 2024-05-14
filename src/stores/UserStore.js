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
      chats: [
        {
          id: 1,
          type: "bot",
          bot: {
            name: "RiddleMind Bot",
            avatar: "https://i.ibb.co/88xT2n5/AB12504-B-22-E4-4-ABC-A62-C-C57-B6-F6-C8-B8-A.jpg"
          },
          messages: [
            {
              id: 1,
              from: "user",
              replied_msg: null,
              text: "Привет, как дела",
            }
          ]
        },
        {
          id: 2,
          type: "user",
          user: {
            id: 1,
            name: "Денис зорин"
          },
          messages: [
            {
              id: 1,
              from_user_id: 1,
              replied_msg: null,
              text: "Привет, новый чат",
              
            }
          ]
        }
      ],
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