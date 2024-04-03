<template>
<FloatingPanel 
    v-if="props.isShowBuyModal"
    :title="state.title"
    @toggleFloating="$emit('buyModalTrigger')"
    :isShowFloating="props.isShowBuyModal"> 
    <a-spin :spinning="state.isLoading">
    <div class="product">
      <div class="product__head">
        <Avatar 
         :userName="state.product.title"
         :subText="'Покупка курса'"
        />
      </div>
      
      <div class="product__userinfo">
        <div class="product__userinfo-item">
          <div>Учетная запись: </div>
          <div>{{ userStore.user.email }}</div>
        </div>
        <div class="product__userinfo-item product__userinfo-last">
          <div>Ваш баланс: </div>
          <div>
            <span>{{ userStore.user.riddleCoins }}</span>
            <span class="product__actions-icon material-icons-round">token</span>
           </div>
        </div>
        
        <div class="product__userinfo-item">
          <div>Ваша скидка: </div>
          <div>0</div>
        </div>
        <div class="product__userinfo-item">
          <div>Того к оплате: </div>
          <div>
            <span>{{ state.product.price_tokens }}</span>
            <span class="product__actions-icon material-icons-round">token</span>
           </div>
        </div>
        <div class="product__userinfo-item">
          <div>Промокод: </div>
          <div><a-input v-model:value="value" placeholder="Введите промокод" /></div>
        </div>
      </div>
      
      <div class="product__actions">
         <a-button 
           @click="buyBtn"
           class="product__actions-item" 
           type="primary">
           Купить за {{ state.product.price_tokens }}
           <span class="product__actions-icon material-icons-round">token</span>
        </a-button>
        <a-button class="product__actions-item">
           Отмена
        </a-button>
      </div>
    </div> 
    </a-spin>
</FloatingPanel>
</template>


<script setup>
import FloatingPanel from '@/components/uikit/FloatingPanel.vue'
import { reactive } from "vue";
import Avatar from '@/components/account/Avatar.vue'
import { useUserStore } from '@/stores/UserStore.js'

const userStore = useUserStore()
const props = defineProps({
  isShowBuyModal: Boolean,
  model: Object,
  type: String
})
const state = reactive({
  title: '',
  product: {},
  isLoading: false
});

if (props.type == 'course') {
  state.title = 'Покупка курса'
  state.product = {
    title: props.model?.name,
    logo: props.model?.cover,
    price_rub: props.model?.paid?.price_rub,
    price_tokens: props.model?.paid?.price_tokens,
  }
}

const buyBtn = () => {
  state.isLoading = !state.isLoading
}

</script>


<style scoped lang="scss">
.product {
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 20px;
  &__hr {
    border-bottom: 10px solid black;
  }
  &__userinfo {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
    &-item {
      display: flex;
      justify-content: space-between;
      & div {
        display: flex;
        align-items: center;
      }
    }
  }
  &__actions {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
    &-item {
      width: 100%;
      height: 38px;
      display: flex;
      align-items: center;
      font-weight: 600;
      justify-content: center;
    }
    &-icon {
      margin-left: 5px;
    }
  }
}
</style>