import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ConfigProvider, App } from 'antd';
import AuthProvider from '@/components/providers/AuthProvider';
import Navbar from '@/components/Navbar';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MoneyTracker - Personal Finance Management',
  description:
    'The most intuitive way to manage your finances. Beautiful, simple, and secure.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.variable}>
      <body className='font-sans antialiased bg-white text-gray-900'>
        <AuthProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#007AFF',
                colorSuccess: '#34C759',
                colorWarning: '#FF9500',
                colorError: '#FF3B30',
                colorInfo: '#5AC8FA',
                borderRadius: 12,
                fontFamily:
                  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: 16,
                lineHeight: 1.5,
              },
              components: {
                Button: {
                  borderRadius: 50,
                  fontWeight: 500,
                },
                Card: {
                  borderRadius: 24,
                },
                Input: {
                  borderRadius: 12,
                },
              },
            }}
          >
            <App>
              <Navbar />
              <main className='min-h-screen'>{children}</main>
            </App>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
