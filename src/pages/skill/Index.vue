<template>
<div class="skill">
  <h2>🎓 Riddle Skill</h2><br/>
  
  <a-carousel arrows dots-class="slick-dots" class="skill__slider" autoplay>
    <div v-for="slide in mainSliderItems" 
      class="skill__slider-item">
      <img :src="slide.cover" class="skill__slider-cover">
      <div class="skill__slider-emoji">
        {{ slide.emoji }}
      </div>
      <div class="skill__slider-content">
        <div class="skill__slider-title">
          {{ slide.title }}
        </div>
        <div class="skill__slider-subtext">
          {{ slide.subtext }}
        </div>
        <div class="skill__slider-button">
          <a-button  
            type="primary">
            {{ slide.buttonText }}
          </a-button>
        </div>
      </div>
    </div>
  </a-carousel><br/>
 
  <div class="skill__headblock">
    <h3>Топ авторов</h3>
    <a href="#">Смотреть все</a>
  </div>
  <div class="skill__topauthors">
    <div class="skill__topauthors-item"
      v-for="user in topAuthors">
      <AccountBlock 
        :userName="user.name"
        :subText="'Курсов: ' + user.courses"       />
    </div>
  </div><br/>
  
  <div class="skill__headblock">
    <h3>Теги</h3>
    <a href="#">Смотреть все</a>
  </div>
  <div class="skill__tags">
    <a-button
      v-for="tag in tags" 
      class="skill__tags-item">
        {{ tag.name }}
    </a-button>
  </div><br/>
  
  <div class="skill__headblock">
    <h3>Популярные курсы</h3>
    <a href="#">Смотреть все</a>
  </div>
  <div class="skill__caurosel">
    <div v-for="course in allCourses" class="skill__caurosel-item">
      <CourseCard :course="course" :type="'full'"/>
    </div>
  </div><br/>
  
  <div class="skill__headblock">
    <h3>Все курсы</h3>
    <a href="#">Смотреть все</a>
  </div>
  <div class="skill__courses">
    <div v-for="course in allCourses" class="skill__courses-item">
      <CourseCard :course="course" />
    </div>
  </div>
</div>
</template>


<script setup>
import AccountBlock from "@/components/account/Avatar.vue"
import { allCourses } from '@/server/fakedata/skill/Courses.js'
import CourseCard from '@/components/skill/CourseCard.vue'

const tags = [
  {
    id: 0,
    name: "🔍 Все"
  },
  {
    id: 1,
    name: "💻 Разработка"
  },
  {
    id: 2,
    name: "🇬🇧 Языки"
  },
  {
    id: 3,
    name: "🎨 Дизайн"
  },
  {
    id: 4,
    name: "👥 Маркетинг"
  },
  {
    id: 5,
    name: "💵 Финансы"
  },
  {
    id: 6,
    name: "💼 Бизнес"
  },
]

const topAuthors = [
  {
    id: 1,
    name: "Иван Петров",
    courses: 46
  },
  {
    id: 2,
    name: "Василий Новиков",
    courses: 52
  },
  {
    id: 3,
    name: "LearnToSchool",
    courses: 63
  },
  {
    id: 4,
    name: "EnglishBro",
    courses: 38
  },
  {
    id: 5,
    name: "Моисей Мовсисян",
    courses: 40
  },
  {
    id: 6,
    name: "Успешный Успех",
    courses: 43
  },
]

const mainSliderItems = [
  {
    title: "Обучайтесь",
    subtext: "- правильно, находите школы и проходите курсы повышая свои навыки в удобном формате",
    cover: "https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-49273.jpg",
    buttonText: "Начать обучение",
    buttonRedirect: "AutoMarket",
    emoji: "🎓"
  },
  {
    title: "Зарабатывайте",
    subtext: "- на своих знаниях, создав свою школу и привлекая новых студентов",
    cover: "https://static.vecteezy.com/system/resources/previews/002/537/004/original/light-pink-blue-abstract-blurred-background-colorful-abstract-illustration-with-gradient-background-for-ui-designers-vector.jpg",
    buttonText: "Создать школу",
    buttonRedirect: "SkillHome",
    emoji: "📣"
  },
]
</script> 


<style lang="scss" scoped>
.skill {
  padding: 10px 20px 40px 20px;
  &__headblock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & a {
     font-size: 12px;
    }
  }
  &__caurosel {
    gap: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    box-sizing: content-box;
    overflow-x: auto;
    width: 100%;
    padding: 0 20px;
    margin: 10px -20px 0 -20px;
    &-item {
      width: 230px;
    }
  }
  &__tags {
    gap: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    box-sizing: content-box;
    overflow-x: auto;
    width: 100%;
    padding: 0 20px;
    margin: 10px -20px 0 -20px;
    &-item {
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &__topauthors {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
    box-sizing: content-box;
    overflow-x: auto;
    width: 100%;
    padding: 0 20px;
    margin: 10px -20px 0 -20px;
    &-item {
      width: 150px;
      background-color: white;
      border-radius: 10px;
      padding: 5px 10px;
      overflow: hidden;
      display: flex;
      align-items: center;
    }
  }
  &__courses {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 10px -10px 0 -10px;
    &-item {
      
    }
  }
  &__slider {
    margin: 0 -20px;
    :deep(.slick-dots) {
      display: none !important;
    }
    :deep(.slick-arrow) {
      display: none !important;
    }
    &-item {
      height: 200px;
      overflow: hidden;
      position: relative;
      padding: 0 20px;
      border-radius: 10px;
    }
    &-cover {
      top: 0;
      left: 0;
      border-radius: 10px;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    &-emoji {
      font-size: 100px;
      position: absolute;
      right: 0;
      top: 0px;
      z-index: 1;
    }
    &-content {
      position: absolute;
      top: 0;
      padding: 10px 20px 20px 20px;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-title {
      font-size: 24px;
      color: white;
      font-weight: 700;
      margin-bottom: 10px;
    }
    &-subtext {
      color: white;
      margin-bottom: 20px;
    }
  }
}
</style>