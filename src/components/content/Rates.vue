<template>
<div class="rates">
  <div class="rates__head">
    <div class="rates__head-left">
      <div class="rates__head-average">
        {{ state.course.rate.stars }}
      </div>
      
      <a-rate disabled allow-half
        :tooltips="state.course.rate"
        v-model:value="state.course.rate.stars" />
      <p>
        {{ state.course.rate.stars }} 
        ({{ state.course.rate.rates }} оценок)
      </p>
    </div>
    <div class="rates__head-right">
      <div class="rates__item" v-for="option in rateOptions">
        <span>{{ option }}</span>
        <a-progress :percent="50" 
          :stroke-color="{
              '0%': 'lime',
              '100%': 'lime',
            }"
          :show-info="false" />
      </div> 
    </div>
  </div>
  <div class="rates__messages">
  
  </div>
</div>
</template>


<script setup>
import { reactive } from "vue";
const props = defineProps({
  course: Object,
});
const state = reactive({
  course: {}
});

const rateOptions = [
  "5", "4", "3", "2", "1"
]

if (Object.keys(props.course).length !== 0) {
  state.course = props.course
}
</script>


<style scoped lang="scss">
.rates {
  &__head {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 40px;
    &-average {
      font-size: 28px !important;
      font-weight: 700;
    }
    &-left {
      margin-bottom: 10px;
      font-size: 12px;
      & * {
        font-size: 14px;
      }
      & p {
        font-size: 14px;
      }
    }
  }
  &__item {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    margin-top: -5px;
  }
}

</style>