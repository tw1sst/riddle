<template>
<div class="actions">
  <div class="actions__buttons"> 
    <a-button 
        v-if="startedCourse" 
        type="primary" 
        @click="$emit('moduleClick', state.course.modules[0])"
        class="actions__buttons-item actions__buttons-full">
      ⏳ Продолжить
    </a-button>
    <a-button v-else-if="state.course.paid?.price_tokens" 
      type="primary" 
      @click="buyModalTrigger(state.course, 'course')"
      class="actions__buttons-item actions__buttons-full">
        Купить за {{ state.course.paid.price_tokens }}
      <span class="material-icons-round">token</span>
    </a-button>
    
    <a-popconfirm v-else 
      placement="top" 
      ok-text="Да" 
      cancel-text="Нет" 
      @confirm="courseStart()">
      <template #title>
        <p>Вы уверены что хотите начать этот курс?</p>
        <p>Курс будет добавлен в вашу библиотеку</p>
      </template>
      <a-button type="primary" class="actions__buttons-item actions__buttons-full">
        🚀 Начать бесплатно
      </a-button>
    </a-popconfirm>
    
    <a-button class="actions__buttons-item">
      💬
    </a-button>
    
    <a-button class="actions__buttons-item">
      💙
    </a-button>
  </div>
</div>

<BuyModal
  @buyModalTrigger="buyModalTrigger"
  :model="state.course"
  :type="'course'"
  :isShowBuyModal="state.isShowBuyModal"/>
</template>


<script setup>
import { reactive, computed } from "vue";
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/UserStore.js'
import BuyModal from '@/components/pay/BuyModal.vue'

const userStore = useUserStore()
const props = defineProps({
  course: Object
})
const state = reactive({
  course: {},
  isShowBuyModal: false
});

if (Object.keys(props?.course).length !== 0) {
  state.course = props.course 
}

if (userStore.user?.startedCourses) {
  state.startedCourse = userStore.user.startedCourses.find(x => x.id == state.course.id)
}

const startedCourse = computed(() => { 
   return userStore.user?.startedCourses.find(x => x.id == state.course.id)
})

const courseStart = () => {
  userStore.user.startedCourses.push(state.course)
  message.success('Курс ' + state.course.name + ' успешно начат')
}

const buyModalTrigger = (modal, type) => {
  state.isShowBuyModal = !state.isShowBuyModal
}
</script>


<style scoped lang="scss">
.actions {
  position: fixed;
  bottom: 88px;
  width: 100%;
  height: 40px;
  &__buttons {
    display: grid;
    grid-template-columns: 1fr auto auto;
    padding: 0 20px;
    gap: 10px;
    &-item {
      border: none;
      height: 48px;
      border-radius: 10px;
      width: 48px;
      box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 16px;
      & span {
        margin-left: 5px;
      }
    }
  }
}
</style>