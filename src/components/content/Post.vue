<template>
  <div class="post" :class="type == 'swipes' ? 'post__swipe' : ''">
    <div class="post__header">
      <Avatar 
       :userName="state.post.provider"
       :subText="dateConvert(state.post.pubdate)"
      />
      <div class="post__header-right">
        <span class="material-icons-round">more_horiz</span>
      </div>
    </div>
    <div class="post__title" 
      :class="props.type == 'full' ? 'post__content-full' : ''"
      @click="$router.push({ name: 'ContentPostPage', params: { id: state.post.id, post: JSON.stringify(state.post) } })">
      {{ state.post.title }}
    </div>
    <div class="post__image">
      <img :src="state.post.image">
    </div>
    <div class="post__content" 
      :class="props.type == 'full' ? 'post__content-full' : ''">
      {{ state.post.content }}
    </div>  
    <div class="post__actions">
      <div class="post__actions-left">
        <div class="post__actions-item">
          <span class="material-icons-round">
            visibility
          </span>
          <span class="post__actions-count">
            {{ state.post.viewsCount }}
          </span>
        </div>
      </div>
      <div class="post__actions-right">
        <div class="post__actions-item">
          <span class="post__actions-count">
            {{ state.post.opensCount }}
          </span>
          <span class="material-icons-round">
            open_in_new
          </span>
        </div>
        <div class="post__actions-item">
          <span class="post__actions-count">
            {{ state.post.comments.length }}
          </span>
          <span class="material-icons-round">
            chat_bubble_outline
         </span>
        </div>
        <div class="post__actions-item">
          <span class="post__actions-count"
            :class="state.post.isLiked ? 'post__actions-liked' : ''">
            {{ state.post.likesCount }}
          </span>
          <span v-if="state.post.isLiked" 
            @click="postLikeTrigger()"
            class="post__actions-liked material-icons-round">
            favorite
          </span>
          <span v-else 
            @click="postLikeTrigger()"
            class="material-icons-round">
            favorite_border
          </span>
        </div>
      </div>
    </div>
  </div>
 
  <template v-if="props.type == 'full'">
    <Comments :post="state.post" />
 
    <br/><br/><br/><br/>
  </template>
</template>


<script setup>
import { reactive } from "vue";
import Comments from '@/components/content/Comments.vue'
import Avatar from '@/components/account/Avatar.vue'
const props = defineProps({
  post: Object,
  type: String
});

const state = reactive({
  post: {}
});

if (Object.keys(props.post).length !== 0) {
  state.post = props.post 
  
  state.post.likesCount     = 264
  // state.post.commentsCount  = 65
  state.post.viewsCount     = 4362
  state.post.opensCount     = 1256
  state.post.isLiked        = false
  
  state.post.comments = [
    {
      id: 1,
      text: "Я тоже думаю к лучшему. Быстрее своё запустим и подключим.",
      attachments: null,
      date: "2024-01-23 00:20",
      user: {
        name: "User 1"
      },
      parent_id: null,
      ups: 12,
      downs: 5,
      userReaction: "up"
    },
    {
      id: 2,
      text: `Комментарий 2`,
      attachments: null,
      date: "2024-01-12 12:36",
      user: {
        name: "User 1"
      },
      parent_id: 1,
      ups: 2,
      downs: 5,
      userReaction: ""
    },
    {
      id: 3,
      text: "Думаю, да. Инст постепенно потухнет. Какого-то конкретного отношения у меня к этому нет. С блогерами и так всё норм будет. У многих уже есть офлайн бизнесы. Жаль только благотворительные и подобные им проекты, которые обычно по крупицам собирают аудиторию.",
      attachments: null,
      date: "2024-01-12 10:40",
      user: {
        name: "User 2"
      },
      parent_id: 2,
      ups: 14,
      downs: 0,
      userReaction: ""
    },
    {
      id: 4,
      text: "Комментарий 4",
      attachments: null,
      date: "2024-01-12 09:14",
      user: {
        name: "User 1"
      },
      parent_id: null,
      ups: 4,
      downs: 6,
      userReaction: ""
    },
  ]
}

const getAvatar = (name) => {
  return "https://ui-avatars.com/api/?name=" + name + "&size=32&color=7F9CF5&background=EBF4FF"
}

const postLikeTrigger = () => {
  state.post.isLiked = !state.post.isLiked
  
  if (state.post.isLiked) {
    state.post.likes++
  } else {
    state.post.likes--
  }
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
.post {
  display: grid;
  grid-template-rows: auto auto 1fr auto auto;
  gap: 10px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  width: auto;
  max-width: 100%;
  padding: 10px 0;
  &__swipe {
   pointer-events: none;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    &-left {
      display: flex;
      align-items: center;
    }
    &-name {
      font-weight: 600;
    }
    &-date {
      font-size: 12px;
      color: #C5C5C5;
    }
    &-avatar {
      border-radius: 5px;
      margin-right: 10px;
      height: 34px;
      width: 34px;
    }
  }
  &__title {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    box-orient: vertical;
    font-weight: 700;
    font-size: 16px;
    padding: 0 20px;
  }
  &__content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    padding: 0 20px;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    line-clamp: 7;
    box-orient: vertical;
    &-full {
      display: block;
    }
  }
  &__actions {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    color: #C5C5C5;
    &-right {
      display: grid;
      grid-template-columns: auto auto auto;
      gap: 20px;
    }
    &-item {
      display: flex;
      align-items: center;
    }
    &-count {
      font-size: 12px;
      height: 100%;
      margin: 0 5px;
      font-weight: 600;
    }
    &-liked {
      color: red;
    }
  }
}
</style>