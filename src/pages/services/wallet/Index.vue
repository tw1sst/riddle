<template>
<div class="wallet">
  <div class="wallet__balanceCard">
    <div class="wallet__balanceCard-header">
      <div class="wallet__balanceCard-name">
        Основной счет
      </div>
      <div class="wallet__balanceCard-options">
        <span class="material-icons-round">more_horiz</span>
      </div>
    </div>
    <div class="wallet__balanceCard-balance">
      $2 164,12
    </div>
    <div class="wallet__balanceCard-bottom">
      <div class="wallet__balanceCard-contract">
        0x5499...23fDC262
      </div>
      <div class="wallet__balanceCard-logo">
        R.Wallet
      </div>
    </div>
  </div>
  
  <div class="wallet__block">
    <div class="wallet__actions">
      <div 
        v-for="action in actions"
        class="wallet__actions-item">
        <div class="wallet__actions-button">
          <span class="material-icons-round">
            {{ action.icon }}
          </span>
        </div>
        <div class="wallet__actions-text">
          {{ action.title }}
        </div>
      </div>
    </div>
    
    <div class="wallet__type">
      <div :class="state.activeType == 1 ? 'wallet__type-active' : ''"
        @click="state.activeType = 1"
        class="wallet__type-item">
        Токены
      </div>
      <div :class="state.activeType == 2 ? 'wallet__type-active' : ''"
        @click="state.activeType = 2"
        class="wallet__type-item">
        Коллекции
      </div>
    </div><br/>
    
    <div class="wallet__tokens">
      <div 
        v-for="token in userTokens"
        class="wallet__tokens-item">
        <div class="wallet__tokens-logo">
          <VueCryptocurrencyIcons size="32" :name="token.code" />
        </div>
        
        <div class="wallet__tokens-info">
          <div class="wallet__tokens-name">{{ token.name }}</div>
          <div class="wallet__tokens-price">${{ token.tokenPrice }}</div>
        </div>
        
        <div class="wallet__tokens-chart">
          <img class="spark-img" :src="'https://images.cryptocompare.com/sparkchart/' + token.code + '/USD/latest.png?ts=' + currentDate" onerror="this.onerror=null;this.style='display: none';">
        </div>
        
        <div class="wallet__tokens-balance">
          <div class="wallet__tokens-name">{{ token.userBalance }}</div>
          <div class="wallet__tokens-price">{{ getUserTokensBalance(token) }}</div>
        </div>
      </div>
    </div> 
  </div>
</div>
</template>


<script setup>
import {reactive } from "vue";

const state = reactive({
  activeType: "1"
});

const userTokens = [
  {
    id: 1,
    name: "Riddle Coin",
    code: "RAY",
    userBalance: 0.0025,
    tokenPrice: 24.53,
  },
  {
    id: 2,
    name: "RiddleVerse Coin",
    code: "GOLD",
    userBalance: 0.0025,
    tokenPrice: 24.53,
  },
  {
    id: 3,
    name: "Bitcoin",
    code: "BTC",
    userBalance: 0.23,
    tokenPrice: 48365.19,
  },
  {
    id: 4,
    name: "Ethereum",
    code: "ETH",
    userBalance: 4,
    tokenPrice: 3018.27,
  },
]

const actions = [
  {
    id: 1,
    title: "Купить",
    icon: "attach_money",
    routeName: ""
  },
  {
    id: 2,
    title: "Отправить",
    icon: "arrow_upward",
    routeName: ""
  },
  {
    id: 3,
    title: "Получить",
    icon: "arrow_downward",
    routeName: ""
  },
  {
    id: 4,
    title: "Операции",
    icon: "donut_large",
    routeName: ""
  },
]

let currentDate = new Date()

const getUserTokensBalance = (token) => {
  let balance = token.userBalance * token.tokenPrice
  return "$" + balance.toFixed(2)
}
</script>


<style scoped lang="scss">
.wallet {
  padding: 20px;
  &__tokens {
    &-item {
      margin-bottom: 20px;
      display: flex;
    }
    &-logo {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
    &-info {
      max-width: 100px;
      width: 100%;
    }
    &-name {
      font-weight: 600;
      line-height: 18px;
    }
    &-price {
      font-size: 12px;
      color: #C5C5C5;
    }
    &-balance {
      text-align: right;
    }
    &-chart {
      width: 100px;
      height: auto;
      margin: 0 auto;
    }
  }
  &__balanceCard {
    height: 170px;
    width: 100%;
    border-radius: 10px;
    background-size: cover;
    padding: 20px;
    color: white;
    display: grid;
    grid-template-rows: auto 1fr auto;
    background-image: url('https://wallpapers.com/images/hd/blue-abstract-background-05lhu0ttx8ti1ee9.jpg');
    &-header, &-bottom {
      display: flex;
      justify-content: space-between;
    }
    &-balance {
      font-size: 26px;
      font-weight: 700;
    }
    &-logo {
      font-weight: 700;
    }
  }
  &__actions {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    color: #C5C5C5;
    &-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      transition: 0.3s;
      &:hover {
        color: #3E68F8;
        .wallet__actions-button {
          border: 1px solid #3E68F8;
        }
      }
    }
    &-button {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      text-align: center;
      border: 1px solid #C5C5C5;
      justify-content: center;
      display: flex;
      align-items: center;
    }
    &-text {
      font-size: 12px;
      margin-top: 5px;
    }
  }
  &__block {
    border-radius: 20px;
    background-color: white;
    padding: 20px;
    margin: 20px -20px;
  }
  &__type {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    margin-top: 20px;
    &-item {
     padding-bottom: 10px;
     border-bottom: 1px solid #e6e6e6;
     font-size: 12px;
     transition: 0.3s;
    }
    &-active {
      color: #3E68F8;
      border-bottom: 2px solid #3E68F8;
    }
  }
}
</style>