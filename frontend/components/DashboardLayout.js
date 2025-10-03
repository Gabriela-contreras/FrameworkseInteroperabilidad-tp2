'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { logout, getUser } from '@/lib/auth';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = getUser();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navigation = [
    { name: 'Productos', href: '/dashboard/productos', icon: '' },
    { name: 'Contactar', href: '/dashboard/contactar', icon: '' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar superior */}
      <nav className="bg-white shadow-lg fixed w-full z-10">
        <div className="max-w-7xl mx-auto ">
          <div className="flex justify-between h-16">

            <div className="flex items-center justify-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="ml-4 text-xl font-bold text-gray-900">
                Sistema de Gestión
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{user?.nombre}</span>
                {/* <span className="text-gray-500 ml-2">Doc: {user?.documento}</span> */}
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? 'w-64' : 'w-0'
            } bg-white shadow-lg h-screen fixed overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <nav className="mt-5 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${isActive
                      ? 'bg-primary-100 text-primary-900 border-l-4 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    } group flex items-center px-3 py-3 text-sm font-medium rounded-md mb-2 transition-colors duration-200`}
                >
                  {item.name}
                </a>
              );
            })}
            
          </nav>

        </aside>

        {/* Main content */}
        <main
          className={`${sidebarOpen ? 'ml-64' : 'ml-0'
            } flex-1 transition-all duration-300 ease-in-out p-8`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

