<template>
<div class="page__stories">
  <Stories 
    v-if="state.isShowStories" 
    class="page__stories-opened" 
    @allStoriesEnd="toggleStory"
    @seeMore="openSeeMore"
    @storyStart="storyStart"
    :currentIndex="state.currentIndex"
    :style="{ background: 'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('+ state.selectedStory.url +') no-repeat center 100% / cover' }"
    :stories="state.stories">
    <template #header="{ story }">
      <div class="page__stories-header">
        <Avatar 
         :userName="story.header.authorName"
         :subText="'Вчера в 22:46'"
        />
      </div>
    </template>
    
    <template #default="attrs">
       <default-slide 
         :story="state.selectedStory"
         class="flex-grow">
       </default-slide>
    </template>
  </Stories>

  <div 
    v-for="(story, key) in state.stories"
    @click="toggleStory(story, key)"
    class="page__stories-item">      
    <div 
      v-if="!story.isView" 
      class="page__stories-status">
    </div>
    <img :src="story.url" class="page__stories-cover">
    <div class="page__stories-title">
      {{ story.title }}
    </div>
  </div>
</div>
</template>


<script setup>
import { reactive } from "vue";
import { useRouter } from 'vue-router'
import { Stories } from "vue-insta-stories"
import DefaultSlide from '@/components/content/stories/DefaultSlide.vue'
import Avatar from '@/components/account/Avatar.vue'

const router = useRouter()
const props = defineProps({
  stories: {
    type: Array,
  }
})
if (props.stories) {
  state.stories = props.stories
}

const state = reactive({
  selectedStory: {},
  stories: [],
  currentIndex: 0,
});

const toggleStory = (story, key) => {
  if (story) {
    storyStart(key)
    state.isShowStories = true
  } else {
    state.selectedStory = {}
    state.isShowStories = false
  }
}

const storyStart = (index) => {
  state.currentIndex = index
  state.stories.forEach(function(story, i) { 
    if (i == index) {
      story.isView = true
      state.selectedStory = story
    }
  })
}

const openSeeMore = (story) => {
  router.push({ name: 'ContentPostPage', 
    params: { 
       id: story.seeMore.postId,
       post: JSON.stringify(story.seeMore.post),
    } 
  })
} 
</script>


<style scoped lang="scss">
.page {
  &__stories {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
    padding: 4px 20px;
    margin: 0 -20px 20px -20px;
    box-sizing: content-box;
    overflow-x: auto;
    &-opened {
      position: absolute;
      height: 100vh;
      width: 100vw;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
    &-header {
      color: white;
      width: 100vw;
      margin: 0 -20px;
      padding: 0 20px;
      z-index: 110;
    }
    &-cover {
      width: 72px;
      height: 72px;
      object-fit: cover;
      border-radius: 10px;
    }
    &-title {
      font-size: 12px;
      line-height: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -moz-box;
      -moz-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      box-orient: vertical;
      margin-top: -30px;
      padding: 0 5px;
      color: white;
      font-weight: 600;
      text-shadow: 1px 1px 1px black, 0 0 4px black;
    }
    &-item {
      width: 72px;
      height: 72px;
      border-radius: 10px;
      margin-right: 10px;
      background-color: black;
      position: relative;
    }
    &-status {
      border: 2px solid blue;
      border-radius: 14px;
      width: 80px;
      height: 80px;
      position: absolute;
      top: -4px;
      left: -4px;
    }
  }
}
</style>