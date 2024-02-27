const allAutos = [
  {
    "id": 1,
	"title": "Mercedes-Benz E-Класс I (W124), 2017",
	"brand": 			"Mercedes-Benz",
	"model": 			"E-Класс",
	"year":     		2017,
	"mileage":  		102000, // пробег
	"power":     		184,	// мощность
	"owners":    		2,		// владельцев
	"price_rub": 		3448850,
	"engine_volume": 	2.0,	// объем движка
	"handlebar": 		"left", // руль
	"drive": 			"rear", // привод
	"color":     		"black",
	"kpp": 				"automat",
	"body":				"sedan",// кузов
	"comment": 			`Mercedes-Benz E-Класс I (W124), 2017
	
Добро пожаловать в наш автосалон, где мы представляем эксклюзивный автомобиль Mercedes-Benz S-Класс AMG. Эта машина была приобретена у официального дилера и имеет оригинальный ПТС. Кузов полностью в заводском лакокрасочном покрытии, а зоны риска покрыты полиуретановой пленкой. Вы можете быть уверены, что этот автомобиль будет выглядеть как новый еще много лет.`,
	"fuel":      		"petrol",//тип топлива
	"post_country":		"Россия",
	"post_city":		"Ростов-на-Дону",
	"vin":		 		"WDD2*************",
	"images": [
		"https://s6.carprice.photo/?bucket=carprice-photo-source&height=1080&key=Rnos6Fr3L21.gEZhXba4LK9X6q6ibWOYF33_Lqnf_K65V_EurdH0JKXX.WuqM7VAYBXTpx93MZlXRwg-zQPbNCnZqwupdYcoghOM&signature=7302633b94397686a82465f0e691bb09f2dc6335&type=1&width=1920",
		"https://s7.carprice.photo/?bucket=carprice-photo-source&height=1080&key=NAbLvurYXW1.I91dVra4jzRr4Q05FyY5jEH0jTLj9w0ia_qNNu3_hz7r.tw1G9Bgu_5dU6kTH_nuo749Dp26CQjefoO3u5Yi3rIQ&signature=884f57fe7d6b7acb1fbac6d2f65da672eec09718&type=1&width=1920"
	]
  },
  {
    "id": 2,
	"title": "Mercedes-Benz E-Класс I (W124), 2010",
	"brand": 			"Mercedes-Benz",
	"model": 			"E-Класс",
	"year":     		2010,
	"mileage":  		158000,
	"power":     		231,
	"owners":    		2,
	"price_rub": 		1608000,
	"engine_volume": 	3.0,
	"handlebar": 		"left",
	"drive": 			"rear", //задний привод
	"color":     		"brown",
	"kpp": 				"automat",
	"body":				"sedan",// кузов
	"comment": 			`Mercedes-Benz E-Класс I (W124), 2010
	
Добро пожаловать в наш автосалон, где мы представляем эксклюзивный автомобиль Mercedes-Benz S-Класс AMG. Эта машина была приобретена у официального дилера и имеет оригинальный ПТС. Кузов полностью в заводском лакокрасочном покрытии, а зоны риска покрыты полиуретановой пленкой. Вы можете быть уверены, что этот автомобиль будет выглядеть как новый еще много лет.`,
	"fuel":      		"petrol",
	"post_country":		"Россия",
	"post_city":		"Москва",
	"vin":		 		"WDD2*************",
	"images": [
		"https://s5.carprice.photo/?bucket=carprice-photo-source&height=1080&key=edCDazVUa61.yluiKba4ZrKUnuS_ul6nT72LZLQciOSklIVksBKAbrgU.W4GkPuKsu4QsVAjkCC2qilHVtPPMlaQH7ttaVe4GvKY&signature=0d9eb6875f91396dce15b8e82d6f46f86d73f9fb&type=1&width=1920",
		"https://s8.carprice.photo/?bucket=carprice-photo-source&height=1080&key=hHGdFXNYB61.uEF287a4FKhARJalCq3VVWlRFq7IUpa-QF8WqsZaHKLA.7bnZ1MhGDhl967pW-nZhg91nLiUsSM3DRKYxlvJehA8&signature=036498354e2d61ba19b1394bf3834b4819f89329&type=1&width=1920"
	]
  },
  {
    "id": 3,
	"title": "BMW 5 серии I (E12), 2021",
	"brand": 			"BMW",
	"model": 			"5 серия",
	"year":     		2021,
	"mileage":  		54000,
	"power":     		220,
	"owners":    		6,
	"price_rub": 		2280000,
	"engine_volume": 	3.2,
	"handlebar": 		"left",
	"drive": 			"rear",
	"color":     		"grey",
	"kpp": 				"automat",
	"body":				"sedan",// кузов
	"comment": 			`BMW 5 серии I (E12), 2021
	
Добро пожаловать в наш автосалон, где мы представляем эксклюзивный автомобиль Mercedes-Benz S-Класс AMG. Эта машина была приобретена у официального дилера и имеет оригинальный ПТС. Кузов полностью в заводском лакокрасочном покрытии, а зоны риска покрыты полиуретановой пленкой. Вы можете быть уверены, что этот автомобиль будет выглядеть как новый еще много лет.`,
	"fuel":      		"petrol",
	"post_country":		"Россия",
	"post_city":		"Сочи",
	"vin":		 		"WBAJ*************",
	"images": [
		"https://s10.carprice.photo/?bucket=carprice-photo-source&height=1080&key=UC9c5O2SWa1.nDQQBLa4MN0ms7LQJHa2bgSmMtuupbLLJqgy36CtONem.c2S1ydeckjOV6UZScSntSj6i_m1Rcv-h-1rTHLmURtU&signature=cbd6f50d0a001b8bb25cdfbfef92dc22b57c5562&type=1&width=1920",
		"https://s5.carprice.photo/?bucket=carprice-photo-source&height=1080&key=FkOpvywiTX1.YnHZ3ba4zpjvakyVkZBIK81_zJ5nfEyO73HMmml0xpJv.jwQT4uurMrqEr6s6UsGF2_QxkGkGuW-RgO41m2zQxBU&signature=305c383206504288f253170b02f928bdc8f974bf&type=1&width=1920",
	"https://s10.carprice.photo/?bucket=carprice-photo-source&height=1080&key=UC9c5O2SWa1.nDQQBLa4MN0ms7LQJHa2bgSmMtuupbLLJqgy36CtONem.c2S1ydeckjOV6UZScSntSj6i_m1Rcv-h-1rTHLmURtU&signature=cbd6f50d0a001b8bb25cdfbfef92dc22b57c5562&type=1&width=1920",
	"https://s5.carprice.photo/?bucket=carprice-photo-source&height=1080&key=FkOpvywiTX1.YnHZ3ba4zpjvakyVkZBIK81_zJ5nfEyO73HMmml0xpJv.jwQT4uurMrqEr6s6UsGF2_QxkGkGuW-RgO41m2zQxBU&signature=305c383206504288f253170b02f928bdc8f974bf&type=1&width=1920",
	]
  },
  {
    "id": 4,
	"title": "Mercedes-Benz E-Класс I (W124), 2012",
	"brand": 			"Mercedes-Benz",
	"model": 			"E-Класс",
	"year":     		2012,
	"mileage":  		244000,
	"power":     		280,
	"owners":    		2,
	"price_rub": 		1390000,
	"engine_volume":   2.5,
	"handlebar": 		"left",
	"drive": 			"rear", //задний привод
	"color":     		"brown",
	"kpp": 				"automat",
	"body":				"sedan",// кузов
	"comment": 			`Mercedes-Benz E-Класс I (W124), 2010
	
Добро пожаловать в наш автосалон, где мы представляем эксклюзивный автомобиль Mercedes-Benz S-Класс AMG. Эта машина была приобретена у официального дилера и имеет оригинальный ПТС. Кузов полностью в заводском лакокрасочном покрытии, а зоны риска покрыты полиуретановой пленкой. Вы можете быть уверены, что этот автомобиль будет выглядеть как новый еще много лет.`,
	"fuel":      		"petrol",
	"post_country":		"Россия",
	"post_city":		"Москва",
	"vin":		 		"WDD2*************",
	"images": [
		"https://s5.carprice.photo/?bucket=carprice-photo-source&height=1080&key=edCDazVUa61.yluiKba4ZrKUnuS_ul6nT72LZLQciOSklIVksBKAbrgU.W4GkPuKsu4QsVAjkCC2qilHVtPPMlaQH7ttaVe4GvKY&signature=0d9eb6875f91396dce15b8e82d6f46f86d73f9fb&type=1&width=1920",
		"https://s8.carprice.photo/?bucket=carprice-photo-source&height=1080&key=hHGdFXNYB61.uEF287a4FKhARJalCq3VVWlRFq7IUpa-QF8WqsZaHKLA.7bnZ1MhGDhl967pW-nZhg91nLiUsSM3DRKYxlvJehA8&signature=036498354e2d61ba19b1394bf3834b4819f89329&type=1&width=1920"
	]
  },
]


export {
  allAutos
}