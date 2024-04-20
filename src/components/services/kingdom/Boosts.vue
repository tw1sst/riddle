<template>
<FloatingPanel 
  title="🚀 Бусты"
  :size="'100'"
  @toggleFloating="toggleFloating"
  :isShowFloating="props.isShow"> 
  <div class="boosts"> 
    <template v-for="category in state.serviceStore.boosts">
    
<template v-if="category?.boosts">
  <div class="boosts__headblock">
    <h4>{{ category.name }}</h4>
  </div>
  <div class="boosts__blocks">
    <div v-for="chank in _.chunk(category.boosts, 6)" class="boosts__blocks-chank">
      <div v-for="boost in chank" 
        @click="buyBoost(boost)"
        :class="!boost.lvl || boost.lvl == 0 ? 'boosts__blocks-disabled' : ''"
        class="boosts__blocks-item">
        <template v-if="!isPreBoostBuy(boost)">
        <div class="boosts__blocks-icon">🔒</div>
          
        <div class="boosts__blocks-info">
          <div class="boosts__blocks-title">??????????</div>
          <div 
          class="boosts__blocks-price">
            🍀 ??????????
            <span class="boosts__blocks-lvl"> • 0 ур.</span>
          </div>
        </div>
        <div class="boosts__blocks-arrow">
          <span class="material-icons-round">arrow_forward_ios</span>
        </div>
        </template>
        <template v-else>        
        
        <div class="boosts__blocks-icon">{{ boost.icon }}</div>
          
        <div class="boosts__blocks-info">
          <div class="boosts__blocks-title">
            {{ boost.title }}
          </div>
          <div 
          class="boosts__blocks-price"
          :class="userStore.user.cleverCoins >= calcBoostPrice(boost) ? 'boosts__blocks-canbuy' : ''">
            🍀 {{ calcBoostPrice(boost) }} 
            <span class="boosts__blocks-lvl"> • {{ boost?.lvl || 0 }} ур.</span>
          </div>
        </div>
        <div class="boosts__blocks-arrow">
          <span class="material-icons-round">arrow_forward_ios</span>
        </div>
        </template>
      </div> 
    </div>
    
  </div><br/>
</template>

    </template>

  </div>
</FloatingPanel>
</template>


<script setup>
import FloatingPanel from '@/components/uikit/FloatingPanel.vue'
import _ from 'lodash';
import { useUserStore } from '@/stores/UserStore.js'
import { categories } from '@/server/fakedata/services/kingdom/Boosts.js'
import { message } from 'ant-design-vue';

const userStore = useUserStore()
const $emit = defineEmits()
import { reactive } from "vue";
const props = defineProps({
  isShow: Boolean
})

const state = reactive({
  serviceStore: {}
});

state.serviceStore = userStore.user.services.find(x => x.name == "kingdom")

const calcBoostPrice = (boost) => {
  let calc = 0
  let iteratePrice = 0
  let pers = 100
  
  if (boost.lvl == 0) return boost.startPrice.toFixed(6)
  
  iteratePrice = boost.startPrice
  for (let i = 0; i < boost.lvl; i++) { 
    calc = (iteratePrice / 100) * pers
    iteratePrice = calc + iteratePrice
  }
  
  return iteratePrice.toFixed(6)
}

// если предыдущий буст куплен, то показываем текущий, иначе скрываем

const tapBoosts = state.serviceStore.boosts.find(x => x.id == 'tapBoost')

const isPreBoostBuy = (boost) => {
  if (boost.id == 1) return boost
  
  let preBoost = {}
  if (preBoost = tapBoosts.boosts.find(x => x.id == boost.id - 1)) { 
    if (preBoost.lvl > 0) return boost
  } 
  return false
}

const buyBoost = (boost) => {
  if (!isPreBoostBuy(boost)) {
    message.error({
      content: () => 'Предыдущий буст не куплен',
    })
    return
  }
  
  let boostPrice = calcBoostPrice(boost)
  if (userStore.user.cleverCoins >= boostPrice) {
    if (!boost.lvl) boost.lvl = 1
    else boost.lvl++
    
    userStore.user.cleverCoins -= boostPrice
    
    message.success({
      content: () => 'Буст ' + boost.title + ' куплен',
    })
  } else {
    message.error({
      content: () => 'Недостаточно средств',
    })
  }
}

const toggleFloating = () => {
  $emit('toggleShow')
}
</script>


<style scoped lang="scss">
.boosts {
  margin: 0 -20px;
  padding-bottom: 40px;
  margin-top: -40px;
  &__blocks {
    gap: 10px;
    display: grid;
    grid-template-columns: repeat(5, 80%);
    gap: 10px;
    padding: 0 20px;
    box-sizing: content-box;
    overflow-x: auto;
    &-disabled {
      opacity: 0.7;
    }
    &-lvl {
      font-size: 14px;
      color: #C5C5C5;
    }
    &-chank {
      border-radius: 10px;
      width: 100%;
      overflow: hidden;
    }
    &-item {
      background-color: white;
      display: grid;
      grid-template-columns: auto 1fr auto;
      padding: 10px;
      border-bottom: 1px solid white;
      &:last-child {
        border-radius: 0 0 10px 10px;
        border-bottom: 1px solid #f4f5f5;
      }
    }
    &-arrow {
      display: flex;
      align-items: center;
      color: #C5C5C5;
      & span {
        font-size: 16px;
      }
    }
    &-icon {
      font-size: 22px;
      background-color: #efeff3;
      width: 42px;
      height: 42px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #EFABFF;
    }
    &-title {
      font-size: 12px;
      color: black;
      font-weight: 600;
      margin-left: 10px;
    }
    &-price {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -moz-box;
      -moz-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      box-orient: vertical;
      margin-left: 10px;
      color: #fe443a;
      line-height: 16px;
      margin-top: 5px;
      font-weight: 600;
    }
    &-canbuy {
      color: #7bff99;
    }
  }
  &__headblock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 10px 20px;
    & a {
     font-size: 12px;
    }
  }
}
</style>