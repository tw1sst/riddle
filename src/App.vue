<template>
  <div class="account">
    <Header 
      v-if="$route.name != 'MarketItem' &&
      $route.name != 'SkillQuizPage' &&
      $route.name != 'Services' &&
      $route.name != 'SkillCourseUserPanel' &&
      $route.name != 'ServiceKingdom' &&
      $route.name != 'SkillUserCourses'"
      
    />
      
    <router-view></router-view>
    
    <Tabbar 
      v-if="$route.name != 'SkillQuizPage'"/> 
  </div>
</template>


<script setup>
import Header from "@/components/account/Header.vue"
import Tabbar from "@/components/account/Tabbar.vue"    
</script>


<style lang="scss" scoped>

.account {
  margin: 60px 0 60px 0;
  box-sizing: border-box;
  max-width: 1000px;
}
</style>
