<template>
<div ref="destination" 
  class="destination">
</div>
<div ref="origin" class="origin">
  <div v-for="word in props.currentTask.data.words" 
  :ref="'container-' + word.id"
  class="container">
    <a-button 
      :id="'word-' + word.id" 
      :ref="'word-' + word.id" 
  	  class="word">
	  {{ word.title }}
    </a-button>
  </div>
</div>
</template>


<script setup>
import { reactive, onMounted} from "vue";

const props = defineProps({
  currentTask: {}
})

const state = reactive({
  userAnswer: ""
})

onMounted(() => {
const destination = document.querySelector(".destination")
const origin = document.querySelector(".origin")
const words = origin.querySelectorAll(".word")

let isAnimating = false

const flip = (word, settings) => {
	const invert = {
		x: settings.first.left - settings.last.left,
		y: settings.first.top - settings.last.top
	}
	
	let animation = word.animate(
		[
			{ transform: `scale(1,1) translate(${invert.x}px, ${invert.y}px)` },
			{ transform: `scale(1,1) translate(0, 0)` }
		],
		{
			duration: 300,
			easing: "ease"
		}
	)
	animation.onfinish = () => (isAnimating = false);
}

const move = (word) => {
	const id = Math.random()
	const container = word.closest(".container")
	let rect = word.getBoundingClientRect()
	let first, last

	isAnimating = true

	container.dataset.id = id
	word.dataset.id = id
	
	container.style.height = `${word.offsetHeight}px`
	container.style.width = `${word.offsetWidth + 5}px`
	first = { top: rect.top, left: rect.left };
	destination.insertAdjacentElement("beforeend", word)
	rect = word.getBoundingClientRect()
	last = { top: rect.top, left: rect.left }
	flip(word, { first, last })
};

const putback = (word) => {
	const id = word.dataset.id
	const container = origin.querySelector(`[data-id="${id}"]`)
	const siblings = [...destination.querySelectorAll(".word")].filter(
		(sib) => sib !== word
	)
	let rect = word.getBoundingClientRect()
	let first, last

	isAnimating = true
	first = { top: rect.top, left: rect.left }
	siblings.forEach((sib) => {
		let rect = sib.getBoundingClientRect()
		sib.__first = { top: rect.top, left: rect.left }
	})

	container.insertAdjacentElement("beforeend", word)

	rect = word.getBoundingClientRect()
	last = { top: rect.top, left: rect.left } 
	siblings.forEach((sib) => {
		let rect = sib.getBoundingClientRect();
		sib.__last = { top: rect.top, left: rect.left }
	})

	flip(word, { first, last })

	siblings.forEach((sib) => flip(sib, { first: sib.__first, last: sib.__last }))
	container.style.height = ""
	container.style.width = ""
	container.removeAttribute("data-id")
	word.removeAttribute("data-id")
}

words.forEach((word) => {
	const event = () => {
		if (isAnimating) return
		word.closest(".container") ? move(word) : putback(word)
	}
	word.addEventListener("click", event) 
	})
})
</script>


<style scoped lang="scss">

.destination {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	margin-bottom: 60px;
	.word {
		margin: 5px;
	}
}
.origin {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: 0 auto;
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 0.5rem;
	margin: 5px;
	box-sizing: content-box;
	padding-bottom: 0.125rem;
	transition: 0.25s ease;
	background-color: #f4f5f5;
	&:empty {
		background-color: #f4f5f5;
	}
}
.word {
	&:active,
	&:focus {
		transition: 0.25s ease;
		transform: scale(1.05, 1.05) translateY(-0.25rem);
	}
}
</style>