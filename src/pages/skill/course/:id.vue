<template>
<div class="course">
  <div class="course__header">
    <div class="course__header-left">
      <span @click="$router.push({ 
          name: 'SkillHome' 
        })" 
        class="material-icons-round course__header-item">arrow_back_ios</span>
    </div>
    <div class="course__header-center">
      <div class="course__header-text">
        {{ state.course.name }}
      </div>
    </div>
    <div class="course__header-right">
      <span class="material-icons-round course__header-item">ios_share</span>
       <span class="material-icons-round course__header-item">bookmark_border</span>
    </div>
  </div>
  
  <div class="course__head">
    <Avatar 
     :userName="'Riddle School'"
     :subText="'Новая форма обучения'"
    />
    <div class="course__header-right">
      <span class="material-icons-round">more_horiz</span>
    </div>
  </div>
  
  <div class="course__cover">
    <img :src="state.course.cover">
  </div>

  <div class="course__content">
    <h2 class="course__content-title">{{ state.course.name }}</h2>
    <span class="course__content-badge">Разработка</span>
    
    <div class="course__rate">
      <a-rate disabled allow-half
        :tooltips="state.course.rate"
        v-model:value="state.course.rate.stars" />
      <span>
        {{ state.course.rate.stars }} 
        ({{ state.course.rate.rates }})
      </span>
    </div>
   
    <div class="course__content-tags">
      <template v-for="tag in state.course.tags">
        <div class="course__content-tag">
          / {{ tag }}
        </div>
      </template>
    </div>
    
    <div class="course__baseinfo"> 
      <div v-for="item in state.baseInfoItems" class="course__baseinfo-item">
        <span class="material-icons-round course__baseinfo-icon">
          {{ item.icon }}
        </span>
        <div class="course__baseinfo-count">
          {{ item.count }}
        </div>
        <div class="course__baseinfo-text">
          {{ item.title }}
        </div>
      </div>
    </div> 
  </div>
  
  <div v-if="state.course.modules.length" class="course__content">
    <h3 class="course__content-title">Модули курса</h3>
     
     <div class="course__content-desc">
       <a-steps :current="-1">
        <a-step v-for="module in state.course.modules"
          @click="moduleClick(module)">
          <template #icon>
            <span v-if="checkLessonsComplete(module)">
              ✅
            </span>
            <span v-else-if="module?.paid?.enable == true">
             💸
            </span>
            <span v-else>
              📚
            </span>
          </template>
          <template #title>
            <span>{{ module.title }}</span>
          </template>
          <template #description>
            <p>{{ module.description }}</p>
            <button v-if="module?.paid?.enable == true" class="course__buy-button">
              <div>Купить модуль за {{ module.paid.price_tokens }}</div>
              <span class="material-icons-round course__buy-icon">token</span>
            </button>
          </template>
          <template v-if="module?.lessons?.length" #subTitle>
            <span>Уроков: {{ module?.lessons?.length }} </span>
          </template>
        </a-step>
      </a-steps>
    </div>
  </div>
 
  <div class="course__content">
    <h3 class="course__content-title">Прогресс курса</h3>
    <div class="course__progress">
      <div class="course__progress-left">
        <div class="course__progress-item">
          <div class="course__progress-badge">
            {{ lessonsComplete }}/{{ lessonsCount }}
          </div>
          <div class="course__progress-text">
            Уроков пройдено
          </div>
        </div>
        <div class="course__progress-item">
          <div class="course__progress-badge course__progress-badge2">
            {{ quizComplete }}/{{ quizCount }}
          </div>
          <div class="course__progress-text">
            Заданий выполнено
          </div>
        </div>
        <div class="course__progress-item">
          <div class="course__progress-badge course__progress-badge3">
            {{ tasksComplete }}/{{ tasksCount }}
          </div>
          <div class="course__progress-text">
            Вопросов пройдено
          </div>
        </div>
      </div>
      <div class="course__progress-right">
        <div v-if="lessonsComplete == lessonsCount && 
        quizComplete == quizCount && 
        tasksComplete == tasksCount && 
        lessonsComplete != 0" 
        class="course__progress-centerText">
          ✅
        </div>
         <div v-else class="course__progress-centerText">
          ⏳
        </div>
        <a-progress 
          class="course__progress-circle1" 
          :percent="lessonsComplete / lessonsCount * 100 || 1" 
          type="circle"
          :stroke-color="{
            '0%': 'violet',
            '100%': 'violet',
          }"
          :size="130" />
        <a-progress 
          class="course__progress-circle2" 
          :percent="quizComplete / quizCount * 100 || 1" 
          type="circle"
          :stroke-color="{
            '0%': 'pink',
            '100%': 'pink',
          }"
          :size="108" />
        <a-progress 
          class="course__progress-circle3" 
          :percent="tasksComplete / tasksCount * 100 || 1" 
          type="circle" 
          :stroke-color="{
            '0%': 'lime',
            '100%': 'lime',
          }"
          :size="88" />
      </div>
    </div>
  </div>
  
  <a-tabs v-model:activeKey="state.activeTabKey" class="course__tabs">
    <a-tab-pane 
      class="course__tabs-item"
      v-for="tab in tabs" 
      :key="tab.id" 
      :tab="tab.name" />
  </a-tabs>
  <div v-if="state.activeTabKey == 1" class="course__content">
    <h3 class="course__content-title">Описание</h3>
    <div class="course__content-desc">
      {{ state.course.desc }}
    </div>
  </div>
  
  <div v-else-if="state.activeTabKey == 3" class="course__content">
    <Rates 
     v-if="state.course?.reviews"
     :entity="state.course"
     :reviews="state.course?.reviews"
    />
  </div>
    
  <ActionsBar 
   @moduleClick="moduleClick"
   :course="state.course" /> 
  
  <FloatingPanel 
    v-if="state.isShowFloating"
    title="Выберите урок"
    @toggleFloating="toggleFloating"
    :isShowFloating="state.isShowFloating"> 
    <a-steps class="course__lessons" :current="-1">
      <a-step 
        @click="$router.push({ 
          name: 'SkillLessonPage', 
          params: { 
            id: lesson.id, 
            lesson: JSON.stringify(lesson),
            course: JSON.stringify(state.course),
            module: JSON.stringify(state.currentModule),
          }})"
        v-for="lesson in state.currentModule?.lessons">
          <template #icon>
            <span v-if="lessonsState.find(x => x.id == lesson.id)?.progressStatus == 'complete'">✅</span>
            <span v-else-if="lessonsState.find(x => x.id == lesson.id)">⏳</span>
            <span v-else>🔥</span>
          </template>
        <template #title>
          <span>{{ lesson.title }}</span>
        </template>
        <template #description>
          <span>{{ lesson.description }}</span>
        </template>
        <template v-if="lesson.quiz" #subTitle>
          <div class="course__lessons-sub">
            📝 В уроке есть тест
          </div>
        </template>
      </a-step>
    </a-steps>
  </FloatingPanel>
