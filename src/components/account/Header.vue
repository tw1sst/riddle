<template>
  <div class="header">
     <div class="header__account">
       <a-badge>
        <a-avatar size="middle" :src="userAvatar" shape="square">
        </a-avatar>
       </a-badge>
    
       <div class="header__account-info">
         <div class="header__account-msg">
            Riddle Verse
           </div>
         <div class="header__account-name">
           {{ userStore.user.name }}
         </div>
       </div>
     </div>
     
     <div class="header__actions">
       <div class="header__actions-alerts">
         <span class="material-icons-round header__actions-alerts__icon">search</span>
         <span class="material-icons-round header__actions-alerts__icon">notifications_none</span>
       </div>
     </div>
  </div>
</template>


<script setup>
  import { useUserStore } from '@/stores/UserStore.js'

  const userStore = useUserStore()
  const userAvatar = "https://ui-avatars.com/api/?name=" + userStore.user.name + "&size=32&color=7F9CF5&background=EBF4FF"
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
  &__account {
    display: flex;
    gap: 20px;
    align-items: center;
    &-info {
      display: flex;
      gap: 20px;
      padding-left: 10px;
      flex-direction: column;
      align-items: flex-start;
    }
    &-msg {
      font-size: 10px;
      color: grey;
      line-height: 16px;
    }
    &-name {
      font-weight: bold;
      line-height: 16px;
      font-size: 14px;
    }
  }
  
  &__actions {
    display: flex;
    align-items: center;
    &-alerts {
      display: grid;
      gap: 10px;
      grid-template-columns: auto auto;
      &__icon {
        font-size: 24px;
      }
    }
  }
}
</style>