import {translations} from '@/lib/i18n';
import type {Category,Lang,LocalText} from '@/lib/catalog';

export const contentFields=[
 {key:'heroEyebrow',label:'contentHeroEyebrow',source:'season',max:80,multiline:false},
 {key:'heroTitle',label:'contentHeroTitle',source:'heroTitle',max:160,multiline:true},
 {key:'heroSubtitle',label:'contentHeroSubtitle',source:'heroSub',max:500,multiline:true},
 {key:'heroButton',label:'contentHeroButton',source:'seeFinds',max:60,multiline:false},
 {key:'shippingBanner',label:'contentShippingBanner',source:'freeShipping',max:180,multiline:false},
 {key:'catalogTitle',label:'contentCatalogTitle',source:'forYou',max:100,multiline:false},
 {key:'catalogSubtitle',label:'contentCatalogSubtitle',source:'subtitle',max:300,multiline:true},
 {key:'supportTitle',label:'contentSupportTitle',source:'supportTitle',max:160,multiline:false},
 {key:'supportText',label:'contentSupportText',source:'supportSub',max:1000,multiline:true},
 {key:'aboutText',label:'contentAbout',source:'aboutText',max:3000,multiline:true},
] as const;
export type ContentTextKey=typeof contentFields[number]['key'];
export type SiteContent={texts:Record<ContentTextKey,LocalText>;heroProductId:string;heroTarget:'sale'|'all'|Category};
export const defaultContent:SiteContent={
 texts:Object.fromEntries(contentFields.map(f=>[f.key,Object.fromEntries((['uz','ru','en'] as Lang[]).map(l=>[l,translations[l][f.source]]))])) as SiteContent['texts'],
 heroProductId:'headphones',heroTarget:'sale',
};
export type Announcement={id:string;title:LocalText;body:LocalText;kind:'news'|'promotion';promoCode:string;published:number;revision:number;createdAt:string;updatedAt:string;read:boolean};
