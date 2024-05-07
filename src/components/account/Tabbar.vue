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
         <component 
           class="tabbar__item-icon"
           :is="item.icon">
          </component>
        <span class="tabbar__item-title">{{ item?.title }}</span>
     </li>
    </ul>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useUserStore } from '@/stores/UserStore.js'
import { HomeIcon, AcademicCapIcon, ChatBubbleOvalLeftIcon, Squares2X2Icon, UserCircleIcon } from '@heroicons/vue/24/outline'

const userStore = useUserStore()

const menuItems = ref([
  {
    title: "Главная",
    routeName: "UserSchools",
    icon: HomeIcon
  },
  {
    title: "Обучение",
    routeName: "SkillHome",
    icon: AcademicCapIcon
  },
  {
    title: "Сервисы",
    routeName: "Services",
    icon: Squares2X2Icon
  },
  {
    title: "Общение",
    routeName: "Chat",
    icon: ChatBubbleOvalLeftIcon
  },
  {
    title: "Профиль",
    routeName: "AccountProfile",
    params: {
      id: userStore.user.nickName
    },
    icon: UserCircleIcon
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
  padding: 10px 10px 20px 10px;
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
      height: 24px;
      width: 24px;
    }
    &-active {
      color: #3E68F8;
    }
  }
}
</style>