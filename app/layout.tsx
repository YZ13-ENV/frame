import '@/app/globals.css';
import '@/app/local.css';
import StateProvider from '@/components/StateProvider';
import { WebVitals } from "@darkmaterial/ui";
import '@darkmaterial/ui/dist/style.css';
import { Metadata } from "next";
import { Geologica, Spectral } from 'next/font/google';
const first_font = Geologica({ subsets: ['latin', 'cyrillic'], weight: ['600', '500', '400'], variable: '--root-font' })
const second_font = Spectral({ subsets: ['latin', 'cyrillic'], weight: ['600', '400'], variable: '--second-font' })

export const metadata: Metadata = {
  title: 'Frame',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${first_font.className} ${first_font.variable} ${second_font.variable}`}>
      <body id='root' className='w-full min-h-screen dark'>
        <WebVitals appId="darkmaterial-frame" />
        <StateProvider>
          {children}
        </StateProvider>
      </body>
    </html>
  );
}
