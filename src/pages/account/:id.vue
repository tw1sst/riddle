<template>
<HeaderFunc 
  :actions="headerActions"
  :centerText="userStore.user.name" 
  :backRouteName="'SkillHome'" />

<div class="profile"> 
  <div class="profile__cover">
  
  </div>
  
  <div class="profile__avatar">
    <Avatar 
     :userName="userStore.user.name"
     :type="'onlyAvatar'"
     :size="100"
     :storiesPadding="7"
     :isShowStories="true"
     :imageUrl="'https://kartinki.pics/pics/uploads/posts/2022-09/1662642079_4-kartinkin-net-p-risunok-na-avatarku-dlya-muzhchin-instagra-4.jpg'"
     :border="'circle'"
    />
  </div>
  
  <div class="profile__info">
    <div class="profile__info-name">
      {{ userStore.user.name }}
    </div>
    <div class="profile__info-nickName">
      {{ userStore.user.nickName }}
    </div>
  </div>
  
</div>
</template>


<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/stores/UserStore.js'
import Avatar from '@/components/account/Avatar.vue'
import HeaderFunc from '@/components/account/HeaderFunc.vue'
import { BeakerIcon, AcademicCapIcon } from '@heroicons/vue/24/outline'

const userStore = useUserStore()
const state = reactive({
  
})

const headerActions = [
  {
    icon: "QrCodeIcon",
    actionName: "",
    routeName: "",
    params: {}
  },
  {
    icon: "ShareIcon",
    actionName: "",
    routeName: "",
    params: {}
  },
]

</script>


<style lang="scss" scoped>
.profile {
  padding: 20px;
  &__avatar {
    display: flex;
    justify-content: center;
  }
  &__info {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-name {
      font-size: 18px;
      font-weight: 600;
      display: inline-block;
    }
    &-nickName {
      color: #C5C5C5;
      font-size: 14px;
      line-height: 14px;
      display: inline-block;
    }
  }
}
</style>