import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

// ── Viewport y UI ─────────────────────────────────────────────
// Controla el comportamiento en dispositivos móviles y el color de la barra del navegador
export const viewport = {
  themeColor: '#FDFBF7', // Color crema de nuestra nueva paleta
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// ── Metadata SEO ──────────────────────────────────────────────
export const metadata = {
  // CRUCIAL: Reemplaza esto con el dominio real en producción para que las imágenes funcionen
  metadataBase: new URL('https://magicgourmet.strategiccode.cl'), 

  title: {
    default: 'MagicGourmet | Alta Gastronomía y Carta Digital',
    template: '%s | MagicGourmet', // Ej: "Reservar Mesa | MagicGourmet"
  },
  description: 'Explora la carta digital de MagicGourmet. Descubre nuestra propuesta de alta gastronomía, cocina de autor y reserva tu mesa en línea de manera exclusiva.',
  keywords: ['alta gastronomía', 'cocina de autor', 'restaurante', 'reservas online', 'carta digital', 'MagicGourmet', 'cenas exclusivas'],
  
  authors: [{ name: 'StrategicCode' }],
  creator: 'StrategicCode',

  openGraph: {
    type: 'website',
    locale: 'es_CL', // Ajustado a Chile
    url: 'https://magicgourmet.strategiccode.cl',
    siteName: 'MagicGourmet',
    title: 'MagicGourmet | Alta Gastronomía',
    description: 'Descubre nuestra propuesta de cocina de autor y reserva tu mesa en línea.',
    images: [
      {
        url: '/assets/og-image.jpg', // Crea una imagen de 1200x630px atractiva y ponla en /public/assets
        width: 1200,
        height: 630,
        alt: 'Platillo de alta gastronomía en MagicGourmet',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'MagicGourmet | Carta Digital',
    description: 'Explora nuestra propuesta de alta gastronomía y reserva tu mesa.',
    images: ['/assets/og-image.jpg'], 
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  alternates: {
    canonical: 'https://magicgourmet.strategiccode.cl',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}