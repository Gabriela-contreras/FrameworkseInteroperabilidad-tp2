import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema de Gestión Inventario',
  description: 'Sistema de autenticación y gestión de productos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