</div>
</template>


<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import Avatar from '@/components/account/Avatar.vue'
import ActionsBar from '@/components/skill/ActionsBar.vue'
import { allCourses } from '@/server/fakedata/skill/Courses.js'
import FloatingPanel from '@/components/uikit/FloatingPanel.vue'
import { useUserStore } from '@/stores/UserStore.js'
import Rates from '@/components/content/Rates.vue'

const userStore = useUserStore()
const route = useRoute()
const state = reactive({
  id: null,
  course: {},
  baseInfoItems: [],
  currentModule: {},
  isShowFloating: false,
  activeTabKey: 1
});

state.course = allCourses.find(x => x.id == route.params.id)
state.id = state.course.id

if (route.params?.course) {
  state.course = JSON.parse(route.params.course)
  state.id = route.params.id
}

let lessonsState = userStore.user.startedLessons
let lessonsCount = 0
let lessonsComplete = 0

let quizCount = 0
let quizComplete = 0

let tasksCount = 0
let tasksComplete = 0

state.course?.modules.forEach(module => {
  lessonsCount += module?.lessons?.length || 0
  
  if (module?.lessons) {
    module?.lessons.forEach(lesson => {
      let lessonProgress = lessonsState.find(x => x.id == lesson.id)
      
      if (lesson?.quiz?.tasks) {
        quizCount++
        if (lessonProgress?.progressStatus == 'complete') quizComplete++
        
        lesson?.quiz?.tasks.forEach(task => {
          tasksCount++
          let taskProgress = lessonProgress?.quiz?.tasks.find(x => x.id == task.id)
          
          if (taskProgress?.userAnswerStatus == 'success') tasksComplete++
        })
      }
    })
  }
})

lessonsComplete = lessonsState.filter(lesson => lesson.progressStatus == 'complete').length || 0

