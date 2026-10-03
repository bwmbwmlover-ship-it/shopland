import {rawDb} from '@/db/shop';
import {defaultContent,type Announcement,type SiteContent} from '@/lib/content';

export async function getSiteContent():Promise<SiteContent>{
 const row=await rawDb().prepare('SELECT data FROM site_content WHERE id=?').bind('main').first<{data:string}>();
 if(!row)return defaultContent;
 const saved=JSON.parse(row.data) as SiteContent;
 return {...defaultContent,...saved,texts:{...defaultContent.texts,...saved.texts}};
}
export async function getAnnouncements(userId:string|null,includeDrafts=false):Promise<Announcement[]>{
 const rows=await rawDb().prepare(`SELECT a.*,COALESCE(r.read_revision,0) AS read_revision FROM announcements a LEFT JOIN announcement_reads r ON r.announcement_id=a.id AND r.user_id=? ${includeDrafts?'':'WHERE a.published=1'} ORDER BY a.updated_at DESC,a.id DESC LIMIT ${includeDrafts?500:100}`).bind(userId||'').all<Record<string,unknown>>();
 return rows.results.map(r=>({id:String(r.id),title:JSON.parse(String(r.title)),body:JSON.parse(String(r.body)),kind:r.kind as Announcement['kind'],promoCode:String(r.promo_code),published:Number(r.published),revision:Number(r.revision),createdAt:String(r.created_at),updatedAt:String(r.updated_at),read:Number(r.read_revision)>=Number(r.revision)}));
}
