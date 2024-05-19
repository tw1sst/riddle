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
          type: "ls", // group
          user_id: 2,
          school_id: null,
          messages: [
            {
              id: 1,
              chat_id: 1,
              from_user_id: 1,
              replied_msg: null,
              text: "Привет, как дела",
              date: "18.05.2024 18:30"
            },
            {
              id: 2,
              chat_id: 1,
              from_user_id: 2,
              replied_msg: null,
              text: "У меня все отлично",
              date: "18.05.2024 18:35"
            },
            {
              id: 2,
              chat_id: 1,
              from_user_id: 2,
              replied_msg: null,
              text: "У меня все отлично difjfbfufj fifur irjrnruf y y yyu h r r rtturiejehh uubi hg yggdudubxbccuyh gggyhdbduxuxhdbdhdudhx",
              date: "18.05.2024 18:36"
            },
            {
              id: 2,
              chat_id: 1,
              from_user_id: 1,
              replied_msg: null,
              text: "У меня все отлично difjfbfufj fifur irjrnruf y y yyu h r r rtturiejehh uubi hg yggdudubxbccuyh gggyhdbduxuxhdbdhdudhx",
              date: "18.05.2024 18:38"
            }
          ]
        },
        {
          id: 2,
          type: "ls", // group
          user_id: 1,
          school_id: null,
          messages: [
            {
              id: 2,
              chat_id: 1,
              from_user_id: 1,
              replied_msg: null,
              text: "У меня все отлично difjfbfufj fifur irjrnruf y y yyu h r r rtturiejehh uubi hg yggdudubxbccuyh gggyhdbduxuxhdbdhdudhx",
              date: "18.05.2024 18:38"
            }
          ]
        },
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