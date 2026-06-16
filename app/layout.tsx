import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NexUAN - Sistema de Gestão de Unidades de Alimentação e Nutrição',
  description: 'Plataforma SaaS para gestão de UANs com conformidade Anvisa RDC 216 e RDC 429/2020',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50" style={{ fontFamily: 'Quicksand, sans-serif' }}>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md"
                style={{ backgroundColor: '#385e81' }}
              >
                N
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#385e81' }}>NexUAN</h1>
                <p className="text-xs text-slate-500">Instituto Nutrir</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-10">
              <a href="#modules" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition">
                Módulos
              </a>
              <a href="#" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition">
                Documentação
              </a>
              <a href="#" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition">
                Suporte
              </a>
              <div className="h-6 w-px bg-slate-300" />
              <button
                className="text-sm font-medium px-4 py-2 rounded-lg transition"
                style={{
                  backgroundColor: '#385e81',
                  color: 'white'
                }}
              >
                Minha Conta
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
          {children}
        </main>

        {/* Footer */}
        <footer
          className="border-t text-white py-12 mt-20"
          style={{ backgroundColor: '#385e81' }}
        >
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-4 gap-12 mb-12">
              <div>
                <h3 className="font-bold text-sm mb-4 opacity-90">Produto</h3>
                <ul className="space-y-2 text-sm opacity-75">
                  <li><a href="#" className="hover:opacity-100 transition">Módulos</a></li>
                  <li><a href="#" className="hover:opacity-100 transition">Documentação</a></li>
                  <li><a href="#" className="hover:opacity-100 transition">Recursos</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-4 opacity-90">Conformidade</h3>
                <ul className="space-y-2 text-sm opacity-75">
                  <li><a href="#" className="hover:opacity-100 transition">RDC 216</a></li>
                  <li><a href="#" className="hover:opacity-100 transition">RDC 429/2020</a></li>
                  <li><a href="#" className="hover:opacity-100 transition">IN 75/2020</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-4 opacity-90">Empresa</h3>
                <ul className="space-y-2 text-sm opacity-75">
                  <li><a href="#" className="hover:opacity-100 transition">Instituto Nutrir</a></li>
                  <li><a href="#" className="hover:opacity-100 transition">Contato</a></li>
                  <li><a href="#" className="hover:opacity-100 transition">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-4 opacity-90">Legal</h3>
                <ul className="space-y-2 text-sm opacity-75">
                  <li><a href="#" className="hover:opacity-100 transition">Privacidade</a></li>
                  <li><a href="#" className="hover:opacity-100 transition">Termos</a></li>
                  <li><a href="#" className="hover:opacity-100 transition">Segurança</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white border-opacity-20 pt-8 flex justify-between items-center text-sm opacity-75">
              <p>© 2026 NexUAN. Todos os direitos reservados.</p>
              <p>Um produto do Instituto Nutrir | De Nutricionistas para Nutricionistas</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
