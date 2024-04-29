<template>
<div class="profile">
  <div class="profile__header">
    <div class="profile__header-title">
      Profile
    </div>
    <div class="profile__header-actions">
      •••
    </div>
  </div>
  
  <div class="profile__cover">
  
  </div>
  
  <div class="profile__avatar">
    <Avatar 
     :userName="userStore.user.name"
     :type="'onlyAvatar'"
     :size="80"
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

const userStore = useUserStore()
const state = reactive({
  
})

</script>


<style lang="scss" scoped>
.profile {
  padding: 0 20px;
  
  &__header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 46px;
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-title {
      font-size: 18px;
      font-weight: 600;
    }
    &-actions {
      
    }
  }
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