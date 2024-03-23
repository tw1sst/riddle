import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      id: 1,
      name: "Zorin36",
      email: "likovdenis12@gmail.com",
      diamonds: 214,
      riddleCoins: 0,
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
      startedLessons: [
        
      ]
    }
  })
})