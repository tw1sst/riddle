<template>
<div v-if="state.post?.title" class="post">
  <HeaderFunc 
    :centerText="state.post.title" 
    :backRouteName="'ContentHome'" 
  />
  
  <div class="post__component">
    <Post 
      :post="state.post" 
      :type="'full'"/>
  </div>
</div>
</template>


<script setup>
import HeaderFunc from '@/components/account/HeaderFunc.vue'
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { allPosts } from '@/server/fakedata/content/Posts.js'
import Post from "@/components/content/Post.vue"

const route = useRoute()
const state = reactive({
  post: {}
})

state.post = route.params?.post
  ? JSON.parse(route.params.post)
  : allPosts.find(x => x.id == route.params.id)

</script>


<style scoped lang="scss">
.post {
  padding-bottom: 20px;
  &__component {
    margin: 0 -10px;
  }
}
</style>