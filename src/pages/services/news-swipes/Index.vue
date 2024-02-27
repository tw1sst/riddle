<template>
<div class="swipes">
  <div class="swipes--status">
    <span class="fa fa-remove material-icons-round fa fa-remove">close</span>
    <span class="fa fa-heart material-icons-round fa fa-heart">favorite_border</span>
  </div>

  <div class="swipes--cards">
    <template v-for="card in state.allNews">
      <div 
        :id="card.id"
        class="swipes--card">
         <Post :post="card" :type="'swipes'"/>
      </div>
    </template>
  </div>

  <div class="swipes--buttons">
    <button id="nope">
      <span class="fa fa-remove material-icons-round">close</span>
    </button>
    <button id="open">
      <span class="fa fa-open material-icons-round">open_in_full</span>
    </button>
    <button id="love">
      <span class="fa fa-heart material-icons-round">favorite_border</span>
    </button>
  </div>
</div>
</template>


<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import Post from "@/components/content/Post.vue"
import { allPosts } from '@/server/fakedata/content/Posts.js'

const state = reactive({
  allNews: [],
});

state.allNews = allPosts

const getNews = () => {
  axios
    .get("https://coincharts.ru/api/news")
    .then((res) => {
      if (res.data.length) {
        state.allNews = res.data
        // state.allNews = state.allNews.slice(0, 5)
      }
    })
    .catch((error) => {
      console.log(error)
  })
}
// getNews()

</script>


<script>
import Hammer from 'hammerjs'
'use strict';

export default {
  mounted() {
'use strict';

var tinderContainer = document.querySelector('.swipes');
var allCards = document.querySelectorAll('.swipes--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');

function initCards(card, index) {
  var newCards = document.querySelectorAll('.swipes--card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
     card.style.opacity = (10 - index) / 10;
  });
  
  console.log("init")
  
  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('swipes_love', event.deltaX > 0);
    tinderContainer.classList.toggle('swipes_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('swipes_love');
    tinderContainer.classList.remove('swipes_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.swipes--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add('removed');

    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    initCards();

    event.preventDefault();
  };
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);
  }
}
</script>


<style scoped>
.swipes {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
  margin-top: -10px;
}

.loaded.swipes {
  opacity: 1;
}

.swipes--status {
  position: absolute;
  top: 50%;
  margin-top: -30px;
  z-index: 2;
  width: 100%;
  text-align: center;
  pointer-events: none;
}

.swipes--status span {
  font-size: 100px;
  opacity: 0;
  transform: scale(0.3);
  transition: all 0.2s ease-in-out;
  position: absolute;
  width: 100px;
  margin-left: -50px;
}
.swipes--card div {
  pointer-events: none;
}

.swipes_love .fa-heart {
  opacity: 0.7;
  transform: scale(1);
}

.swipes_nope .fa-remove {
  opacity: 0.7;
  transform: scale(1);
}

.swipes--cards {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.swipes--card {
  display: inline-block;
  width: 90vw;
  height: auto;
  background: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  will-change: transform;
  top: 0;
  transition: all 0.3s ease-in-out;
  margin-top: 20px;
}

.moving.swipes--card {
  transition: none;
}

.swipes--buttons {
  display: flex;
  position: fixed;
  bottom: 80px;
  width: 100%;
  risplay: flex;
  justify-content: center;
  z-index: 5;
}

.swipes--buttons button {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #FFFFFF;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 10px 40px 10px rgba(140, 152, 164, .175); 
}

.swipes--buttons button:focus {
  outline: 0;
}

.swipes--buttons span {
  font-size: 32px;
  vertical-align: middle;
}
.fa-heart {
  color: #FFACE4;
}
.fa-remove {
  color: #CDD6DD;
}
.fa-open {
  color: #EFABFF;
}
</style>