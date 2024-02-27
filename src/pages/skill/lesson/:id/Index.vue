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
      {{ state.lesson.content }}
    </div>
  </div>
  
  <div class="actions">
    <div v-if="state.lesson.quiz" class="actions__buttons actions__buttons-quiz">
      <a-button class="actions__buttons-item">
        <span class="material-icons-round">arrow_back</span>
      </a-button>
      <a-button 
        @click="$router.push({ 
          name: 'SkillQuizPage',
          params: {
            quiz: JSON.stringify(state.lesson.quiz)
          }
        })"
        type="primary" 
        class="actions__buttons-item">
        <span class="material-icons-round">quiz</span>
        Пройти тест
      </a-button>
    </div>
    
    <div v-else class="actions__buttons">
      <a-button class="actions__buttons-item">
        <span class="material-icons-round">arrow_back</span>
      </a-button>
      <a-button class="actions__buttons-item">
        <span class="material-icons-round">arrow_forward</span>
      </a-button>
    </div>
  </div> 
</div>
</template>


<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { lessons } from '@/server/fakedata/skill/Lessons.js'
import { allCourses } from '@/server/fakedata/skill/Courses.js'

const route = useRoute()
const state = reactive({
  id: null,
  lesson: {},
  course: {},
  module: {}
});

state.lesson = lessons[1]
state.id = state.lesson.id
state.course = allCourses[1]

if (route.params?.lesson) {
  state.lesson = JSON.parse(route.params.lesson)
  state.id = route.params.id
}

if (route.params?.course) {
  state.course = JSON.parse(route.params.course)
}

if (route.params?.module) {
  state.module = JSON.parse(route.params.module)
}
</script> 


<style scoped lang="scss">
.lesson {
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
    padding: 20px 20px 80px 20px;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 20px;
    gap: 10px;
    &-quiz {
     grid-template-columns: auto 1fr;
    }
    &-item {
      border: none;
      height: 48px;
      border-radius: 10px;
      box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 16px;
      & > span {
        margin: 0 5px;
      }
    }
  }
}
</style>