<template> 
<div class="skill">
  <div class="skill__header">
    <a-input 
      class="services__search" 
      v-model:value="state.search" 
      placeholder="Найдите курс, школу или программу тренировок">
      <template #prefix>
        <span class="services__header-searchIcon material-icons-round">search</span>
      </template>
    </a-input>
    <a-button>
      <span class="material-icons-round">tune</span>
    </a-button>
  </div>
  
  <h3>🎓 Riddle Skill</h3><br/>
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
    <h3>Ваши курсы</h3>
    <a href="#">Смотреть все</a>
  </div>
  <div class="skill__caurosel">
    <div v-for="course in userStore.user.startedCourses" class="skill__caurosel-item">
      <CourseCard :course="course" :type="'full'"/>
    </div>
  </div><br/>
  
  <div class="skill__continue">
     <h3>Продолжить обучение</h3>
      <div class="skill__continue-block">
       <div class="skill__continue-flex">
         <div class="skill__continue-title">
           {{ state.continueCourse.name }} • 2/7
         </div>
         <a-progress 
           :trailColor="'#f4f5f5'"
           :strokeColor="'lime'"
           :percent="30" 
           :show-info="false" 
           status="exception" 
           size="small" />
       </div>
       <div @click="$router.push({ name: 'SkillCoursePage', params: { id: state.continueCourse.id, course: JSON.stringify(state.continueCourse) } })" class="skill__continue-button">
         <span class="material-icons-round">arrow_forward</span>
       </div>
     </div>
  </div><br/>
 
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
    <h3>Популярные курсы</h3>
    <a href="#">Смотреть все</a>
  </div>
  <div class="skill__caurosel">
    <div v-for="course in allCourses" class="skill__caurosel-item">
      <CourseCard :course="course" :type="'full'"/>
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
import { useUserStore } from '@/stores/UserStore.js'
import AccountBlock from "@/components/account/Avatar.vue"
import { allCourses } from '@/server/fakedata/skill/Courses.js'
import CourseCard from '@/components/skill/CourseCard.vue'
import { reactive } from "vue";

const userStore = useUserStore()
const state = reactive({
  search: "",
  startedCourses: [],
  continueCourse: {}
})

if (userStore.user.startedCourses) {
  state.startedCourses = userStore.user.startedCourses
  
  state.continueCourse = allCourses.find(x => x.id == state.startedCourses[0].id)
}

const tags = [
  {
    id: 0,
    name: "🔍 Все"
  },
  {
    id: 1,
    name: "💪 Спорт"
  },
  {
    id: 2,
    name: "💻 Разработка"
  },
  {
    id: 3,
    name: "🇬🇧 Языки"
  },
  {
    id: 4,
    name: "🎨 Дизайн"
  },
  {
    id: 5,
    name: "👥 Маркетинг"
  },
  {
    id: 6,
    name: "💵 Финансы"
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
  padding: 50px 20px 40px 20px;
  &__continue {
    &-block {
      background-color: #3E68F8;
      padding: 10px 20px;
      border-radius: 10px;
      color: white;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-flex {
      display: flex;
      width: 80%;
      flex-direction: column;
      margin-right: 20px;
    }
    &-button {
      border-radius: 50%;
      background-color: lime;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
    }
    &-title {
      font-weight: 600;
    }
  }
  &__header {
    background-color: white;
    position: fixed;
    width: 100%;
    top: 50px;
    left: 0;
    padding: 0 20px 10px 20px;
    z-index: 5;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr auto;
    &-filters {
     
    }
  }
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
      width: 200px;
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