<template>
<div class="inventory__search">
  <a-input 
    class="inventory__search-input" 
    v-model:value="state.search" 
    placeholder="Название предмета">
    <template #prefix>
      <span class="inventory__search-searchIcon material-icons-round">search</span>
    </template>
  </a-input>
</div>
    
<div class="inventory">
   <h2>🎒 Инвентарь</h2>
   
    <div class="inventory__blocks">
      <div v-for="chank in _.chunk(services, 2)" class="inventory__blocks-chank">
        <div v-for="item in chank" 
          @click="selectService(item.id)"
          :class="state.selectedServiceId == item.id ? 'inventory__blocks-active' : ''"
          class="inventory__blocks-item">
          <div class="inventory__blocks-icon"><span class="material-icons-round">{{ item.icon }}</span>
          </div> 
          <div class="inventory__blocks-info">
            <div class="inventory__blocks-title">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div><br/>
    
    <h3>Ваши предметы</h3>
    <div class="inventory__items">
      <div v-for="item in userItems" 
         @click="toggleItemModal(item)"
         class="inventory__item">
           <img :src="item.image" class="inventory__item-image">
           <div class="inventory__item-title">
             {{ item.name }}
           </div>
         </div>
       </div>
    </div>

<FloatingPanel 
  v-if="state.isShowItemModal"
  :title="state.selectedItem.name"
  @toggleFloating="toggleItemModal"
  :isShowFloating="state.isShowItemModal">
  <div class="item">
    <img class="item__image" :src="state.selectedItem.image">
    
    <div class="item__title">{{ state.selectedItem.name }}</div>
    
    <Avatar 
     :userName="state.selectedItem.school.name"
     :subText="'Riddle Verse'"
    />
    
    <div class="item__desc">{{ state.selectedItem.desc }}</div>
    
  </div>
</FloatingPanel>
</template>


<script setup>
import { reactive } from "vue";
import { useUserStore } from '@/stores/UserStore.js'
import FloatingPanel from '@/components/uikit/FloatingPanel.vue'
import Avatar from '@/components/account/Avatar.vue'
import _ from 'lodash';

const userStore = useUserStore()
const state = reactive({
  isShowItemModal: false,
  selectedItem: {},
  selectedServiceId: "",
  school: "Все",
  search: ""
})

const toggleItemModal = (item) => {
  state.selectedItem = item
  state.isShowItemModal = !state.isShowItemModal
}

const selectService = (itemId) => {
  state.selectedServiceId = itemId
}

const userItems = [
  {
    id: 1,
    name: "Скидка 5%",
    desc: "Промокод на скидку 10%",
    service: "skill", // сервис к которому привязан предмет
    school_id: 1, // id школы
    holder_id: 1, // id текущего держателя
    created_buy: 1, // кем создан
    image: "https://static.vecteezy.com/system/resources/previews/028/754/700/original/3d-purple-promo-code-discount-coupon-and-voucher-icon-for-ui-ux-web-mobile-apps-social-media-ads-designs-png.png"
  },
  {
    id: 2,
    name: "Скидка 15%",
    desc: "Промокод на скидку 10%",
    service: "skill", // сервис к которому привязан предмет
    school_id: 1, // id школы
    holder_id: 1, // id текущего держателя
    created_buy: 1, // кем создан
    image: "https://static.vecteezy.com/system/resources/previews/028/754/700/original/3d-purple-promo-code-discount-coupon-and-voucher-icon-for-ui-ux-web-mobile-apps-social-media-ads-designs-png.png",
    school: {
      name: "Riddle School"
    }
  },
  {
    id: 3,
    name: "Скидка 20%",
    desc: "Промокод на скидку 10%",
    service: "skill", // сервис к которому привязан предмет
    school_id: 1, // id школы
    holder_id: 1, // id текущего держателя
    created_buy: 1, // кем создан
    image: "https://static.vecteezy.com/system/resources/previews/028/754/700/original/3d-purple-promo-code-discount-coupon-and-voucher-icon-for-ui-ux-web-mobile-apps-social-media-ads-designs-png.png",
    school: {
      name: "Riddle School"
    }
  },
  {
    id: 4,
    name: "Скидка 10%",
    desc: "Промокод на скидку 10%",
    service: "skill", // сервис к которому привязан предмет
    school_id: 1, // id школы
    holder_id: 1, // id текущего держателя
    created_buy: 1, // кем создан
    image: "https://static.vecteezy.com/system/resources/previews/028/754/700/original/3d-purple-promo-code-discount-coupon-and-voucher-icon-for-ui-ux-web-mobile-apps-social-media-ads-designs-png.png",
    school: {
      name: "Riddle School"
    }
  },
]

const services = [
  {
    id: 4,
    title: "Riddle Skill",
    desc: "Обучайтесь новому, совершенствуйте свои навыки, тренируйтесь",
    icon: "school",
    routeName: "SkillHome",
  },
  {
    id: 8,
    title: "Riddle Fit",
    desc: "Тренировки и спорт как смысл жизни",
    icon: "fitness_center",
    routeName: "ServiceFit",
  },
  {
    id: 7,
    title: "Riddle Blooms",
    desc: "Маркетплейс поларков на любой вкус. Цветы, соадости, мягкие игрушки и авторские букеты",
    icon: "local_florist",
    routeName: "ServiceBlooms",
  },
  {
    id: 6,
    title: "Riddle Castle",
    desc: "Карты, баттлы и сражения",
    icon: "castle", // hive
    routeName: "ServiceCastle",
  },
  {
    id: 3,
    title: "Riddle Motors",
    desc: "Автомобильный маркетплейс",
    icon: "directions_car",
    routeName: "AutoMarket",
  },
]
</script>


<style scoped lang="scss">
.item {
  padding-bottom: 60px;
  &__image {
    max-height: 200px;
    margin: 0 auto;
  }
  &__title {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  &__desc {
    margin-top: 20px;
  }
}

.inventory {
  padding: 60px 20px;
  &__blocks {
    gap: 10px;
    display: grid;
    grid-template-columns: repeat(5, 150px);
    gap: 10px;
    padding: 0 20px;
    margin: 10px -20px 0 -20px;
    box-sizing: content-box;
    overflow-x: auto;
    &-chank {
      border-radius: 10px;
      width: 100%;
    }
    &-item {
      background-color: white;
      display: flex;
      align-items: center;
      padding: 5px;
      margin-bottom: 10px;
      border-radius: 10px;
      border: 1px solid white;
      transition: 0.2s;
    }
    &-active {
      border: 1px solid blue;
      border-radius: 10px;
    }
    &-icon {
      font-size: 16px;
      background-color: white;
      padding: 12px;
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
    }
  }
  &__search {
    background-color: white;
    padding: 10px 20px;
    position: fixed;
    top: 45px;
    left: 0;
    width: 100%;
  }
  &__items {
    margin-top: 20px;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  &__item {
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
    padding: 10px;
    &-image {
      border-radius: 10px;
    }
    &-title {
      font-size: 14px;
      word-break: break-word;
    }
  }
}
</style>