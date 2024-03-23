import { createWebHistory, createRouter } from "vue-router";

import AccountLogin from "@/pages/auth/Login.vue";
import AccountRegister from "@/pages/auth/Register.vue";

import AccountHome from "@/pages/account/Index.vue";

import Chat from "@/pages/chat/Index.vue";

import AutoMarketItem from "@/pages/services/auto/market/:id.vue";
import AutoMarket from "@/pages/services/auto/market/Index.vue";
import AutoSearchResult from "@/pages/services/auto/market/SearchResult.vue";

import ContentHome from "@/pages/content/Index.vue";
import ContentPostPage from "@/pages/content/:id.vue";


import Services from "@/pages/services/Index.vue";
import ServiceNewsSwipe from "@/pages/services/news-swipes/Index.vue";

import SkillHome from "@/pages/skill/Index.vue";
import SkillCoursePage from "@/pages/skill/course/:id.vue";
import SkillLessonPage from "@/pages/skill/lesson/:id/Index.vue";
import SkillQuizPage from "@/pages/skill/lesson/:id/quiz/Index.vue";

import ServiceWallet from "@/pages/services/wallet/Index.vue";
import ServiceCastle from "@/pages/services/castle/Index.vue";
import ServiceBlooms from "@/pages/services/blooms/Index.vue";
import ServiceFit from "@/pages/services/fit/Index.vue";

const routes = [
  {
    path: "/",
    name: "ContentHome",
    component: ContentHome,
  },
  {
    path: "/post/:id",
    name: "ContentPostPage",
    component: ContentPostPage,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/login",
    name: "AccountLogin",
    component: AccountLogin,
  },
  {
    path: "/register",
    name: "AccountRegister",
    component: AccountRegister,
  },
  {
    path: "/services",
    name: "Services",
    component: Services,
  },
  {
    path: "/service/news-swipes",
    name: "ServiceNewsSwipe",
    component: ServiceNewsSwipe,
  },
  {
    path: "/auto-market",
    name: "AutoMarket",
    component: AutoMarket,
  },
  {
    path: "/auto-market/results",
    name: "AutoSearchResult",
    component: AutoSearchResult,
  },
  {
    path: "/auto-market/:id",
    name: "AutoMarketItem",
    component: AutoMarketItem,
  },
  {
    path: "/skill",
    name: "SkillHome",
    component: SkillHome,
  },
  {
    path: "/skill/course/:id",
    name: "SkillCoursePage",
    component: SkillCoursePage,
  },
  {
    path: "/skill/lesson/:id",
    name: "SkillLessonPage",
    component: SkillLessonPage,
  },
  {
    path: "/skill/lesson/:id/quiz",
    name: "SkillQuizPage",
    component: SkillQuizPage,
  },
  {
    path: "/wallet",
    name: "ServiceWallet",
    component: ServiceWallet,
  },
  {
    path: "/castle",
    name: "ServiceCastle",
    component: ServiceCastle,
  },
  {
    path: "/blooms",
    name: "ServiceBlooms",
    component: ServiceBlooms,
  },
  {
    path: "/fit",
    name: "ServiceFit",
    component: ServiceFit,
  },
];

const router = createRouter({   
  history: createWebHistory(),   
  routes,
  saveScrollPosition: false,
  scrollBehavior (to, from, savedPosition) {
  		window.scrollTo(0,0)
      return { x: 0, y: 0 }
  }
});

export default router;