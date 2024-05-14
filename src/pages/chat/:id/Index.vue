<template>
<HeaderFunc 
  :hideText="false"
  :backRouteName="'Chat'">
  
  <div v-if="state.chat.type == 'bot'" class="chat__header">
    <Avatar 
     :userName="state.chat.bot.name"
     :type="'onlyAvatar'"
     :size="30"
     :storiesPadding="2"
     :isShowStories="true"
     :border="'circle'"
    />
    <div class="chat__header-name">
      {{ state.chat.bot.name }}
    </div>
  </div>
</HeaderFunc>
  
<div class="chat">
  chat
</div>
</template>


<script setup>
import { reactive } from "vue";
import HeaderFunc from '@/components/account/HeaderFunc.vue'
import Avatar from '@/components/account/Avatar.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore.js'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const state = reactive({
  chat: {}
})

if (route.params?.chat) {
  state.chat = JSON.parse(route.params.chat)
} else {
  state.chat = userStore.user.chats.find(x => x.id == route.params.id)
}

</script>


<style lang="scss" scoped>
.chat {
  min-height: 1000px;
  &__header {
    display: flex;
    align-items: center;
    &-name {
      margin-left: 10px;
    }
  }
}
</style>