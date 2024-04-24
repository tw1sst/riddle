<template>
  <div class="tabbar">
    <ul class="tabbar__menu">
       <li v-for="item of menuItems" 
         :class="$route.name == item?.routeName ? 'tabbar__item-active' : ''" 
         @click="$router.push({ name: item?.routeName })"
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

const menuItems = ref([
  {
    title: "Главная",
    routeName: "ContentHome",
    path: "/",
    icon: "home"
  },
  {
    title: "Обучение",
    routeName: "SkillHome",
    path: "/skill",
    icon: "school"
  },
  {
    title: "Сервисы",
    routeName: "Services",
    path: "/services",
    icon: "widgets"
  },
  {
    title: "Чат",
    routeName: "Chat",
    path: "/chat",
    icon: "mail"
  },
  {
    title: "Профиль",
    routeName: "Profile",
    path: "/profile",
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