import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Petualangan Pixel Matematika - Interactive Kids Learning',
  description: 'Aplikasi pembelajaran interaktif anak berbasis cerita pixel dan suara AI.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon.svg',
    apple: '/icons/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#38bdf8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch((err) => {
                    console.log('SW registration error:', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className="bg-sky-100 text-slate-800 antialiased min-h-screen selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
