import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 metadataBase: new URL('https://john-wilson.well-song-2899.chatgpt.site'),
 title:'John Wilson | Technology Leadership & Solution Architecture',
 description:'Technology leader with 10+ years of international experience across solution architecture, engineering, cloud and enterprise delivery. Explore John Wilson’s experience and AI transformation focus.',
 alternates:{canonical:'/'},
 openGraph:{title:'John Wilson | Business clarity. Technical depth.',description:'Technology leadership, solution architecture and disciplined delivery.',type:'website',locale:'en_GB',url:'/'},
 twitter:{card:'summary',title:'John Wilson | Technology Leadership',description:'Business clarity. Technical depth.'},
 icons:{icon:'/favicon.svg'}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en-GB"><body>{children}</body></html>}
