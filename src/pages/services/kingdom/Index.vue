<template>
<div class="kingdom">
  <div class="kingdom__header">
    🎓 Join School
    <span class="material-icons-round kingdom__header-icon">arrow_forward_ios</span>
  </div>
  
  <div class="kingdom__balance">
    <div class="kingdom__balance-count">
     🍀 0.000186
    </div>
    <div class="kingdom__balance-legaue">
     🏅 Silver Legaue #193763
    </div>
  </div>
  
  <div class="kingdom__coin">
    <img src="https://i.ibb.co/TYtSC9X/D4-E86912-3-AB0-4-F86-AE74-B4-F70-F9-F2-B5-C.png">
  </div>
  
  <div class="kingdom__actions">
    <div v-for="item in actions" class="kingdom__actions-item">
      <span class="kingdom__actions-icon">{{ item.icon }}</span>
      <div class="kingdom__actions-text">
        {{ item.title }}
      </div>
    </div>
    
    
  </div>
</div>
</template>


<script setup>
  
let actions = [
  {
    title: "Друзья",
    icon: "👥",
    action: ""
  },
  {
    title: "Рейтинг",
    icon: "🏆",
    action: ""
  },
  {
    title: "Задания",
    icon: "📝",
    action: ""
  },
  {
    title: "Лавка",
    icon: "🛍",
    action: ""
  },
]

</script>


<style lang="scss" scoped>

.kingdom {
  padding: 20px 20px 80px 20px;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  grid-template-rows: auto 1fr auto auto;
  position: absolute;
  gap: 40px;
  top: 0;
  left: 0;
  overflow: hidden;
  
  &__header {
    background-color: white;
    border-radius: 10px;
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    &-icon {
      font-size: 18px;
      margin-left: 5px;
    }
  }
  &__coin {
    height: auto;
    width: 90%;
    cursor: grab;
    border-radius: 50%;
    overflow: hidden;
    transform: rotate(45deg);
  }
  &__balance {
    text-align: center;
    &-count {
      font-size: 48px;
      font-weight: 700;
    }
    &-legaue {
      background-color: white;
      border-radius: 10px;
      padding: 3px 10px;
      display: inline-block;
      margin: 0 auto;
      box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
      color: #999998;
    }
  }
  &__actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    width: 100%;
    &-item {
      background-color: white;
      border-radius: 10px;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 10px;
      box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175);
      backdrop-filter: blur(1px);
    }
    &-text {
      font-size: 12px;
    }
    &-icon {
      margin-bottom: 5px;
    }
  }
}

</style>