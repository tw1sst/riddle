<template>
<HeaderFunc 
  :centerText="'Мессенджер'"
  :hideText="false"
  :backRouteName="'UserSchools'" />
  
<div class="chat">
  <a-input 
    :bordered="false"
    class="chat__search" 
    v-model:value="state.search" 
    placeholder="Поиск по чатам">
    <template #prefix>
      <MagnifyingGlassIcon class="chat__search-icon" />
    </template>
  </a-input>

  <div class="chat__categories">
    <a-tabs v-model:activeKey="state.activeCategotype">
      <a-tab-pane 
        class="services__categories-item"
        v-for="category in categories" 
        :key="category.id" 
        :tab="category.name" />
    </a-tabs>
  </div>
  
  <div class="chat__rooms">
    <div v-for="chat in userStore.user.chats" class="chat__rooms-item">
      <Chat :chat="chat" />
    </div>
  </div>
  
</div>
</template>


<script setup>
import { reactive } from "vue";
import HeaderFunc from '@/components/account/HeaderFunc.vue'
import Chat from '@/components/account/chats/Chat.vue'

import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore.js'
import { users } from '@/server/Users.js'

const userStore = useUserStore()
const router = useRouter()

const state = reactive({
  activeCategotype: 0,
  search: ""
})

userStore.user.chats.forEach(chat => {
  chat.user = users.find(x => x.id == chat.user_id)
})

const categories = [
  {
    id: null,
    name: ""
  },
  {
    id: 0,
    name: "🔍 Все"
  },
  {
    id: 1,
    name: "💻 Разработка"
  },
  {
    id: 2,
    name: "🇬🇧 Языки"
  },
  {
    id: 3,
    name: "🎨 Дизайн"
  },
  {
    id: 4,
    name: "👥 Маркетинг"
  },
  {
    id: 5,
    name: "💵 Финансы"
  },
  {
    id: 6,
    name: "💼 Бизнес"
  },
  {
    id: null,
    name: ""
  },
]

</script>


<style lang="scss" scoped>
.chat {
  padding: 0 20px;
  &__search {
    background-color: white;
    height: 36px;
    text-align: center;
  }
  &__categories {
    margin: 0 -30px;
  }
  &__rooms {
    margin: -17px -20px 0;
  }
}
</style>