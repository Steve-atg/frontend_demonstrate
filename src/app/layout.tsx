import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ConfigProvider, App } from 'antd';
import Navbar from '@/components/Navbar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MoneyTracker - Personal Finance Management',
  description:
    'Take control of your finances with MoneyTracker. Track expenses, monitor income, and achieve your financial goals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1677ff',
              fontFamily: 'var(--font-geist-sans)',
            },
          }}
        >
          <App>
            <Navbar />
            {children}
          </App>
        </ConfigProvider>
      </body>
    </html>
  );
}
