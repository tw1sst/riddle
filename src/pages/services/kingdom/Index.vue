<template>
<div class="kingdom">
  <div class="kingdom__header">
    🎓 Join School
    <span class="material-icons-round kingdom__header-icon">arrow_forward_ios</span>
  </div>
  
  <div class="kingdom__balance">
    <div class="kingdom__balance-count">
     🍀 {{ userStore.user.cleverCoins.toFixed(6) }}
    </div>
    <div class="kingdom__balance-bottom">
      <div class="kingdom__balance-item">
       🏅 Silver Legaue #193763
      </div>
      <div class="kingdom__balance-item">
        <span class="material-icons-round">
          reply
        </span>
      </div>
    </div>
  </div>
  
  <div class="kingdom__coin" 
    @click="clickCoin"
    :style="{ 
      background: 'url('+ state.coinImage +') no-repeat center 100% / cover' 
    }">
  </div>
   
  <div class="kingdom__actions">
    <div class="kingdom__power">
      <div class="kingdom__power-flex">
        <div class="kingdom__power-count">
          ⚡️{{ state.serviceStore.currentPower }} (+{{ state.serviceStore.powerSpeed }})
          <span class="kingdom__power-text">/ {{ state.serviceStore.maxPower }}</span>
        </div>
        <div class="kingdom__power-speed">
          + {{ state.serviceStore.tokensSpeed }}
          <span class="kingdom__power-text">в секунду</span>
        </div>
      </div>
      <a-progress :percent="powerStatePers" :show-info="false" />
    </div>
  
    <div class="kingdom__actions-grid">
      <div v-for="item in actions" class="kingdom__actions-item" @click="toggleShop">
        <span class="kingdom__actions-icon">{{ item.icon }}</span>
        <div class="kingdom__actions-text">
          {{ item.title }}
        </div>
      </div> 
    </div>
  </div>
  
  <Shop 
    :isShow="state.isShowShop"
    @toggleShow="toggleShop"/>
 
</div>
</template>


<script setup>
import { reactive, computed, watch } from "vue";
import { useUserStore } from '@/stores/UserStore.js'
import Shop from "@/components/services/kingdom/Shop.vue"
import { categories, userBoosts } from '@/server/fakedata/services/kingdom/Boosts.js'

const userStore = useUserStore()
const state = reactive({
  coinImage: "https://i.ibb.co/TYtSC9X/D4-E86912-3-AB0-4-F86-AE74-B4-F70-F9-F2-B5-C.png",
  serviceStore: {},
  isShowShop: false,
});

state.serviceStore = userStore.user.services.find(x => x.name == 'kingdom')

// считаем фарм буста с учетом уровня
const calcBoostFarm = (boost) => { 
  if (!boost?.lvl || boost.lvl == 0) return boost.farm.toFixed(6)
  return boost.farm * boost.lvl
  // ниже алгоритм вычисления фарма по процентам
  let calc = 0
  let iterateFarm = 0
  let pers = 300 
  
  iterateFarm = boost.farm
  for (let i = 0; i < boost.lvl; i++) { 
    calc = (iterateFarm / 100) * pers
    iterateFarm = calc + iterateFarm
  }
  return iterateFarm
}

// объединяем бусты с теми, которые уже купил юзер
categories.forEach(category => {
  if (category.boosts) {
    category.boosts.forEach(boost => {
      let findBoost = userBoosts.find(x => x.boost_id == boost.id)
      if (findBoost?.lvl) {
        boost.lvl = findBoost.lvl
      }
    })
  }
})
state.serviceStore.boosts = categories


let timeout
let timer_on = 0
function timedCount() {
  state.serviceStore.currentPower += state.serviceStore.powerSpeed
  timeout = setTimeout(timedCount, 1000)
}

function startCount() {
  if (!timer_on) {
    timer_on = 1
    state.serviceStore.currentPower += state.serviceStore.powerSpeed
  timeout = setTimeout(timedCount, 1000)
  }
}

function stopCount() {
  clearTimeout(timeout)
  timer_on = 0
}

const clickCoin = () => { 
  startCount()
  
  state.serviceStore.tapCount = 0.000001
  const tapBoosts = state.serviceStore.boosts.find(x => x.id == 'tapBoost') 
  tapBoosts.boosts.forEach(boost => {
    if (boost.lvl && boost.lvl != 1) {
      state.serviceStore.tapCount += calcBoostFarm(boost)
    }
  })

  state.serviceStore.currentPower--
  userStore.user.cleverCoins += state.serviceStore.tapCount
}

watch(
  () => state.serviceStore.currentPower,
  (count, prevCount) => {
    if (count > state.serviceStore.maxPower) {
      state.serviceStore.currentPower = state.serviceStore.maxPower 
    }
  }
)

const powerStatePers = computed(() => { 
  return (state.serviceStore.currentPower * 100) / state.serviceStore.maxPower
})

const toggleShop = () => {
  state.isShowShop = !state.isShowShop
}

let actions = [
  {
    title: "Друзья",
    icon: "👥",
    action: ""
  },
  {
    title: "Рейтинг",
    icon: "🏆",
    action: ""
  },
  {
    title: "Задания",
    icon: "📝",
    action: ""
  },
  {
    title: "Лавка",
    icon: "🛍",
    action: "toggleShop"
  },
]

</script>


<style lang="scss" scoped>

.kingdom {
  padding: 20px 20px 140px 20px;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  grid-template-rows: auto auto 1fr auto;
  position: absolute;
  gap: 0px;
  top: 0;
  left: 0;
  overflow: hidden;
  user-select: none;
  &__power {
    width: 100%; 
    &-flex {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    &-text {
      color: #C5C5C5;
    }
  } 
  &__header {
    background-color: white;
    border-radius: 10px;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 40px;
    &-icon {
      font-size: 18px;
      margin-left: 5px;
    }
  }
  &__coin {
    height: 250px;
    width: 250px;
    cursor: grab;
    border-radius: 50%;
    overflow: hidden;
    transform: rotate(45deg);
    background-size: cover;
    &:active {
      height: 280px;
      width: 280px;
    }
  }
  &__balance {
    text-align: center;
    &-count {
      font-size: 44px;
      font-weight: 700;
    }
    &-bottom {
      display: flex;
      justify-content: center;
    }
    &-item {
      background-color: white;
      border-radius: 20px;
      padding: 3px 10px;
      display: inline-block;
      box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
      color: #C5C5C5;
      font-size: 14px;
      display: grid;
      place-items: center;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
  &__actions {
    width: 100%;
    position: fixed;
    bottom: 80px;
    left: 0;
    padding: 0 20px;
    &-grid {
      user-select: none;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 10px;
    }
    &-item {
      background-color: white;
      border-radius: 10px;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 10px;
      box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
      backdrop-filter: blur(1px);
    }
    &-text {
      font-size: 12px;
    }
    &-icon {
      margin-bottom: 5px;
    }
  }
}

</style>