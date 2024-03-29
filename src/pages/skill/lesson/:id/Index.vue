<template>
<div class="lesson">
  <div class="lesson__header">
    <div class="lesson__header-left">
      <span @click="$router.push({ 
          name: 'SkillCoursePage',
          params: {
            id: state.course?.id,
            course: JSON.stringify(state.course),
            module: JSON.stringify(state.module),
          }
        })" 
        class="material-icons-round lesson__header-item">arrow_back_ios</span>
    </div>
    <div class="lesson__header-center">
      <div class="lesson__header-text">
        {{ state.lesson.title }}
      </div>
    </div>
    <div class="lesson__header-right">
      <span class="material-icons-round lesson__header-item">ios_share</span>
       <span class="material-icons-round lesson__header-item">bookmark_border</span>
    </div>
  </div>
  
  <div class="lesson__content">  
    <div class="lesson__content-text">
      <h3>{{ state.lesson.title }}</h3><br/>
      <div v-if="lessonState?.progressStatus == 'complete'" class="lesson__alert">
    	  <a-alert
            :description="'Вы успешно завершили прохождение этого урока'"
            message="Урок успешно завершен" 
            type="success" show-icon />
        <br/>
      </div>
    
      <p>{{ state.lesson.content }}</p>
      <div class="lesson__buttons">
         <a-button
           class="lesson__buttons-item">
           ⬅️ Назад
         </a-button>
         <a-button 
           class="lesson__buttons-item">
           Дальше ➡️
         </a-button>
      </div>
    </div>
  </div>
  
  <div class="actions">
    <div class="actions__buttons">
      <a-button 
       v-if="!lessonState?.progressStatus"
       @click="completeLesson"
       class="actions__buttons-item">
       🏁 Завершить
     </a-button>
     <a-button 
       v-else-if="lessonState?.progressStatus == 'complete'"
       class="actions__buttons-item">
       ✅ Завершено
     </a-button>
      <a-button 
        v-if="lessonState?.quiz"
        @click="$router.push({ 
          name: 'SkillQuizPage',
          params: {
            quiz: JSON.stringify(state.lesson.quiz)
          }
        })"
        type="primary" 
        class="actions__buttons-item">
        <template v-if="lessonState?.quiz?.progressStatus == 'complete'">
          ✅ Тест пройден
        </template>
        <template v-else>
          🧩 Пройти тест
        </template>
      </a-button>
    </div>
  </div> 
</div>
</template>


<script setup>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from '@/stores/UserStore.js'
import { lessons } from '@/server/fakedata/skill/Lessons.js'
import { allCourses } from '@/server/fakedata/skill/Courses.js'
import { message } from 'ant-design-vue';

const userStore = useUserStore()
const route = useRoute()
const state = reactive({
  id: null,
  lesson: {},
  course: {},
  module: {},
});

if (route.params?.id) { 
  state.lesson = lessons.find(x => x.id == route.params.id)
  state.id = state.lesson.id
  state.course = allCourses[1]
}

let lessonsState = userStore.user.startedLessons
if (!lessonsState.find(x => x.id == state.lesson.id)) {
  lessonsState.push(state.lesson)
}
let lessonState = lessonsState.find(x => x.id == state.lesson.id)

if (route.params?.lesson) {
  state.lesson = JSON.parse(route.params.lesson)
}

if (route.params?.course) {
  state.course = JSON.parse(route.params.course)
}
if (route.params?.module) {
  state.module = JSON.parse(route.params.module)
}

const completeLesson = () => {
  if (lessonState?.quiz && lessonState?.quiz.progressStatus != "complete") {
    message.error('Для завершения урока необходимо пройти тест')
  } else {
    lessonState.progressStatus = "complete"
    message.success('Урок успешно завершен')
  }
}
</script> 


<style scoped lang="scss">
.lesson {
  &__buttons {
    margin-top: 40px;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    &-item {
      width: 100%;
      height: 48px;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    position: fixed;
    width: 100%;
    top: 0;
    background-color: white;
    z-index: 100;
    & > div {
      display: flex;
      align-items: center;
      text-align: center;
    }
    &-text {
      font-weight: 600;
      font-size: 12px;
      overflow: hidden;
      text-align: center;
      height: auto;
      text-overflow: ellipsis;
      display: -moz-box;
      -moz-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      line-clamp: 1;
      box-orient: vertical;
      padding: 0 10px;
    }
    &-item:last-child {
      margin: 0 20px;
      height: 20px;
    }
  }
  &__content {
    padding: 20px 20px 100px 20px;
    margin-top: -10px;
    &-text {
      white-space: pre-wrap;
      word-wrap: break-word;
      background-color: white;
      padding: 20px;
      margin: -20px;
    }
  }
}

.actions {
  position: fixed;
  bottom: 88px;
  width: 100%;
  height: 40px;
  &__buttons {
    display: flex;
    justify-content: center;
    padding: 0 20px;
    &-item {
      margin: 0 5px;
      border: none;
      height: 48px;
      border-radius: 10px;
      box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 16px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>