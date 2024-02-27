<template>
<div class="quiz">
  <div class="quiz__header">
    <div class="quiz__header-close">
      <span @click="$router.push({ name: 'SkillLessonPage' })" class="material-icons-round">close</span>
    </div>
    <div class="quiz__header-progress">
      <a-progress :percent="answeredTasksPers" :show-info="false" />
    </div>
    <div class="quiz__header-actions">
      <div>
        <span class="material-icons-round">more_horiz</span>
      </div>
      <div>
        <span class="material-icons-round">bookmark_border</span>
      </div>
    </div>
  </div>
  
  <div class="quiz__content" v-if="state.isResult">
    <a-result
      v-if="getPersProgress >= state.quiz.minPers"
      status="success"
      title="Тест успешно завершен"
      sub-title="Вы успешно закончили прохождение теста. Сейчас вы можете ознакомиться со своими результатами"
    >
    </a-result>
    <a-result
      v-else
      status="error"
      title="Тест не завершен"
      :sub-title="'Вы не набрали минимальный процент правильных ответов. Попробуйте пройти тест еще раз. Ваш прогресс: ' + getPersProgress + '%. Необходимый прогресс: ' + state.quiz.minPers + '%'"
    >
    </a-result>
    
    <div class="quiz__result">
      <div class="quiz__result-left">
        <div class="quiz__result-item">
          <div class="quiz__result-text">
            <span class="quiz__result-success material-icons-round">sentiment_satisfied</span>
           Правильно:
          </div>
          <div>
            {{ state.quiz.tasks.filter(x => x.userAnswerStatus == 'success').length }}
          </div>
        </div>
        <div class="quiz__result-item">
          <div class="quiz__result-text">
            <span class="quiz__result-wrong material-icons-round">mood_bad</span>
            Неправильно: 
          </div>
          <div>
            {{ state.quiz.tasks.filter(x => x.userAnswerStatus == 'wrong').length }}
          </div>
        </div>
      </div>
      <div class="quiz__result-right">
        <div>Итог:</div>
        <div>
          {{ getPersProgress }}%
        </div>
      </div>
    </div>
    
    <div class="quiz__resultProgress">
      <div v-for="task in state.quiz.tasks" 
        :class="task.userAnswerStatus ==  'wrong' ? 'quiz__resultProgress-wrong' : '' ||
        task.userAnswerStatus ==  'success' ? 'quiz__resultProgress-success' : ''"
        class="quiz__resultProgress-item">
      
      </div>
    </div>
  </div>
  
  <div v-else class="quiz__content">
  	<div class="quiz__task-header">
    	<h2 class="quiz__task-title">{{ state.currentTask.title }}</h2>
        <p class="quiz__task-subTitle">{{ state.currentTask.subTitle }}</p>
    </div>
    
    <SimpleQuest 
      v-if="state.currentTask.type == 'simpleQuest'" 
      :userAnswerStatus="state.currentTask.userAnswerStatus"
      @updateTask="updateTask"
      :userAnswer="state.currentTask.userAnswer || state.userAnswer" />
    
    <SelectOrder 
      v-else-if="state.currentTask.type == 'correctOrder'"
      :currentTask="state.currentTask"/>
    <SelectCorrect
      v-else-if="state.currentTask.type == 'selectCorrect'"
      @updateTask="updateTask"
      :userAnswer="state.currentTask.userAnswer || state.userAnswer"
      :currentTask="state.currentTask"/>
      
    <br/>
	<div class="quiz__alert">
	  <a-alert v-if="state.currentTask.userAnswerStatus == 'success'"
        :description="state.currentTask.correctAnswerDesc"
		 message="Задание пройдено" 
		 type="success" show-icon />
	  <a-alert v-if="state.currentTask.userAnswerStatus == 'wrong'"
	     :description="state.currentTask.inCorrectAnswerDesc"
		 message="Задание не пройдено" 
		 type="error" show-icon />
    </div>
  </div>

  <div v-if="!state.isResult" class="quiz__bottom">
    <div class="quiz__buttons"> 
      <a-button 
        v-if="state.currentTask.index > 1 && state.currentTask?.userAnswerStatus != 'wrong'"
        @click="goPreTask()"
        class="quiz__buttons-item">
        Назад
      </a-button>
    
      <a-button 
        v-if="state.currentTask?.userAnswerStatus == 'success'"
        type="primary" 
        @click="goNextTask()"
        class="quiz__buttons-item">
        Далее
      </a-button>
      
      <a-button 
        v-else-if="state.currentTask?.userAnswerStatus == 'wrong'"
        @click="clearUserAnswer()"
        class="quiz__buttons-item">
        Попробовать еще раз
      </a-button>
      
      <a-button 
        v-else
        type="primary" 
        @click="answerTheQuest()"
        class="quiz__buttons-item">
        Проверить
      </a-button>
      
      <a-button 
        v-if="state.currentTask?.userAnswerStatus == 'wrong' && !state.currentTask.required"
        type="primary" 
        @click="goNextTask()"
        class="quiz__buttons-item">
        Далее
      </a-button>
    </div>
  </div>
 
  <div v-else class="quiz__bottom">
    <div class="quiz__buttons"> 
      <a-button 
        @click="goPreTask()"
        class="quiz__buttons-item">
        Назад
      </a-button>
      <a-button
        :disabled="getPersProgress <= state.quiz.minPers"
        type="primary"
        @click="goPreTask()"
        class="quiz__buttons-item">
        Завершить
      </a-button>
    </div>
  </div>
</div>
</template>


<script setup>
import { reactive, computed, ref, onMounted} from "vue";
import { useRoute } from "vue-router";
import { lessons } from '@/server/fakedata/skill/Lessons.js'
import { message } from 'ant-design-vue';

