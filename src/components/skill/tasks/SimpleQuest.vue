<template>
 <a-textarea
   :value="props.userAnswer"
   v-model:value="state.userAnswer"
   :rows="4" 
   @change="$emit('updateTask', state.userAnswer)"
   :disabled="props.userAnswerStatus"
   placeholder="Введите ответ.." 
   :maxlength="200" /><br/>
</template>


<script setup>
import { reactive } from "vue";
const props = defineProps({
  userAnswer: String,
  userAnswerStatus: String
})

const state = reactive({
  userAnswer: ""
});

state.userAnswer = props.userAnswer
</script>