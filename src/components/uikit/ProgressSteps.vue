<template>
<div class="progress">
  <a-progress
    v-if="(props.steps > 20) ||
    props.steps == 1"
    type="circle"
    :stroke-color="'#3ca8e3'"
    :trailColor="'none'"
    :percent="100"
    :strokeWidth="4"
    :size="props.size"
    class="progress__step"
  /> 
    
  <template v-else v-for="step in props.steps">
    <a-progress
      v-if="step <= props.activeSteps"
      type="circle"
      :stroke-color="'#3ca8e3'"
      :style="{ 
        'transform': 'rotate('+ calcStepRotate(step) +')'
      }"
      :trailColor="'none'"
      :percent="state.percents"
      :strokeWidth="4"
      :size="props.size"
      class="progress__step"
    /> 
    <a-progress
      v-else
      type="circle"
      :stroke-color="'#d8d7e1'"
      :style="{ 
        'transform': 'rotate('+ calcStepRotate(step) +')'
      }"
      :trailColor="'none'"
      :percent="state.percents"
      :size="props.size"
      :strokeWidth="4"
      class="progress__step"
    /> 
  </template>
    
  <div class="progress__content" :style="{ 
        'height': props.size + 'px',
        'padding': props.padding + 'px',
        'width': props.size + 'px'
      }">
    <div class="progress__content-item">
      <slot />
    </div>
  </div>
  
</div>
</template>


<script setup>
import { reactive, watch } from "vue";
const $emit = defineEmits()
const props = defineProps({
  steps: Number,
  activeSteps: Number,
  size: Number,
  padding: Number
})
const state = reactive({
  percents: 0
})

state.percents = (100 / props.steps) - 4

const calcStepRotate = (step) => {
  let rotate = 5
  let rotateNum = 360 / props.steps
  for (let i = step; i < props.steps; i++) {
    rotate += rotateNum
  }
  return rotate + 'deg'
}

</script>


<style scoped lang="scss">

.progress {
  position: relative;
  &__content {
    display: flex;
    align-items: center;
    justify-contents: center;
    &-item {
      overflow: hidden;
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
  &__step {
    position: absolute;
  }
}
</style>