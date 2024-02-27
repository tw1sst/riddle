const allCourses = [
  {
    id: 1,
    name: "Курс по JavaScript",
    desc: "Самый современный курс по JavaScript",
    cover: "https://cdn-bucket.hb.bizmrg.com/purple-images/courses/undefined/%C3%90%C2%9E%C3%90%C2%B1%C3%90%C2%BB%C3%90%C2%BE%C3%90%C2%B6%C3%90%C2%BA%C3%90%C2%B0-adv.jpg",
    school_id: 2,
    duration: "3:45",
    rate: {
      stars: 4.6,
      rates: 253
    },
    lang: "ru",
    tags: ["Разработка", "JS", "JavaScript"],
    level: "June", // middle, senior, advanced, other
    paid: {
      enable: true,
      price_rub: 1499.99
    },
    modules: []
  },
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
    paid: {},
    modules: [
      {
        id: 1,
        title: '1. Основы',
        description: "Изучите основы разработки",
      },
      {
        id: 2,
        title: "Описание переменных",
        description: "текст урока 3",
        lessons: [
  {
    id: 1,
    title: "Описание переменных",
    description: "Описание урока",
    content: "текст урока 1"
  },
  {
    id: 2,
    title: "Введение в переменные в JavaScript",
    description: "Ознакомление с концепцией переменных в языке программирования JavaScript и использование их для хранения и манипуляции данными.",
    content: `Урок: Введение в переменные в JavaScript

Цель урока: Ознакомиться с концепцией переменных в языке программирования JavaScript и научиться использовать их для хранения и манипуляции данными.

Введение:
В программировании переменные играют важную роль, так как они позволяют сохранять и использовать значения. В JavaScript переменные объявляются с помощью ключевого слова "var", "let" или "const" и могут содержать различные типы данных, такие как числа, строки, булевы значения и т.д.

Шаги:
1. Объявление переменных:
   - Для объявления переменной используйте ключевое слово "var", "let" или "const", за которым следует имя переменной.
   
     Пример:
     
     var age;
     let name;
     const PI = 3.14;
     
   
2. Присвоение значения переменной:
   - Используйте знак "=" для присвоения значения переменной.
   
     Пример:
     
     age = 25;
     name = "John";
     
   
3. Использование переменных:
   - После того, как переменная объявлена и ей присвоено значение, вы можете использовать ее в коде.
   
     Пример:
     
     var total = 0;
     total = total + 10;
     console.log(total); // Выведет 10
     
     
4. Изменение значения переменной:
   - Значение переменной может быть изменено, присвоив ей новое значение.
   
     Пример:
     
     var count = 5;
     count = count + 1;
     console.log(count); // Выведет 6
     
     
5. Использование разных типов данных:
   - Переменные в JavaScript могут содержать разные типы данных, такие как числа, строки, булевые значения и т.д.
   
     Пример:
     
     var age = 25;
     var name = "John";
     var isStudent = true;
     
     
6. Комментарии:
   - Вы можете добавить комментарии в код, чтобы пояснить его.
   
     Пример:
     
     // Это комментарий
     var age = 25; // Это комментарий для объявления переменной
     
     
Заключение:
В этом уроке мы познакомились с переменными в JavaScript. Мы научились объявлять переменные, присваивать им значения, использовать их в коде и изменять значения. Теперь у вас есть базовое представление о работе с переменными в JavaScript.`,
    quiz: {
      required: true,
      minPers: 50,
      tasks: [
        {
          id: 1,
          index: 1,
          title: "Какой метод используется для конкатенации (объединения) двух массивов в JavaScript?",
          subTitle: "Выберите правильный вариант ответа",
          type: "selectCorrect",
          data: {
            options: [
              {
                id: 1,
                title: "concat()"
              },
              {
                id: 2,
                title: "join()"
              },
              {
                id: 3,
                title: "merge()"
              },
              {
                id: 4,
                title: "combine()"
              },
            ]
          },
          answer: "2,3",
          correctAnswerDesc: "4 потому что 4",
          inCorrectAnswerDesc: "подумайте получше",
          canSkip: true,
          required: true,
          showCorrect: true,
        },
        {
          id: 2,
          index: 2,
          title: "Расположите слова в правильном порядке",
          subTitle: "Создайте правильную последовательность данных фраз",
          type: "correctOrder",
          data: {
            words: [
              {
                id: 1,
                title: "Пошла"
              },
              {
                id: 2,
                title: "Настя"
              },
              {
                id: 3,
                title: "Сегодня"
              },
              {
                id: 4,
                title: "Гулять"
              },
              {
                id: 5,
                title: "Своей"
              },
              {
                id: 6,
                title: "Со"
              },
              {
                id: 7,
                title: "Подружкой"
              },
            ]
          },
          answer: "2,1,4",
          correctAnswerDesc: "4 потому что 4",
          inCorrectAnswerDesc: "подумайте получше",
          canSkip: true,
          required: true,
          showCorrect: true,
        },
        {
          id: 3,
          index: 3,
          type: "simpleQuest",
          title: "Чем отличаются типы данных 'interface' и 'type' в TypeScript?",
          subTitle: "Когда и почему стоит использовать каждый из них?",
          data: {},
          answer: 4,
          correctAnswerDesc: "4 потому что 4",
          inCorrectAnswerDesc: "подумайте получше",
          canSkip: true,
          required: true,
          showCorrect: true,
        },
        {
          id: 4,
          index: 4,
          type: "simpleQuest",
          title: "Сколько будет 5 * 2",
          subTitle: "подумайте очень хорошо",
          data: {},
          answer: 10,
          correctAnswerDesc: "10 потому что 10",
          inCorrectAnswerDesc: "подумайте получше",
          canSkip: true,
          required: true,
          showCorrect: true,
          required: false,
        },
      ]
    }
  }
]
      },
      {
        id: 3,
        title: "Описание переменных",
        description: "текст урока 4"
      }
    ]
  },
  {
    id: 3,
    name: "Курс по Vue 3",
    desc: "Самый современный курс по Vue 3",
    cover: "https://blog.logrocket.com/wp-content/uploads/2023/10/Exploring-advanced-design-patterns-Vue-js.png",
    schol_id: 2,
    duration: "6:10",
    rate: {
      stars: 3.8,
      rates: 37
    },
    lang: "ru",
    tags: ["Разработка", "Vue", "JavaScript"],
    level: "Senior",
    paid: {},
    modules: []
  }
]


export {
  allCourses
}