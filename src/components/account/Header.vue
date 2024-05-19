<template>
  <div class="header">
     <div class="header__account">
       <a-badge>
        <a-avatar 
          size="middle" 
          :src="logoImg" 
          shape="square">
        </a-avatar>
       </a-badge>
       <div class="header__account-info">
         <div class="header__account-msg">
            Riddle Verse
           </div>
       </div>
     </div>
    
     <PopupFullSelect 
      @togglePopup="togglePopup"
      :isShowPopup="state.isShowPopup">
     <div @click="togglePopup" class="header__actions">
        <div class="header__balance">
          <div>
            {{ userStore.user.riddleCoins }}
          </div>
          <span class="material-icons-round header__balance-icon">token</span>
        </div>
        <a-avatar 
          size="middle" 
          :src="userAvatar" 
          shape="square">
        </a-avatar>
     </div>
     </PopupFullSelect>
  </div>
  
  <div class="header__popup" v-if="false">
  <div class="header__popup-header">
      <Avatar 
       :userName="userStore.user.name"
       :subText="'Riddle Verse'"
      />
      <span @click="state.isShowPopup = !state.isShowPopup" class="material-icons-round header__popup-icon">close</span>
    </div>
    <div class="header__popup-menu">
      <div v-for="item in menuItems" 
        @click="$router.push({ name: item.routeName })"
        class="header__popup-item">
        <span class="material-icons-round header__popup-icon">{{ item.icon }}</span>
        <div class="header__popup-text">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
  
</template>


<script setup>
import { reactive } from "vue";
import { useUserStore } from '@/stores/UserStore.js'
import Avatar from '@/components/account/Avatar.vue'
import PopupFullSelect from '@/components/uikit/PopupFullSelect.vue'

const userStore = useUserStore()
const state = reactive({
  isShowPopup: false
})

const menuItems = [
  {
    title: "Настройки",
    icon: "settings",
    routeName: "AccountInventory",
  },
  {
    title: "Покупки",
    icon: "shop",
    routeName: "AccountInventory",
  },
  {
    title: "Инвентарь",
    icon: "shop",
    routeName: "AccountInventory",
  },
]

const userAvatar = "https://ui-avatars.com/api/?name=" + userStore.user.name + "&size=32&color=7F9CF5&background=EBF4FF"
let logoImg = "https://ui-avatars.com/api/?name=Riddle&size=32&color=FFFFFF&background=EFABFF"

logoImg = "https://i.ibb.co/BTTzpLt/F874-E38-B-2620-4-E93-9750-FB0-A25-A36-BA0.jpg"

const togglePopup = () => {
  state.isShowPopup = !state.isShowPopup
}
</script>


<style scoped lang="scss">
.header {
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 10;
  background-color: white;
  &__popup {
    width: 50%;
    border-radius: 10px;
    height: auto;
    background-color: white;
    position: absolute;
    top: 60px;
    right: 10px;
    z-index: 10;
    transition: 0.3s;
    box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
    &-header {
      border-bottom: 1px solid #f4f5f5;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    &-icon {
      color: #C5C5C5;
      font-size: 18px;
    }
    &-item {
      display: flex;
      padding: 10px;
      align-items: center;
      &:hover {
        background-color: #f4f5f5;
      }
    }
    &-text {
      margin-left: 10px;
      font-size: 14px;
    }
  }
  &__balance {
    display: flex;
    gap: 5px;
    align-items: center;
    border-radius: 5px;
    color: violet;
    font-weight: 600;
    margin-right: 10px;
    transition: 0.3s;
    font-size: 14px;
    &-icon {
      font-size: 18px;
      margin-left: 5px;
    }
  }
  &__account {
    display: flex;
    gap: 10px;
    align-items: center;
    &-info {
      display: flex;
      gap: 20px;
      padding-left: 10px;
      flex-direction: column;
      align-items: flex-start;
    }
    &-msg {
      font-weight: bold;
      font-size: 14px;
    }
  }
  
  &__actions {
    display: flex;
    align-items: center;
  }
}
</style>