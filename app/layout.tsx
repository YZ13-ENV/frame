import "ui/styles/globals.css";
import '@/app/local.css'
import { Metadata } from "next";
import StateProvider from '@/components/StateProvider'
import { BodyWrapper, HtmlWrapper } from "@darkmaterial/ui/shared";
import { SessionPicker } from "@darkmaterial/ui/widgets";
import { SessionWatcher, TokenWatcher } from "@darkmaterial/ui/entities";

export const metadata: Metadata = {
  title: 'Dark Material',
  icons: ['ui/assets/bum.svg']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StateProvider>
      <HtmlWrapper>
        <BodyWrapper>
          <SessionWatcher />
          <TokenWatcher />
          <SessionPicker />
          {children}
        </BodyWrapper>
      </HtmlWrapper>
    </StateProvider>
  );
}
