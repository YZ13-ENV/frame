import '@/app/globals.css'
import '@/app/local.css'
import { Metadata } from "next";
import { Spectral, Geologica } from 'next/font/google'
import StateProvider from '@/components/StateProvider'
const first_font = Geologica({ subsets: ['latin', 'cyrillic'], weight: ['600', '500', '400'], variable: '--root-font' })
const second_font = Spectral({ subsets: ['latin', 'cyrillic'], weight: ['600', '400'], variable: '--second-font' })

export const metadata: Metadata = {
  title: 'frame',
  icons: ['ui/assets/bum.svg']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${first_font.className} ${first_font.variable} ${second_font.variable}`}>
        <body id='root' className='w-full min-h-screen dark'>
          <StateProvider>
            {children}
          </StateProvider>
        </body>
      </html>
  );
}
