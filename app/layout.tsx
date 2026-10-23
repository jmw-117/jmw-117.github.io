import type { Metadata } from 'next';
import content from '../lib/site-content.json';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(content.origin),
  title: content.title,
  description: content.description,
  alternates: { canonical: '/' },
  openGraph: { title: content.title, description: content.description, type: 'website', locale: 'en_GB', url: '/', images: [{ url: '/john-wilson.jpg', alt: 'John Wilson' }] },
  twitter: { card: 'summary', title: content.title, description: content.description },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body>{children}</body></html>;
}
