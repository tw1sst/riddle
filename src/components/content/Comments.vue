<template>
<div class="comments">
  <div class="comments__title">
    Комментарии ({{ state.post.comments.length }})
  </div>
  
  <div class="comments__new">
    <a-textarea
      class="comments__new-form"
      placeholder="Оставить комментарий" 
      v-model:value="state.newComment"
      :maxlength="200" 
      :auto-size="{ minRows: 1, maxRows: 4 }"
    />
    
    <a-button @click="setNewComment()" type="primary" class="comments__new-send">
      <PaperAirplaneIcon />
    </a-button>
  </div>
  
  <div v-if="state.repliedComment" class="comments__replied">
    <div class="comments__replied-left">
      <span class="material-icons-round">reply</span>
    </div>
    <div class="comments__item">
      <div class="comments__item-header">
        <Avatar 
          :userName="state.repliedComment.user.name"
          :subText="dateConvert(state.repliedComment.date)"
        />
        <span @click="state.repliedComment = null" class="material-icons-round">close</span>
      </div>
      <div class="comments__replied-content">
        {{ state.repliedComment.text }}
      </div>
    </div>
  </div>
  
  <div class="comments__list">
    <div class="comments__item"
      v-for="comment in state.post.comments">
      <div class="comments__item-header">
        <Avatar 
          :userName="comment.user.name"
          :subText="dateConvert(comment.date)"
          :size="32"
        />
        <span class="material-icons-round">more_horiz</span>
      </div>
      
      <div v-html="setReplied(comment)" class="comments__item-content">
      </div>
      
      <div class="comments__item-bottom">
        <div @click="state.repliedComment = comment" class="comments__item-reply">
          <ArrowUturnLeftIcon style="height: 18px; margin-right: 5px;"/>
          Ответить
        </div>
        <div class="comments__item-actions">
        <HandThumbDownIcon @click="userReaction(comment.id, 'down')" 
           :class="comment.userReaction == 'down' ? 'comments__item-reaction' : 'comments__item-react'" />
           {{ comment.ups - comment.downs }}
        <HandThumbUpIcon @click="userReaction(comment.id, 'up')" 
            :class="comment.userReaction == 'up' ? 'comments__item-reaction' : 'comments__item-react'" />
            
        </div>
      </div>
    </div>
  </div> 
</div>
</template>


<script setup>
import { reactive } from "vue";
import { message } from 'ant-design-vue';
import Avatar from '@/components/account/Avatar.vue'
import { useUserStore } from '@/stores/UserStore.js'
import { HandThumbUpIcon, HandThumbDownIcon, ArrowUturnLeftIcon, EllipsisHorizontalIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'

const userStore = useUserStore()
const props = defineProps({
  post: Object,
});

const state = reactive({
  post: {},
  newComment: '',
  repliedComment: null
});

const setReplied = (comment) => {
  if (comment.parent_id) {
    let parentComment = state.post.comments.find(x => x.id == comment.parent_id)
    
    if (parentComment) {
      return `<a href="/">${parentComment.user.name}</a>, ` + comment.text
    }
  }
  return comment.text
}

const setNewComment = () => {
  let d = new Date()
  let dateFormat = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  
  let newComment = {
    id: state.post.comments.length + 1,
    text: state.newComment,
    user: userStore.user,
    date: dateFormat,
    parent_id: state.repliedComment?.id ? state.repliedComment.id : null,
    ups: 0,
    downs: 0
  }
  
  state.post.comments.push(newComment)
  state.newComment = ""
  state.repliedComment = null
  state.post.comments.sort((a, b) => b.id - a.id)
  message.success('Комментарий добавлен')
}

const userReaction = (commentId, type) => {
  let comment = state.post.comments.find(x => x.id == commentId)
  if (comment) {
    // ставим реакцию
    if (type == 'up' && comment.userReaction != 'up') {
      if (comment.userReaction == 'down') {
        comment.userReaction = 'up'
        comment.ups += 2
      } else {
        comment.userReaction = 'up'
        comment.ups++
      }
    } else if (type == 'down' && comment.userReaction != 'down') {
      if (comment.userReaction == 'up') {
        comment.userReaction = 'down'
        comment.downs += 2
      } else {
        comment.userReaction = 'down'
        comment.downs++
      }
    }
    
    // убираем реакцию
    else if (type == 'up' && comment.userReaction == 'up') {
      comment.userReaction = ""
      comment.ups--
    } else if (type == 'down' && comment.userReaction == 'down') {
      comment.userReaction = ""
      comment.downs--
    }
  }
}

if (Object.keys(props.post).length !== 0) {
  state.post = props.post
}

const dateConvert = (date) => {
  let dates = new Date() 
  let sDt = dates.getDate()
  let sDm = dates.getMonth() + 1
  let sDy = dates.getFullYear()

  let cDate     = date.split(' ')[0]
  let jDate     = cDate.split('-')[2]
  let jMonth    = cDate.split('-')[1]
  let jTime     = date.split(' ')[1]
  let jTimeThis = Number(sDt) - Number(1)
  let jYear     = cDate.split('-')[0]
  let jMont     = ""
  
  if(jMonth == '01'){jMont = 'Января'}  
  if(jMonth == '02'){jMont = 'Февраля'}  
  if(jMonth == '03'){jMont = 'Марта'}  
  if(jMonth == '04'){jMont = 'Апреля'}  
  if(jMonth == '05'){jMont = 'Мая'}  
  if(jMonth == '06'){jMont = 'Июня'}  
  if(jMonth == '07'){jMont = 'Июля'}  
  if(jMonth == '08'){jMont = 'Августа'}  
  if(jMonth == '09'){jMont = 'Сентября'}  
  if(jMonth == '10'){jMont = 'Октября'}  
  if(jMonth == '11'){jMont = 'Ноября'}  
  if(jMonth == '12'){jMont = 'Декабря'} 
    
  if (jYear == sDy) {  
    if (jDate == sDt) { 
      return 'Сегодня в ' +jTime
    } else if (jTimeThis == jDate) {  
      return 'Вчера в ' +jTime
    } else { 
      return jDate+ ' ' +jMont+ ' в ' +jTime
    }
  } else { 
    return jDate+ ' ' +jMont+ ' ' +jYear
  }
}
</script>


<style scoped lang="scss">
.comments {
  background-color: white;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 10px;
  &__title {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 20px;
  }
  &__new {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    &-send {
      margin-left: 10px;
      border: none;
      height: 44px;
      border-radius: 10px;
      width: 44px;
      box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
      display: flex;
      align-items: center;
      justify-content: center;
      & svg {
        height: 30px;
        width: 30px;
      }
    }
    &-form {
      border-radius: 10px;
      padding: 10px 20px;
    }
  }
  &__item {
    padding: 10px 0;
    &-header {
      display: flex;
      justify-content: space-between;
    }
    &-actions, &-reply, &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #C5C5C5;
    }
    &-content {
      margin: 5px 0;
    }
    &-bottom {
      font-size: 12px;
    }
    &-actions span {
      margin: 0 5px;
    }
    &-reply span {
      margin-right: 5px;
    }
    &-react {
      height: 22px;
      color: #C5C5C5;
      margin: 0 5px;
    }
    &-reaction {
      color: red;
      height: 22px;
      margin: 0 5px;
    }
  }
  &__replied {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    border-left: 2px solid violet;
    padding: 0 10px;
    &-left {
      display: flex;
      align-items: center;
      color: #C5C5C5;
    }
    &-content {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -moz-box;
      -moz-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      line-clamp: 3;
      box-orient: vertical;
    }
  }
}
</style>