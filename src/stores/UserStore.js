import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      id: 1,
      name: "Zorin36",
      email: "likovdenis12@gmail.com",
      diamonds: 214,
      riddleCoins: 136.84,
      cleverCoins: 0.000001,
      raiting: 418.00,
      startedCourses: [
        {
          id: 2,
          name: "Курс по TypeScript",
          desc: "Самый современный курс по TypeScript",
          cover: "https://edwica.ru/uploads/images/course/17016/preview-course_cover.png",
          school_id: 2,
          duration: "8:30",
          rate: {
            stars: 4.3,
            rates: 165
          },
          lang: "ru",
          tags: ["Разработка", "TS", "TypeScript"],
          level: "Middle",
        }
      ],
      startedLessons: [],
      startedQuizes: [],
      services: [
        {
          id: 1,
          name: "kingdom",
          maxPower: 1000,
          currentPower: 1000,
          powerSpeed: 1, // скорость энергии в секунду
          tokensSpeed: 0, // скорость токенов в секунду
          tapCount: 1, // токенов за клик
          boosts: [
            {
              id: "tapBoost",
              name: "💪 Мощность",
              boosts: [
                {
                  id: 1,
                  title: "Удобрения",
                  icon: "🦴",
                  lvl: 10,
                  farm: 0.000001,
                  startPrice: 0.000010
                },
                {
                  id: 2,
                  title: "Опыление",
                  icon: "🐝",
                  farm: 0.000003,
                  startPrice: 0.000050
                },
                {
                  id: 3,
                  title: "Поливка",
                  icon: "💦",
                  farm: 0.000010,
                  startPrice: 0.000100
                },
              ]
            },
            {
              id: "miningBoost",
              name: "🚜 Добыча",
              boosts: [
                
              ]
            },
            {
              id: "energyBoost",
              name: "⚡️ Энергия",
              boosts: [
                
              ]
            },
          ]

        }
      ]
    }
  })
})