import SimpleQuest from '@/components/skill/tasks/SimpleQuest.vue'
import SelectOrder from '@/components/skill/tasks/SelectOrder.vue'
import SelectCorrect from '@/components/skill/tasks/SelectCorrect.vue'

const route = useRoute()
const state = reactive({
  id: null,
  quiz: {},
  currentTask: {},
  userAnswer: "",
  isResult: false
});

state.quiz = lessons[1].quiz
state.id = state.quiz.id

if (route.params?.quiz) {
  state.quiz = JSON.parse(route.params.quiz)
  state.id = route.params.id
}

if (state.quiz.tasks) {
  state.currentTask = state.quiz.tasks[0]
}

const updateTask = (userAnswer) => {
	state.userAnswer = userAnswer
}

const goNextTask = () => {
  if (state.currentTask.index < state.quiz.tasks.length) {
    state.currentTask = state.quiz.tasks.find(x => x.index == state.currentTask.index + 1)
    state.userAnswer = ""
  } else {
    state.isResult = true
  }
}

const goPreTask = () => {
  if (state.isResult) {
    state.isResult = false
    return
  }
  if (state.currentTask.index > 1) {
    state.currentTask = state.quiz.tasks.find(x => x.index == state.currentTask.index - 1)
    state.userAnswer = ""
  }
}

const clearUserAnswer = () => {
  delete state.currentTask.userAnswer
  delete state.currentTask.userAnswerStatus
  state.userAnswer = ""
}

// процент ответов
const answeredTasksPers = computed(() => { 
  if (state.isResult) return 100
  // ищем индекс текущего задания
  return ((state.currentTask.index - 1) / state.quiz.tasks.length) * 100
})

// процент правильных ответов
const getPersProgress = computed(() => { 
  let successCount = state.quiz.tasks.filter(x => x.userAnswerStatus == 'success').length
  return (successCount / state.quiz.tasks.length) * 100
})


// ответ юзера на задание
const answerTheQuest = () => {
	if (state.currentTask.type == 'correctOrder') {
	  	const destination = document.querySelector(".destination")
	  	let words = destination.querySelectorAll(".word")
	  	state.userAnswer = ""
	  	words.forEach(word => {
	  		let wordId = word.id.split("-")[1]
	  		state.userAnswer = state.userAnswer.concat(wordId + ",")
	  	})
	  	state.userAnswer = state.userAnswer.slice(0, -1)
  	} else if (state.currentTask.type == 'selectCorrect') {
  	 //
  	}
  
    if (state.currentTask.answer == state.userAnswer) { 
      var audio = new Audio('https://audio-previews.elements.envatousercontent.com/files/123673967/preview.mp3')
      // audio.play()
      
      message.success({
        content: () => 'Вы ответили верно',
        style: {
          marginTop: '30px'
        },
      })
      state.currentTask.userAnswer = state.userAnswer
      state.currentTask.userAnswerStatus = 'success'
    } else {
      // если задание обязательное, не даем возможность перейти к следующему
      var audio = new Audio('https://audio-previews.elements.envatousercontent.com/files/315386177/preview.mp3')
      // audio.play()
      
      message.error({
        content: () => 'Вы ответили неправильный',
        style: {
          marginTop: '30px'
        },
      })
      state.currentTask.userAnswerStatus = 'wrong'
      if (!state.currentTask.required) {
        state.currentTask.userAnswer = state.userAnswer
      }
    }
 }
</script>


<style scoped lang="scss">
.quiz {
  height: 100%;
  padding: 60px 0;
  background-color: #fff; 
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &__resultProgress {
    display: flex;
    background-color: #fff;
    height: 10px;
    margin-top: 20px;
    &-item {
      background-color: #f4f5f5;
      height: 5px;
      width: 100%;
      border-radius: 10px;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
    &-wrong {
      background-color: #ff5f3c;
    }
    &-success {
      background-color: lime;
    }
  }
  &__result {
   display: grid;
   grid-template-columns: 1fr auto;
   background-color: #f4f5f5;
   padding: 20px 40px;
   border-radius: 10px;
   &-text {
     margin-right: 5px;
     display: flex;
     align-items: center;
   }
   &-wrong {
     margin-right: 10px;
     color: #ff5f3c;
   }
   &-success {
     margin-right: 10px;
     color: lime;
   }
   &-left {
     display: grid;
     gap: 10px;
     grid-template-rows: 1fr 1fr;
   }
   &-right {
     display: flex;
     justify-content: center;
     text-align: center;
     flex-direction: column;
   }
   &-item {
     display: flex;
   }
  }
  &__alert {
  	text-align: left;
  }
  &__task {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-subTitle {
      color: #C5C5C5;
    }
    &-header {
      margin-bottom: 40px;
    }
  }
  &__header {
    position: fixed;
    height: 50px;
    width: 100%;
    top: 0;
    background-color: white;
    z-index: 100;
    padding: 0 20px;
    display: flex;
    align-items: center;
    display: grid;
    grid-template-columns: auto 1fr auto;
    color: #C5C5C5;
    font-weight: 600;
    &-progress {
      margin: 0 20px;
    }
    &-actions {
      display: grid;
      grid-template-columns: auto auto;
      gap: 20px;
    }
  }
  &__content {
    width: 100%;
    background-color: white;
    padding: 20px;
    text-align: center;
  }
  &__bottom {
    position: fixed;
    bottom: 60px;
    width: 100%;
    height: 40px;
    z-index: 99;
  }
  &__buttons {
    display: flex;
    padding: 0 20px;
    gap: 10px;
    &-item {
      border: none;
      height: 48px;
      border-radius: 10px;
      width: 48px;
      box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 0 10px;
      & > span {
        margin-left: 5px;
      }
    }
  }
}
</style>