<template>
<div class="container" @click="state.isCardFlipped = !state.isCardFlipped">
  <div class="card" :class="state.isCardFlipped ? '' : 'flipped'">
    <div class="front">Click to flip</div>
    <div class="back">Yo, what up?</div>
  </div>
</div>
</template>


<script setup>
import { reactive } from "vue";
const props = defineProps({
  userAnswer: String,
  userAnswerStatus: String
})

const state = reactive({
  userAnswer: "",
  isCardFlipped: false
});

state.userAnswer = props.userAnswer
</script>


<style scoped>
.container {
  width: 300px;
  height: 200px;
  position: relative;
  perspective: 800px;
  border-radius: 4px;
}

.card {
	 width: 100%;
	 height: 100%;
	 position: absolute;
	 transform-style: preserve-3d;
	 transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	 border-radius: 6px;
	 box-shadow: 0 6px 16px rgba(0,0,0,0.15);
	 cursor: pointer;
}
 .card div {
	 position: absolute;
	 width: 100%;
	 height: 100%;
	 backface-visibility: hidden;
	 border-radius: 6px;
	 background: #fff;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 font: 16px/1.5 "Helvetica Neue", Helvetica, Arial, sans-serif;
	 font-smoothing: antialiased;
	 color: #47525d;
}
 .card .back {
	 transform: rotateY(180deg);
}
 .card.flipped {
	 transform: rotateY(180deg);
}
</style>