const tabs = [
  {
    id: 1,
    name: "Описание"
  },
  {
    id: 2,
    name: "Видео"
  },
  {
    id: 3,
    name: "Отзывы"
  },
  {
    id: 4,
    name: "Сертификаты"
  },
  {
    id: 5,
    name: "Обсуждение"
  },
]

state.baseInfoItems = [
  {
    title: "Время прохождения",
    icon: "schedule",
    count: state?.course.duration
  },
  {
    title: "Модулей в курсе",
    icon: "calendar_view_month",
    count: state.course.modules.length
  },
  {
    title: "Уроков в курсе",
    icon: "menu_book",
    count: lessonsCount
  },
  {
    title: "Рейтинг курса",
    icon: "star_border",
    count: state?.course.rate.stars
  },
]

const checkLessonsComplete = (module) => {
  if (!module.lessons) return false
  
  let num = 0
  module?.lessons.forEach(lesson => {
    if (lessonsState.find(x => x.id == lesson.id)?.progressStatus == 'complete') {
     num++
    }
  })
  if (num == module.lessons.length) return true
}

const toggleFloating = () => {
  state.isShowFloating = !state.isShowFloating
}

const moduleClick = (module) => {
  state.currentModule = module
  toggleFloating()
}

if (route.params?.module) {
  moduleClick(JSON.parse(route.params.module))  
}
</script>


<style lang="scss" scoped>  
.course {
  margin-bottom: 40px;
  padding-bottom: 80px;
  &__buy {
    margin-top: 10px;
    &-button {
      border: none;
      background: none;
      display: flex;
      align-items: center;
      color: violet;
      font-weight: 600;
      padding: 0;
    }
    &-icon {
     margin-left: 5px;
    }
  }
  &__rate {
    margin-bottom: 10px;
    font-size: 12px;
    & * {
      font-size: 16px;
    }
    & span {
      font-size: 14px;
      margin-left: 5px;
    }
  }
  &__progress {
    display: grid;
    grid-template-columns: 1fr auto;
    margin-top: 10px;
    &-right {
      position: relative;
    }
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    &-badge {
      padding: 3px 5px;
      border-radius: 10px;
      background-color: violet;
      font-weight: 600;
      display: inline-block;
      color: white;
      margin-right: 10px;
      min-width: 60px;
      text-align: center;
    }
    &-badge2 { background-color: pink; }
    &-badge3 { background-color: lime; }
    &-text {
      font-size: 12px;
      line-height: 14px;
      max-width: 100px;
    }
    &-centerText {
      position: absolute;
      left: 55px;
      top: 55px;
    }
    &-circle2 {
      position: absolute;
      left: 11px;
      top: 11px;
    }
    &-circle3 {
      position: absolute;
      left: 21px;
      top: 21px;
    }
  }
  &__tabs {
    border-radius: 10px 10px 0 0;
    background-color: white;
    padding: 0 20px;
  }
  &__lessons {
    &-sub {
      display: flex;
      align-items: center;
    }
  }
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: white;
    margin-top: -10px;
    &-left {
      display: flex;
      align-items: center;
    }
    &-name {
      font-weight: 600;
    }
    &-date {
      font-size: 12px;
      color: #C5C5C5;
    }
    &-avatar {
      border-radius: 5px;
      margin-right: 10px;
      height: 34px;
      width: 34px;
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
  &__baseinfo {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    text-align: center;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 10px;
    &-count {
     padding: 10px 0;
     font-weight: 600;
    }
    &-text {
     font-size: 12px;
     color: #C5C5C5;
     font-weight: 600;
    }
    &-icon {
     color: #C5C5C5;
    }
    &-item {
      margin: 10px 0;
      padding: 0 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &:not(:last-child) {
        border-right: 1px solid #fff;
      }
    }
  }
  &__content {
    padding: 20px;
    border-radius: 20px;
    background-color: white;
    margin-bottom: 20px;
    &-tag {
      margin-right: 10px;
      display: inline-block;
      color: #C5C5C5;
    }
    &-title {
      margin: 0 5px 5px 0;
      display: inline-block;
    }
    &-badge {
      background-color: #3E68F8;
      padding: 5px 10px;
      border-radius: 10px;
      color: white;
      font-size: 12px;
      vertical-align: top;
      font-weight: 600;
      margin: 5px;
      display: inline-block;
    }
    &-desc {
      margin-top: 10px;
    }
  }
}
</style>