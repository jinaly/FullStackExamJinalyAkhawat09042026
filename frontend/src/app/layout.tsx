import { Suspense } from 'react';
import './globals.css';
import Header from '../components/Header';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'NextGen E-Commerce',
  description: 'A full-stack e-commerce experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors position="top-right" />
        <Suspense>
          <Header />
        </Suspense>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
