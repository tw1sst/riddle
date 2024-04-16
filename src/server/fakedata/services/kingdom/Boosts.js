const categories = [
  {
    id: "tapBoost",
    name: "💪 Мощность",
    boosts: [
      {
        id: 1,
        title: "Удобрения",
        icon: "🦴",
        farm: 0.000001,
        startPrice: 0.000010
      },
      {
        id: 2,
        title: "Опыление",
        icon: "🐝",
        farm: 0.000003,
        startPrice: 0.000050
      },
      {
        id: 3,
        title: "Поливка",
        icon: "💦",
        farm: 0.00009,
        startPrice: 0.000150
      },
    ]
  },
  {
    id: "miningBoost",
    name: "🚜 Добыча",
    boosts: [
      
    ]
  },
  {
    id: "energyBoost",
    name: "⚡️ Энергия",
    boosts: [
      
    ]
  },
]

const userBoosts = [
  {
    boost_id: 1,
    lvl: 1,
  },
]

export {
  categories, userBoosts
}