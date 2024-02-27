<template>
<div class="auto">
  <div class="auto__header">
    <div class="auto__header-left">
      <span @click="$router.push({ name: 'AutoMarket' })" class="material-icons-round auto__header-item">arrow_back_ios</span>
    </div>
    <div class="auto__header-center">
      {{ state.item.title }}
    </div>
    <div class="auto__header-right">
      <span class="material-icons-round auto__header-item">ios_share</span>
     <span class="material-icons-round auto__header-item">more_horiz</span>
    </div>
  </div>
  <a-carousel arrows dots-class="slick-dots" class="auto__images" autoplay>
    <div v-for="image in state.item.images" class="auto__images-item">
      <img
        class="auto__images-image"
        :src="image">
    </div>
  </a-carousel>

  <div class="container">
    <h3 class="auto__title">
      {{ state.item.title }}
    </h3>
    <div class="auto__area">
      <span class="material-icons-round auto__area-icon">place</span>
      <span>{{ state.item.post_country }}, {{ state.item.post_city }}</span>
    </div>

    <div class="auto__baseinfo"> 
      <div v-for="item in state.baseInfoItems" class="auto__baseinfo-item">
        <span class="material-icons-round auto__baseinfo-icon">
          {{ item.icon }}
        </span>
        <div class="auto__baseinfo-count">
          {{ item.count }}
        </div>
        <div class="auto__baseinfo-text">
          {{ item.title }}
        </div>
      </div>
    </div>
  
    <div class="auto__block">
      <div class="auto__block-title">
        Информация
      </div>
      <div v-for="item in state.autoInfo" class="auto__block-item">
        <div class="auto__block-left">
          {{ item.title }}
        </div>
        <div class="auto__block-right">
          {{ item.value }}
        </div>
      </div>
    </div>
  
    <div class="auto__block">
      <div class="auto__block-title">
        Описание
      </div>
      
      <div class="auto__block-item">{{ state.item?.comment }}</div>
    </div>
  </div>
</div>
<ActionsBar :auto="state.item" />
</template>


<script setup>
import ActionsBar from "@/components/services//auto/market/ActionsBar.vue"
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute()
const state = reactive({
  id: null,
  item: {},
  baseInfoItems: [],
  autoInfo: []
});

