<template>
<div class="course">
  <HeaderFunc 
    :centerText="state.course.name" 
    :backRouteName="'SkillUserCourses'"
  />
  
  <div class="course__group">
    <div class="course__group-title">
      Прогресс курса
    </div>
    <div class="course__group-block">
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
  </div>
  
  <div class="course__group">
    <div class="course__trick">
      <div class="course__trick-days">
        <div v-for="day in days" class="course__trick-item">
          <div 
            :class="day.isTrick ? 'course__trick-tricked' : ''"
            class="course__trick-day" >
            {{ day.title }}
          </div>
          <div 
            v-if="day.isCurrentDay"
            class="course__trick-current">🔺</div>
        </div>
      </div>
      
      <div class="course__trick-blocks">
        <div v-for="trick in trickItems" class="course__trick-block">
          <div class="course__trick-title">
            {{ trick.title }}
          </div>
          <div class="course__trick-mainText">
            {{ trick.mainText }}
          </div>
          <div class="course__trick-subText">
            {{ trick.subText }}
          </div>
        </div>
      </div><br/>
      
      <ProgressSteps 
        :steps="20" 
        :activeSteps="2" 
        :size="80">
      </ProgressSteps>
      
    </div>
  </div>
  
  <div class="course__group">
    <div class="course__group-title">
      Интервальное повторение
    </div>
    <div class="course__group-block">
      <div v-for="item in itemsGroup1"
          @click="$router.push({ 
            name: item.routeName, 
            params: item.routeParams 
          })"
          class="course__group-item">
        <div class="course__group-icon">{{ item.icon }}</div>
        <div class="course__group-info">
          <div class="course__group-name">
            {{ item.title }}
          </div>
          <div class="course__group-desc">
           {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="course__group">
    <div class="course__group-title">
      Модули курса
    </div>
    <div class="course__group-itemRow">
      <a-collapse 
        v-for="module in state.course.modules"
        v-model:activeKey="state.activeModule"
        ghost :bordered="false">
        <template 
          #expandIcon="{ isActive }">
          <span 
            class="course__steps-icon"
            :class="isActive ? 'course__steps-iconRotate' : ''">🔷</span>
        </template>
        <a-collapse-panel 
          :key="module.id"
          style="border-bottom: 1px solid #efeff3; white-space: pre-wrap;" 
          
          :header="module.title + '\n' + module.description">
          <a-steps 
            class="course__steps" 
            v-if="module.lessons" 
            :current="-1" 
            progress-dot 
            :direction="'vertical'">
            <a-step v-for="lesson in module.lessons" @click="$router.push({ 
              name: 'SkillLessonPage', 
              params: { 
                id: lesson.id, 
                lesson: JSON.stringify(lesson),
                course: JSON.stringify(state.course),
                module: JSON.stringify(module),
              }})">
              
              <template #title>
                <span>{{ lesson.title }}</span>
              </template>
              <template #description>
                <p>{{ lesson.description }}</p>
              </template>
              <template v-if="lesson.quiz" #subTitle>
                <div class="course__lessons-sub">
                  📝 В уроке есть тест
                </div>
              </template>
            </a-step>
          </a-steps>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</div>
</template>


<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import Avatar from '@/components/account/Avatar.vue'
import HeaderFunc from '@/components/account/HeaderFunc.vue'
import { allCourses } from '@/server/fakedata/skill/Courses.js'
import FloatingPanel from '@/components/uikit/FloatingPanel.vue'
import ProgressSteps from '@/components/uikit/ProgressSteps.vue'
import { useUserStore } from '@/stores/UserStore.js'

const userStore = useUserStore()
const route = useRoute()
const state = reactive({
  id: null,
  course: {},
  activeModule: null
});

if (route.params?.id) {
  state.id = route.params.id
  state.course = allCourses.find(x => x.id == route.params.id)
}

if (route.params?.module) {
  state.activeModule = JSON.parse(route.params.module).id
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

const days = [
  {
    id: 1,
    title: "Пн",
  },
  {
    id: 2,
    title: "Вт",
    isTrick: true
  },
  {
    id: 3,
    title: "Ср",
  },
  {
    id: 4,
    title: "Чт",
  },
  {
    id: 5,
    title: "Пт",
  },
  {
    id: 6,
    title: "Сб",
  },
  {
    id: 0,
    title: "Вс",
  },
]

days.find(x => x.id == new Date().getDay()).isCurrentDay = true

const itemsGroup1 = [
  {
     id: 1,
     title: "Прохождение уроков",
     description: "Освойте новый материал, или повторите уже пройденный",
     icon: "📚",
     routeName: "",
     actionName: ""
  },
  {
     id: 2,
     title: "Прохождение тестов",
     description: "Начните проходить тесты для закрепления материала",
     icon: "📝",
     routeName: "",
     actionName: ""
  },
  {
     id: 3,
     title: "Страница на маркете",
     description: "Посмотрите на курс со страницы маркета",
     icon: "🛍",
     routeName: "SkillCoursePage",
     routeParams: {
       id: state.course.id, 
       course: JSON.stringify(state.course)
     },
     actionName: ""
  },
]

const trickItems = [
  {
    title: "Вы учитесь",
    mainText: "1",
    subText: "день"
  },
  {
    title: "Рекорд",
    mainText: "3",
    subText: "дня"
  },
  
]

</script>


<style lang="scss" scoped>  
.course {
  padding-bottom: 40px;
  &__trick {
    background-color: white;
    border-radius: 10px;
    padding: 10px 20px;
    &-blocks {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    &-block {
      background-color: #efeff3;
      border-radius: 10px;
      padding: 5px 10px;
    }
    &-title {
      
    }
    &-mainText {
      font-weight: 600;
      display: inline-block;
    }
    &-subText {
      color: #999998;
      display: inline-block;
      margin-left: 10px;
    }
    &-days {
      display: flex;
      justify-content: space-between;
    }
    &-item {
      text-align: center;
    }
    &-day {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid #ededee;
      display: flex;
      align-items: center;
      font-size: 12px;
      justify-content: center;
    }
    &-tricked {
      border: 2px solid #b1c1fe;
      background-color: #b1c1fe;
      color: white;
    }
  }
  &__group {
    margin: 20px;
    &-title {
      color: #98989d;
      margin: 0 0 5px 20px;
    }
    &-block {
      background-color: white;
      border-radius: 10px;
      padding: 10px 20px;
    }
    &-itemRow {
      background-color: white;
      border-radius: 10px;
      padding: 0 10px;
    }
    &-item {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 20px;
      padding: 10px 0;
      &:not(:last-child) {
        padding: 10px 0;
        border-bottom: 1px solid #efeff3;
        border-radius: 10px 10px 0 0;
      }
      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
    &-icon {
      color: #6386ff;
    }
    &-desc {
      font-size: 12px;
      color: #999998;
    }
  }
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
  &__steps {
    margin-left: 5px;
    &-icon {
      transition: 0.2s;
    }
    &-iconRotate {
      transform: rotate(90deg);
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
}
</style>