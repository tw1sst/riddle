<template>
<FloatingPanel 
  title="🛍 Лавка"
  :size="'100'"
  @toggleFloating="toggleFloating"
  :isShowFloating="props.isShow"> 
  <div class="shop">
    <img src="https://i.ibb.co/bFvRrWS/F6909-E9-E-BF32-4036-B935-22-D1-F9581932.png" class="shop__cover">
  
    <template v-for="category in categories">
      <template v-if="category?.apps">
        <div class="shop__headblock">
          <h4>{{ category.name }}</h4>
        </div>
        <div class="shop__blocks">
          <div v-for="chank in _.chunk(category.apps, 3)" class="shop__blocks-chank">
            <div v-for="item in chank"
              @click="clickItem(item)" 
              class="shop__blocks-item">
              
              <div class="shop__blocks-icon">{{ item.icon }}</div>
                
              <div class="shop__blocks-info">
                <div class="shop__blocks-title">
                  {{ item.title }}
                </div>
                <div class="shop__blocks-desc">
                  {{ item.desc }}
                </div>
              </div>
              <div class="shop__blocks-arrow">
                <span class="material-icons-round">arrow_forward_ios</span>
              </div>
            </div>
          </div>
          
        </div><br/>
      </template>
    </template>

  </div>
</FloatingPanel>

<Boosts 
  :isShow="state.isShowBoosts"
  @toggleShow="toggleBoosts"/>
  
</template>


<script setup>
import FloatingPanel from '@/components/uikit/FloatingPanel.vue'
import _ from 'lodash';
import Boosts from "@/components/services/kingdom/Boosts.vue"

const $emit = defineEmits()
import { reactive } from "vue";
const props = defineProps({
  isShow: Boolean
})

const state = reactive({
  isShowBoosts: false
});

const toggleFloating = () => {
  $emit('toggleShow')
}
const toggleBoosts = () => {
  toggleFloating()
  state.isShowBoosts = !state.isShowBoosts
}
const clickItem = (item) => {
  if (item?.routeName) {
    
  } else if (item.actionName == 'toggleBoosts') {
    toggleBoosts() 
  }
}

const categories = [
  {
    name: "🍀 $CLEVER",
    apps: [
      {
        title: "Посмотреть в кошельке",
        desc: "Следите за токеном прямо в своем кошельке Riddle Wallet",
        icon: "👛",
        routeName: "ServiceNewsSwipe"
      },
      {
        title: "Игровая зона",
        desc: "Играйте и соревнуйтесь в увлекательных мини-играх",
        icon: "🎰",
        routeName: "SkillHome"
      },
      {
        title: "Обмен",
        desc: "Обменивайте Riddle Coins на Клеверы и получайте бонусы",
        icon: "🔄",
        routeName: "ServiceWallet"
      }
    ]
  },
  {
    name: "📈 Прокачивайте свою ферму",
    apps: [
      {
        title: "Бусты",
        desc: "Прокачивайте свою ферму",
        icon: "🚀",
        actionName: "toggleBoosts"
      },
      {
        title: "Исследования",
        desc: "Исследуйте новые иехнологии",
        icon: "🎓",
        routeName: "SkillHome"
      },
      {
        title: "Очки рейтинга",
        desc: "Обменивайте Клеверы в очки рецтинга",
        icon: "🏆",
        routeName: "ServiceWallet"
      }
    ]
  },
]
</script>


<style scoped lang="scss">
.shop {
  margin: 0 -20px;
  padding-bottom: 40px;
  &__cover {
    width: 70%;
    height: 140px;
    object-fit: cover;
    margin: 0 auto;
    margin: -50px auto 20px auto;
  }
  &__blocks {
    gap: 10px;
    display: grid;
    grid-template-columns: repeat(5, 100%);
    gap: 10px;
    padding: 0 20px;
    box-sizing: content-box;
    overflow-x: auto;
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
      background-color: white;
      padding: 5px;
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
    &-desc {
      font-size: 12px;
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
      color: #C5C5C5;
      line-height: 16px;
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