import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ConvexClientProvider } from '@/components/providers/convex-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portion',
  description: 'Portion pages for working with documents',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.png',
        href: '/logo-dark.png',
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.png',
        href: '/logo.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            defaultTheme="system"
            storageKey="portion-theme"
          >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
