<template>
  <div class="tabbar">
    <ul class="tabbar__menu">
       <li v-for="item of menuItems" 
         :class="$route.name == item?.routeName ? 'tabbar__item-active' : ''" 
         @click="$router.push({ 
           name: item?.routeName, 
           params: item?.params
         })"
         class="tabbar__item">
        <span class="material-icons-round tabbar__item-icon">
          {{ item?.icon }}
        </span>
        <span class="tabbar__item-title">{{ item?.title }}</span>
     </li>
    </ul>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useUserStore } from '@/stores/UserStore.js'
const userStore = useUserStore()

const menuItems = ref([
  {
    title: "Главная",
    routeName: "ContentHome",
    icon: "home"
  },
  {
    title: "Обучение",
    routeName: "SkillHome",
    icon: "school"
  },
  {
    title: "Сервисы",
    routeName: "Services",
    icon: "widgets"
  },
  {
    title: "Чат",
    routeName: "Chat",
    icon: "mail"
  },
  {
    title: "Профиль",
    routeName: "AccountProfile",
    params: {
      id: userStore.user.nickName
    },
    icon: "account_circle"
  }
])
</script>


<style scoped lang="scss">
.tabbar {
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    padding-bottom: 15px;
    width: 100%;
    border-top: 1px solid #f6f6f6;
    padding-top: 10px;
    z-index: 50;
    &__menu {
        list-style: none;
        display: flex;
        justify-content: space-around;
        height: 100%;
    }
    &__item {
        color: #C5C5C5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
        &-title {
          font-size: 12px;
        }
        &-icon {
          font-size: 26px;
        }
        &-active {
          color: #3E68F8;
        }
    }
}
</style>