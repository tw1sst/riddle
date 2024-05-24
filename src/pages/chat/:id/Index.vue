<template>
<HeaderFunc 
  :hideText="false"
  :backRouteName="'Chat'">
  
  <div class="chat__header">
    <Avatar 
     :userName="state.chat.user.name"
     :imageUrl="state.chat.user.avatar"
     :type="'onlyAvatar'"
     :size="30"
     :storiesPadding="2"
     :isShowStories="true"
     :border="'circle'"
    />
    <div class="chat__header-name">
      {{ state.chat.user.name }}
    </div>
  </div>
</HeaderFunc>
  
<div class="chat">
  <div class="chat__messages">
    <div 
      v-for="message in state.chat.messages" 
      class="chat__messages-row">
      <div 
      class="chat__messages-item"
      :class="message.from_user_id == userStore.user.id ? 'chat__messages-my' : 'chat__messages-other'">
        <p class="chat__messages-text">{{ message.text }}</p>
        <div class="chat__messages-date">
          {{ message?.date.split(' ')[1] }}
        </div>
      </div>
     
      
    </div>
  </div>
  
  <div class="chat__bottom">
    
  </div>
</div>
</template>


<script setup>
import { reactive } from "vue";
import HeaderFunc from '@/components/account/HeaderFunc.vue'
import Avatar from '@/components/account/Avatar.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore.js'
import { users } from '@/server/Users.js'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const state = reactive({
  chat: {}
})

state.chat = route.params?.chat
  ? JSON.parse(route.params.chat)
  : userStore.user.chats.find(x => x.id == route.params.id)

state.chat.user = users.find(x => x.id == state.chat.user_id)

</script>


<style lang="scss" scoped>
.chat {
  min-height: 1500px;
  padding: 10px;
  &__messages {
    &-row {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
    &-item {
      padding: 5px;
      display: inline-block;
      width: auto;
      max-width: 80%;
      align-items: end;
      juatify-content: end;
    }
    &-my {
      background-color: blue;
      color: white;
      margin-left: auto;
      border-radius: 10px 10px 5px 10px;
    }
    &-other {
      background-color: white;
      margin-left: 0;
      border-radius: 10px 10px 10px 5px;
    }
    &-text {
      margin-right: 10px;
    }
    &-date {
      font-size: 10px;
      color: #C5C5C5;
      text-align: right;
      margin: auto 0 0 auto;
    }
  }
  &__header {
    display: flex;
    align-items: center;
    &-name {
      margin-left: 10px;
    }
  }
  &__bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    min-height: 80px;
    width: 100%;
    background-color: white;
  }
}
</style>