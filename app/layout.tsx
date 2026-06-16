import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NexUAN - Sistema de Gestão de Unidades de Alimentação e Nutrição',
  description: 'Plataforma SaaS para gestão de UANs com conformidade Anvisa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  🍽️ NexUAN
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  Sair
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
