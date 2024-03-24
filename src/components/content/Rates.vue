<template>
<div class="rates">
  <div class="rates__head">
    <div class="rates__head-left">
      <div class="rates__head-average">
        {{ state.totalRate }}
      </div>
      
      <a-rate disabled allow-half
        :tooltips="state.ratesCount"
        v-model:value="state.totalRate" />
      <p>
        {{ state.totalRate }} 
        (оценок: {{ props.reviews.length }})
      </p>
    </div>
    <div class="rates__head-right">
      <div class="rates__item" v-for="option in rateOptions">
        <span>{{ option }}</span>
        <a-progress 
          :percent="getRatesCount(option)" 
          :stroke-color="{
              '0%': 'lime',
              '100%': 'lime',
            }"
          :show-info="false" />
      </div> 
    </div>
  </div>
  <div class="rates__messages">
    <div v-for="review in props.reviews" class="rates__messages-item">
      <Avatar 
       :userName="review.user.name"
       :subText="review.date"
      />
      <div class="rates__messages-comment">
        {{ review.comment }}
      </div>
      
      <div class="rates__messages-rate">
        <a-rate disabled allow-half
          v-model:value="review.rate" />
      </div>
    </div>
  </div>
</div>
</template>


<script setup>
import { reactive } from "vue";
import Avatar from '@/components/account/Avatar.vue'

const props = defineProps({
  entity: Object,
  reviews: Array
});
const state = reactive({
  entity: {},
  totalRate: 0,
  ratesCount: 0
});

const rateOptions = [
  "5", "4", "3", "2", "1"
]

if (Object.keys(props.entity).length !== 0) {
  state.entity = props.entity
  
  state.totalRate = state.entity?.rate.stars
  state.ratesCount = state.entity?.rate.rates
}

const getRatesCount = (option) => {
  if (!props.reviews.length) return 0
  
  let optionReviews = props.reviews.filter(x => x?.rate == option).length
  
  return optionReviews / props.reviews.length * 100
}

let rate = 0
props.reviews.forEach(review => {
  rate += review.rate
})
state.totalRate = (rate / props.reviews.length).toFixed(1)

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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
  &__messages {
    margin-top: 20px;
    &-item {
      margin-bottom: 20px;
    }
    &-comment {
      margin-top: 5px;
    }
    &-rate {
      & * {
        font-size: 14px;
      }
    }
  }
}

</style>