<template>
<div class="selectCorrect">
  <div class="selectCorrect__item"
    v-for="(option, key) in props.currentTask.data.options"
    :class="(state.answersArr.indexOf(option.id) == -1 ? '' : 'selectCorrect__item-active') 
    ||
    (props.currentTask.userAnswerStatus ? 'selectCorrect__item-disabled' : '')"
    
    @click="selectOption(option)">
    <div class="selectCorrect__item-num">
      {{ key + 1 }}
    </div>
    <div class="selectCorrect__item-title">
      {{ option.title }}
    </div>
  </div>
</div>
</template>


<script setup>
import { reactive } from "vue";

const $emit = defineEmits()
const props = defineProps({
  userAnswer: String,
  currentTask: Object
})

const state = reactive({
  userAnswer: "",
  answersArr: []
});

state.userAnswer = props.userAnswer
  
if (props.currentTask.userAnswer) {
  state.answersArr = props.currentTask.userAnswer.split(',').map(x => x = Number(x))
} else if (state.userAnswer) {
  state.answersArr = state.userAnswer.split(',').map(x => x = Number(x))
}

const selectOption = (option) => { 
  if (props.currentTask.userAnswerStatus) {
    return
  }

  if (state.answersArr.indexOf(option.id) != -1) {
    let itemIndex = state.answersArr.indexOf(option.id)
    state.answersArr.splice(itemIndex, 1)
  } else {
    state.answersArr.push(option.id)
  }
  state.answersArr.sort((a, b) => a - b)
  state.userAnswer = state.answersArr.join(',')
  
  console.log(state.userAnswer)
  $emit('updateTask', state.userAnswer)
}
</script>


<style scoped lang="scss">
.selectCorrect {
  display: flex;
  flex-direction: column;
  &__item {
    width: 100%;
    margin: 10px 0;
    padding: 10px 60px;
    height: auto;
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid #E7ECEF;
    border-radius: 10px;
    transition: 0.2s;
    &-num {
      position: absolute;
      left: 20px;
      top: 10px;
      border: 2px solid #E7ECEF;
      border-radius: 5px;
      width: 22px;
      height: 22px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      text-align: center;
      font-size: 12px;
    }
    &-active {
      border: 1px solid blue;
      color: blue;
    }
    &-title {
      text-align: center;
    }
    &-disabled {
      opacity: 0.5;
    }
  }
}
</style>