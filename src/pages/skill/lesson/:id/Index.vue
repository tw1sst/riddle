<template>
<div class="lesson">
  <HeaderFunc 
    :centerText="state.lesson.title" 
    :backRouteName="'SkillCourseUserPanel'" 
    :routeParams="{
      id: state.course?.id,
      module: JSON.stringify(state.module),
    }"
  />
  
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
       v-if="lessonState.progressStatus == 'progress'"
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
import HeaderFunc from '@/components/account/HeaderFunc.vue'

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
  state.lesson.progressStatus = 'progress'
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
  &__content {
    padding: 20px 20px 100px 20px;
    margin-top: -12px;
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