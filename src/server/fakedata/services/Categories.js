import { PhotoIcon, CircleStackIcon, AcademicCapIcon, CursorArrowRippleIcon, BookOpenIcon, WalletIcon } from '@heroicons/vue/24/outline'

const categories = [
  {
    id: null,
    name: ""
  },
  {
    id: 0,
    name: "🔥 HOT",
    apps: [
      {
        id: 2,
        title: "Posts Swipe",
        desc: "Читайте новости и публикации в удобном формате",
        icon: CursorArrowRippleIcon,
        routeName: "ServiceNewsSwipe"
      },
      {
        id: 6,
        title: "PancakeSwap",
        desc: "Trade. Earn. Win. NFT.",
        iconImg: "https://storage.googleapis.com/moni-talks-bucket/prod/images/dwd_0f2457eda235ed0f2f4b3f01b3a3e67e.png?v=1660596818820040",
        type: "external",
        link: "https://pancakeswap.finance",
      },
      {
        id: 7,
        title: "1inch Network",
        desc: "A distributed DeFi aggregator for various protocols on multiple chains.",
        iconImg: "https://1inch.io/img/pressRoom/1inch_without_text.webp",
        type: "external",
        link: "https://app.1inch.io",
      },
      {
        id: 4,
        title: "Riddle Skill",
        desc: "Обучайтесь новому, совершенствуйте свои навыки, тренируйтесь",
        icon: AcademicCapIcon,
        routeName: "SkillHome"
      },
      {
        id: 5,
        title: "Wallet",
        desc: "Современный и удобный кошелек для хранения RiddleCoin",
        icon: WalletIcon,
        routeName: "ServiceWallet"
      }
    ]
  },
  {
    id: 1,
    name: "⭐ Избранное",
    apps: [
      {
        id: 4,
        title: "Riddle Skill",
        desc: "Обучайтесь новому, совершенствуйте свои навыки, тренируйтесь",
        icon: AcademicCapIcon,
        routeName: "SkillHome",
      },
      {
        id: 5,
        title: "Wallet",
        desc: "Современный и удобный кошелек для хранения RiddleCoin",
        icon: WalletIcon,
        routeName: "ServiceWallet",
      },
    ]
  },
  {
    id: 2,
    name: "🚀 Riddle Verse",
    apps: [
      {
        id: 7,
        title: "Riddle Gallery",
        desc: "Личные проекты и работы AI в одном месте",
        icon: PhotoIcon,
        routeName: "ServiceGallery",
      },
      {
        id: 6,
        title: "Riddle Kingdom",
        desc: "Зарабатывайте ☘️ и станьте самым умным в королевстве!",
        icon: CircleStackIcon,
        routeName: "ServiceKingdom",
      },
      {
        id: 1,
        title: "Ваша Лента",
        desc: "Ваша персональная лента публикаций",
        icon: BookOpenIcon,
        routeName: "ContentHome",
      },
      {
        id: 2,
        title: "Posts Swipe",
        desc: "Читайте новости и публикации в удобном формате",
        icon: CursorArrowRippleIcon,
        routeName: "ServiceNewsSwipe",
      },
      {
        id: 4,
        title: "Riddle Skill",
        desc: "Обучайтесь новому, совершенствуйте свои навыки, тренируйтесь",
        icon: AcademicCapIcon,
        routeName: "SkillHome",
      },
      {
        id: 5,
        title: "Wallet",
        desc: "Современный и удобный кошелек для хранения RiddleCoin",
        icon: WalletIcon,
        routeName: "ServiceWallet",
      },
    ]
  },
  {
    id: 3,
    name: "🧩 DeFi",
    apps: [
      {
        id: 6,
        title: "PancakeSwap",
        desc: "Trade. Earn. Win. NFT.",
        iconImg: "https://storage.googleapis.com/moni-talks-bucket/prod/images/dwd_0f2457eda235ed0f2f4b3f01b3a3e67e.png?v=1660596818820040",
        type: "external",
        link: "https://pancakeswap.finance",
      },
      {
        id: 7,
        title: "1inch Network",
        desc: "A distributed DeFi aggregator for various protocols on multiple chains.",
        iconImg: "https://1inch.io/img/pressRoom/1inch_without_text.webp",
        type: "external",
        link: "https://app.1inch.io",
      },
      {
        id: 8,
        title: "PancakeSwap",
        desc: "Trade. Earn. Win. NFT.",
        iconImg: "https://storage.googleapis.com/moni-talks-bucket/prod/images/dwd_0f2457eda235ed0f2f4b3f01b3a3e67e.png?v=1660596818820040",
        type: "external",
        link: "https://pancakeswap.finance",
      },
    ]
  },
  {
    id: 4,
    name: "BSC"
  },
  {
    id: 5,
    name: "ETH"
  },
  {
    id: 6,
    name: "Solana"
  },
  {
    id: null,
    name: ""
  },
]

export {
  categories
}