if (route.params?.item) {
  state.item = JSON.parse(route.params.item)
  
  state.baseInfoItems = [
    {
      title: "Год выпуска",
      icon: "event",
      count: state?.item.year
    },
    {
      title: "Пробег (км)",
      icon: "timeline",
      count: state?.item.mileage
    },
    {
      title: "Владельцы (по ПТС)",
      icon: "people_outline",
      count: state?.item.owners
    },
    {
      title: "Мощность двигателя",
      icon: "speed",
      count: state?.item.power + " л.с"
    },
  ]
  
  let engine_volume = state?.item.engine_volume.toFixed(1)
  let mileage = state?.item.mileage.toLocaleString() + " км"
  
  let handlebar = state?.item.handlebar
    switch(handlebar) {
      case 'left':
        handlebar = "Левый";  break
      case 'right':
        handlebar = "Правый"; break
      default:
        handlebar = "Левый";  break
    }
    
  let drive = state?.item.drive
    switch(drive) {
      case 'rear':
        drive = "Задний";   break
      case 'front':
        drive = "Передний"; break
      case 'full':
        drive = "Полный";   break
      default:
        drive = "Задний";   break
    }
    
  let kpp = state?.item.kpp
    switch(kpp) {
      case 'automat':
        kpp = "Автомат";  break
      case 'mechanic':
        kpp = "Механика"; break
      case 'robot':
        kpp = "Робот";    break
      default:
        kpp = "Механика"; break
    }
    
  let body = state?.item.body
    switch(body) {
      case 'sedan':
        body = "Седан";       break
      case 'coupe':
        body = "Купе";        break
      case 'liftback':
        body = "Лифтбек";     break
      case 'jeep':
        body = "Внедорожник"; break
      case 'universal':
        body = "Универсал";   break
      case 'minivan':
        body = "Минивэн";     break
      case 'van':
        body = "Фургон";      break
      case 'convertible':
        body = "Электро";     break
      default:
        body = "Седан";       break
    }
    
  let fuel = state?.item.fuel
    switch(fuel) {
      case 'petrol':
        fuel = "Бензин";  break
      case 'diesel':
        fuel = "Дизель";  break
      case 'gibrid':
        fuel = "Гибрид";  break
      case 'electro':
        fuel = "Электро"; break
      default:
        fuel = "Бензин";  break
    }
   
  let color = state?.item.color
  switch(color) {
    case 'black':
      color = "Черный";     break
    case 'grey':
      color = "Серый";      break
    case 'violet':
      color = "Фиолетовый"; break
    case 'white':
      color = "Белый";      break
    case 'red':
      color = "Красный";    break
    case 'pink':
      color = "Розовый";    break
    case 'orange':
      color = "Оранжевый";  break
    case 'yellow':
      color = "Желтый";     break
    case 'green':
      color = "Зеленый";    break
    case 'blue':
      color = "Синий";      break 
    default:
      color = "Черный";     break
  }
    
  state.autoInfo = [
    {
      title: "Бренд", 
      value: state?.item.brand
    },
    {
      title: "Модель", 
      value: state?.item.model
    },
    {
      title: "Год выпуска", 
      value: state?.item.year
    },
    {
      title: "Пробег", 
      value: mileage
    },
    {
      title: "Мощность двигателя", 
      value: state?.item.power + " л.с"
    },
    {
      title: "Владельцев", 
      value: state?.item.owners
    },
    {
      title: "Объем двигателя", 
      value: engine_volume
    },
    {
      title: "Руль", 
      value: handlebar
    },
    {
      title: "Привод", 
      value: drive
    },
    {
      title: "Цвет", 
      value: color
    },
    {
      title: "КПП", 
      value: kpp
    },
    {
      title: "Кузов", 
      value: body
    },
    {
      title: "Тип топлива", 
      value: fuel
    },
    {
      title: "VIN", 
      value: state?.item.vin
    },
  ]
}

if (route.params.id) {
  state.id = route.params.id
}

const getMarketItem = () => {
  axios
    .get("https://coincharts.ru/api/items/" + state.id)
    .then((res) => {
      if (res.data) state.item = res.data
      console.log(res.data)
    })
   .catch((error) => {
      console.log(error)
   })
}
// getMarketItem()
</script>


<style lang="scss" scoped>
.container {
 padding: 0 20px;
}
.auto {
  padding: 20px 0 80px 0;
  &__header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    position: fixed;
    width: 100%;
    top: 0;
    background-color: white;
    z-index: 100;
    &-center {
      font-weight: 600;
      font-size: 12px;
      height: 60px;
    }
    & > div {
      display: flex;
      align-items: center;
      text-align: center;
    }
    &-item:last-child {
      margin: 0 20px;
      height: 20px;
    }
  }
  &__images {
    :deep(.slick-dots) {
      position: relative;
      height: auto;
    }
    :deep(.slick-arrow) {
      display: none !important;
    }
    &-item {
     padding: 0 20px;
    }
    &-image {
     border-radius: 20px;
     overflow: hidden;
    }
   }
   &__title {
    margin-top: 20px;
   }
   &__area {
    color: #C5C5C5;
    display: flex;
    align-items: center;
    &-icon {
     margin-right: 5px;
    }
   }
   &__baseinfo {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    text-align: center;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 10px;
    &-count {
     padding: 10px 0;
     font-weight: 600;
    }
    &-text {
     font-size: 12px;
     color: #C5C5C5;
     font-weight: 600;
    }
    &-icon {
     color: #C5C5C5;
    }
    &-item {
      margin: 10px 0;
      padding: 0 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &:not(:last-child) {
        border-right: 1px solid #fff;
      }
    }
  }
  &__block {
    margin-top: 20px;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
    &-title {
      font-size: 16px;
      font-weight: 600;
      padding-bottom: 20px;
    }
    &-item {
      display: flex;
      padding-top: 10px;
      justify-content: space-between;
      border-top: 1px solid #f6f6f6;
      white-space: pre-wrap;
      word-wrap: break-word;
      &:not(:last-child) {
        padding-bottom: 10px;
      }
    }
  }
}
</style>