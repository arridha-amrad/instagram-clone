'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { update } = useSession();

  useEffect(() => {
    update();
  }, []);

  return (
    <NextUIProvider navigate={router.push}>
      <main className="text-foreground bg-background">
        <div className="container mx-auto min-h-screen">{children}</div>
      </main>
    </NextUIProvider>
  );
}
