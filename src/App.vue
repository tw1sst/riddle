<template>
  <div class="app"> 
    <router-view></router-view>
    
    <Tabbar 
      v-if="shouldShowTabbar"
    /> 
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import Header from "@/components/account/Header.vue"
import Tabbar from "@/components/account/Tabbar.vue"    

const route = useRoute()
const shouldShowTabbar = computed(() => {
  const excludedRoutes = [
    'SkillQuizPage', 'ChatRoom'
  ]
  return !excludedRoutes.includes(route.name)
})
</script>


<style lang="scss" scoped>
.app {
  margin: 48px 0 60px 0;
  box-sizing: border-box;
}
</style>
