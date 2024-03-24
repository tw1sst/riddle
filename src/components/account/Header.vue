<template>
  <div class="header">
     <div class="header__account">
       <a-badge>
        <a-avatar size="middle" :src="logoImg" shape="square">
        </a-avatar>
       </a-badge>
       <div class="header__account-info">
         <div class="header__account-msg">
            RiddleVerse
           </div>
       </div>
     </div>
     
     <div class="header__actions">
       <div class="header__balance">
          <div>
            {{ userStore.user.riddleCoins }}
          </div>
          <span class="material-icons-round header__balance-icon">token</span>
       </div>
       <a-avatar size="middle" :src="userAvatar" shape="square">
        </a-avatar>
     </div>
  </div>
</template>


<script setup>
  import { useUserStore } from '@/stores/UserStore.js'

  const userStore = useUserStore()
  const userAvatar = "https://ui-avatars.com/api/?name=" + userStore.user.name + "&size=32&color=7F9CF5&background=EBF4FF"
  const logoImg = "https://ui-avatars.com/api/?name=Riddle&size=32&color=FFFFFF&background=EFABFF"
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
  &__balance {
    display: grid;
    gap: 5px;
    grid-template-columns: 1fr auto; 
    border-radius: 5px;
    padding: 3px 10px;
    color: violet;
    font-weight: 600;
    margin-right: 5px;
    transition: 0.3s;
    &:hover {
      background-color: #f4f5f5;
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