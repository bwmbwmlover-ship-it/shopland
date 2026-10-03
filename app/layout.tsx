import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'ShopLand — sevimli xaridlaringiz shu yerda',
  description: 'Elektronika, moda, uy jihozlari va kundalik topilmalar. ShopLand katalogini ko‘ring, istaklaringizni saqlang va buyurtma bering.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) { return <html lang="uz"><body>{children}</body></html>; }
