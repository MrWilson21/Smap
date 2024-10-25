import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { Bellota } from 'next/font/google';
const inter = Bellota({ subsets: ['latin'], weight: "300" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
