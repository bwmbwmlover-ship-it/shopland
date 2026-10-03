'use client';
import {Bell,CheckCheck,ChevronRight,Newspaper,Sparkles,Ticket,X} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {Empty,EmptyHeader,EmptyMedia,EmptyTitle,EmptyDescription} from '@/components/ui/empty';
import {translator,locale} from '@/lib/i18n';
import type {Lang} from '@/lib/catalog';
import type {Announcement} from '@/lib/content';

type FeedProps={lang:Lang;announcements:Announcement[];onOpen:(a:Announcement)=>void};
function AnnouncementCard({lang,announcement:a,onOpen}:{lang:Lang;announcement:Announcement;onOpen:(a:Announcement)=>void}){
 const t=translator(lang);
 return <button className={'announcement-card '+(a.read?'':'is-unread')} onClick={()=>onOpen(a)}><span className={'announcement-symbol '+a.kind}>{a.kind==='promotion'?<Sparkles size={23}/>:<Newspaper size={23}/>}</span><span className="announcement-meta"><span>{t(a.kind==='promotion'?'announcementPromotion':'announcementNews')}</span><time>{new Date(a.updatedAt).toLocaleDateString(locale(lang))}</time>{!a.read&&<span className="announcement-unread" title={t('unread')}><span className="sr-only">{t('unread')}</span></span>}</span><strong>{a.title[lang]}</strong><span className="announcement-excerpt">{a.body[lang]}</span><span className="announcement-read-link">{t('readAnnouncement')}<ChevronRight size={16}/></span></button>;
}
export function LatestAnnouncements({lang,announcements,onOpen,onAll}:FeedProps&{onAll:()=>void}){
 const t=translator(lang);if(!announcements.length)return null;
 return <section className="latest-announcements"><div className="section-heading"><div><h2>{t('latestAnnouncements')}</h2><p>{t('notificationsIntro')}</p></div><button onClick={onAll}>{t('seeAll')}<ChevronRight size={16}/></button></div><div className="announcement-grid">{announcements.slice(0,3).map(a=><AnnouncementCard key={a.id} lang={lang} announcement={a} onOpen={onOpen}/>)}</div></section>;
}
export function NotificationInbox({lang,announcements,onOpen,busy,canMarkRead,onReadAll,loaded}:FeedProps&{busy:boolean;canMarkRead:boolean;onReadAll:()=>void;loaded:boolean}){
 const t=translator(lang),unread=announcements.filter(a=>!a.read).length;
 return <section className="notifications-page"><div className="page-heading"><div><span className="admin-eyebrow">SHOPLAND / {t('notifications')}</span><h1>{t('notifications')}{unread>0&&<span>{unread}</span>}</h1><p className="admin-description">{t('notificationsIntro')}</p></div>{canMarkRead&&unread>0&&<button className="outline-button" disabled={busy} onClick={onReadAll}><CheckCheck size={17}/>{t('markAllRead')}</button>}</div>{!loaded?<p role="status" className="admin-description">{t('loading')}</p>:announcements.length?<div className="announcement-grid">{announcements.map(a=><AnnouncementCard key={a.id} lang={lang} announcement={a} onOpen={onOpen}/>)}</div>:<Empty className="empty-state"><EmptyHeader><EmptyMedia><Bell size={40}/></EmptyMedia><EmptyTitle>{t('noAnnouncements')}</EmptyTitle><EmptyDescription>{t('noAnnouncementsText')}</EmptyDescription></EmptyHeader></Empty>}</section>;
}
export function AnnouncementDetail({lang,announcement:a,onClose,onOffers,onPromo}: {lang:Lang;announcement:Announcement|null;onClose:()=>void;onOffers:()=>void;onPromo:(code:string)=>void}){
 const t=translator(lang);
 return <Dialog open={!!a} onOpenChange={open=>!open&&onClose()}><DialogContent className="announcement-detail-dialog" showCloseButton={false}><button className="modal-close" aria-label={t('close')} onClick={onClose}><X size={20}/></button>{a&&<><span className={'announcement-symbol '+a.kind}>{a.kind==='promotion'?<Sparkles size={27}/>:<Newspaper size={27}/>}</span><div className="announcement-meta"><span>{t(a.kind==='promotion'?'announcementPromotion':'announcementNews')}</span><time>{new Date(a.updatedAt).toLocaleDateString(locale(lang))}</time></div><DialogTitle>{a.title[lang]}</DialogTitle><DialogDescription className="sr-only">{t('notificationsIntro')}</DialogDescription><p className="announcement-body">{a.body[lang]}</p>{a.promoCode&&<div className="announcement-code-box"><Ticket size={20}/><div><small>{t('promoCode')}</small><strong>{a.promoCode}</strong></div><button className="primary-button" onClick={()=>onPromo(a.promoCode)}>{t('usePromo')}</button></div>}{a.kind==='promotion'&&<button className="outline-button" onClick={onOffers}>{t('browseOffers')}<ChevronRight size={16}/></button>}</>}</DialogContent></Dialog>;
}
