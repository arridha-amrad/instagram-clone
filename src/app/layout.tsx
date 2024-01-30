import AuthProvider from '@/providers/AuthProvider';
import { Providers } from '@/providers/UiProvider';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import getServerSideSession from '@/utils/getServerSideSession';
import { Inter } from 'next/font/google';
import BottomBar from '@/components/bottom-bar/BottomBar';
import Sidebar from '@/components/sidebar';
import { PostProvider } from '@/providers/PostProvider';

export const metadata: Metadata = {
  title: 'Nextgram',
  description: 'Instagram Future'
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get('theme')?.value;

  const session = await getServerSideSession();

  return (
    <html lang="en" className={`${theme ?? 'dark'} ${inter.className}`}>
      <body>
        <AuthProvider>
          <NextTopLoader showSpinner={false} color="#0095F6" />
          <Providers>
            {session ? (
              <div className="flex w-full">
                <BottomBar />
                <div className="sticky h-screen inset-y-0 left-0">
                  <Sidebar />
                </div>
                <div className="w-full">{children}</div>
              </div>
            ) : (
              children
            )}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
