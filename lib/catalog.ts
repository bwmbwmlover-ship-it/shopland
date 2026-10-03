export type Lang = 'uz' | 'ru' | 'en';
export type LocalText = Record<Lang,string>;
export type Category = 'electronics' | 'fashion' | 'home' | 'beauty' | 'sport';
export type Product = {id:string;name:LocalText;description:LocalText;category:Category;brand:string;price:number;oldPrice:number;image:string;stock:number;active:number;isNew:number;featured:number;variants:string[]};
const names: [string,Category,string,number,number,string,string,string][] = [
 ['headphones','electronics','Audio',449000,649000,'Simsiz premium quloqchin','Беспроводные полноразмерные наушники','Wireless over-ear headphones'],
 ['earbuds','electronics','Audio',219000,299000,'Ixcham simsiz quloqchinlar','Компактные беспроводные наушники','Compact wireless earbuds'],
 ['sneakers','fashion','Everyday',329000,449000,'Kundalik krossovka','Кроссовки на каждый день','Everyday sneakers'],
 ['smartwatch','electronics','Tech',379000,499000,'Aqlli soat','Умные часы','Smartwatch'],
 ['backpack','fashion','Everyday',259000,349000,'Kundalik ryukzak','Городской рюкзак','Everyday backpack'],
 ['skincare','beauty','Care',149000,189000,'Yuz uchun parvarish vositasi','Средство для ухода за лицом','Facial skincare'],
 ['phone','electronics','Tech',2499000,2899000,'Smartfon','Смартфон','Smartphone'],
 ['laptop','electronics','Tech',7299000,7999000,'Kundalik ish uchun noutbuk','Ноутбук для повседневной работы','Everyday laptop'],
 ['sunglasses','fashion','Everyday',129000,179000,'Quyoshdan saqlovchi ko‘zoynak','Солнцезащитные очки','Sunglasses'],
 ['coffee','home','Living',899000,1099000,'Kofe mashinasi','Кофемашина','Coffee machine'],
 ['lamp','home','Living',239000,319000,'Stol chirog‘i','Настольная лампа','Desk lamp'],
 ['gaming-mouse','electronics','Gaming',289000,359000,'O‘yin uchun sichqoncha','Игровая мышь','Gaming mouse'],
 ['chair','home','Living',1299000,1599000,'Yog‘och stul','Деревянный стул','Wooden chair'],
 ['cushion','home','Living',99000,139000,'Dekorativ yostiq','Декоративная подушка','Decorative cushion'],
 ['sport','sport','Active',199000,249000,'Sport uchun gantellar','Гантели для тренировок','Workout dumbbells'],
];
const desc:Record<Category,LocalText>={
 electronics:{uz:'Kundalik hayotingiz uchun qulay texnika. Model, o‘lcham va komplektni buyurtma tasdiqlanishidan oldin administrator bilan aniqlashtiring.',ru:'Удобная техника на каждый день. Уточните модель, размеры и комплектацию у администратора перед подтверждением заказа.',en:'Practical technology for everyday life. Confirm the model, dimensions and included accessories with the administrator before your order is approved.'},
 fashion:{uz:'Kundalik uslubingizga mos tanlov. O‘lcham va materialni buyurtma tasdiqlanishidan oldin administrator bilan aniqlashtiring.',ru:'Выбор для вашего повседневного стиля. Уточните размер и материал у администратора перед подтверждением заказа.',en:'A choice for your everyday style. Confirm the size and material with the administrator before your order is approved.'},
 home:{uz:'Uyingiz uchun foydali topilma. O‘lcham, material va komplektni buyurtma tasdiqlanishidan oldin administrator bilan aniqlashtiring.',ru:'Полезная находка для дома. Уточните размеры, материал и комплектацию перед подтверждением заказа.',en:'A useful find for your home. Confirm dimensions, material and included items before your order is approved.'},
 beauty:{uz:'Kundalik parvarish uchun tanlov. Tarkib, hajm va yaroqlilik muddatini administrator bilan aniqlashtiring.',ru:'Выбор для ежедневного ухода. Уточните состав, объём и срок годности у администратора.',en:'A choice for daily care. Confirm ingredients, volume and expiry date with the administrator.'},
 sport:{uz:'Mashg‘ulotlar uchun foydali jihoz. Vazn va komplektni buyurtma tasdiqlanishidan oldin administrator bilan aniqlashtiring.',ru:'Полезный инвентарь для тренировок. Уточните вес и комплектацию перед подтверждением заказа.',en:'Useful equipment for training. Confirm the weight and included items before your order is approved.'}
};
export const seedProducts:Product[]=names.map(([id,category,brand,price,oldPrice,uz,ru,en],i)=>({id,category,brand,price,oldPrice,name:{uz,ru,en},description:desc[category],image:`/products/${id}.webp`,stock:20,active:1,isNew:i%3===0?1:0,featured:i<5?1:0,variants:id==='sneakers'?['38','39','40','41','42','43']:['standard']}));
export type CartItem={productId:string;variant:string;quantity:number};
export type OrderItem={productId:string;name:LocalText;image:string;variant:string;quantity:number;price:number};
export type Order={id:string;user_id:string;number:string;name:string;phone:string;city:string;address:string;delivery:string;payment:string;promo:string;subtotal:number;discount:number;shipping:number;total:number;status:string;created_at:string;items:OrderItem[];note:string};
export type Message={id:string;user_id:string;sender:string;body:string;created_at:string};
export const deliveryFee=(subtotal:number,delivery:string)=>delivery==='pickup'||subtotal>=500000?0:25000;
export function promoDiscount(code:string,subtotal:number){if(code==='SHOP10')return Math.min(Math.floor(subtotal*.1),150000);return 0;}
