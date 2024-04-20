const categories = [
  {
    id: "tapBoost",
    name: "💪 Мощность",
    boosts: [
      {
        id: 1,
        title: "Удобрения",
        icon: "🦴",
        farm: 0.0000005,
        startPrice: 0.000010
      },
      {
        id: 2,
        title: "Опыление",
        icon: "🐝",
        farm: 0.0000015,
        startPrice: 0.000050
      },
      {
        id: 3,
        title: "Поливка",
        icon: "🚿",
        farm: 0.0000045,
        startPrice: 0.00025
      },
      {
        id: 4,
        title: "Магнинный сборщик",
        icon: "🧲",
        farm: 0.0000135,
        startPrice: 0.00125
      },
      {
        id: 5,
        title: "Солнечный свет",
        icon: "☀️",
        farm: 0.0000405,
        startPrice: 0.00625
      },
      {
        id: 6,
        title: "Защита от осадков",
        icon: "⛱",
        farm: 0.0001215,
        startPrice: 0.03125
      },
      {
        id: 7,
        title: "Звуковые излучатели",
        icon: "🔊",
        farm: 0.000364,
        startPrice: 0.15625
      },
      {
        id: 8,
        title: "Инфокрасные излучатели",
        icon: "💡",
        farm: 0.0010935,
        startPrice: 0.78125
      },
      {
        id: 9,
        title: "Биологические технологии",
        icon: "🧪",
        farm: 0.0032805,
        startPrice: 3.90625
      },
      {
        id: 10,
        title: "Космические технологии",
        icon: "🛰",
        farm: 0.0098415,
        startPrice: 19.53125
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