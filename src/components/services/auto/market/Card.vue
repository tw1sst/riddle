<template>
  <div class="card">
  
  <img class="card__cover" :src="'https://coincharts.ru/' + item.cover">
  
  <div class="card__actions">
    <div class="card__title">
       {{ item.name }}
    </div>
    <span>
      <div class="card__bottom">
        <div class="card__price">
           <span>0.0025</span>
           <span class="material-icons-round card__diamond">diamond</span>
        </div>
                
        <div class="card__rare" :style="{ 'background-color': getItemRare(item.max_supply).color }">{{ getItemRare(item.max_supply).rare }}</div>
       </div>
    </span>
   </div>
  </div>
</template>


<script setup>
defineProps({
  item: Object
})

const getItemRare = (supply) => {
  let rare = ""
  let color = ""
  if (supply === 100000) {
    rare = "COMMON"
    color = "#ABC1C1"
  } else if (supply === 10000) {
    rare = "UNCOMMON"
    color = "#ED6D4F"
  } else if (supply === 5000) {
    rare = "RARE"
    color = "#36CF75"
  } else if (supply === 1000) {
    rare = "EPIC"
    color = "#3D85E6"
  } else if (supply === 100) {
    rare = "LEGENDARY"
    color = "#842DDA"
  } else if (supply === 10) {
    rare = "MITHIC"
    color = "#FF63E1"
  } else if (supply === 1) {
    rare = "UNIQUE"
    color = "#FFB626"
  }
  return {
     color: color,
     rare: rare
  }
}
</script>


<style scoped lang="scss">
.card {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #E7ECEF;
  &__cover {
    max-height: 150px;
    width: 100%;
    object-fit: cover;
  }
  &__actions {
    padding: 10px;
    dispay: flex;
    gap: 10px;
  }
  &__price {
    font-size: 14px;
    border-radius: 5px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &__diamond {
    font-size: 14px;
    color: blue;
  }
  &__rare {
    color: white;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 5px;
    display: inline-block;
    font-size: 12px;
  }
}
</style>