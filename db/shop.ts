import {env} from 'cloudflare:workers';
import {seedProducts,type Product,type Order} from '@/lib/catalog';
export function rawDb():D1Database {const db=(env as unknown as {DB?:D1Database}).DB;if(!db)throw new Error('D1 unavailable');return db;}
export function adminEmail(){return (env as unknown as {SHOPLAND_ADMIN_EMAIL?:string}).SHOPLAND_ADMIN_EMAIL?.toLowerCase()||'';}
let seeded=false;
export async function ensureCatalog(){if(seeded)return;const db=rawDb();await db.batch([...seedProducts.map(p=>db.prepare('INSERT OR IGNORE INTO products (id,name,description,category,brand,price,old_price,image,stock,active,is_new,featured,variants) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(p.id,JSON.stringify(p.name),JSON.stringify(p.description),p.category,p.brand,p.price,p.oldPrice,p.image,p.stock,p.active,p.isNew,p.featured,JSON.stringify(p.variants))),db.prepare('INSERT OR IGNORE INTO promos (code,percent,cap,active) VALUES (?,?,?,1)').bind('SHOP10',10,150000)]);seeded=true;}
export function productFromRow(r:Record<string,unknown>):Product{return {id:String(r.id),name:JSON.parse(String(r.name)),description:JSON.parse(String(r.description)),category:r.category as Product['category'],brand:String(r.brand),price:Number(r.price),oldPrice:Number(r.old_price),image:String(r.image),stock:Number(r.stock),active:Number(r.active),isNew:Number(r.is_new),featured:Number(r.featured),variants:JSON.parse(String(r.variants))};}
export function orderFromRow(r:Record<string,unknown>):Order{return {...r,items:JSON.parse(String(r.items))} as unknown as Order;}
