import { BarChart3, Database, FileUp, Settings, Users, TrendingUp, LogOut, Menu, X } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'datos', name: 'Gestión de Datos', icon: Database },
    { id: 'carga', name: 'Cargar Datos', icon: FileUp },
    { id: 'limpieza', name: 'Limpieza de Datos', icon: Settings },
    { id: 'analisis', name: 'Análisis Estadístico', icon: TrendingUp },
    { id: 'visualizacion', name: 'Visualización', icon: BarChart3 },
    { id: 'votantes', name: 'Registro de Votantes', icon: Users },
  ];

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-900 text-white transition-all duration-300 flex flex-col`}>
      {/* Header del Sidebar */}
      <div className="p-4 flex items-center justify-between border-b border-indigo-800">
        {sidebarOpen && (
          <div>
            <h1 className="text-xl font-bold">Sistema Electoral</h1>
            <p className="text-xs text-indigo-300">Análisis de Datos</p>
          </div>
        )}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-indigo-800 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-200 hover:bg-indigo-800'
                  }`}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span>{item.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-indigo-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-indigo-200 hover:bg-indigo-800 rounded-lg transition-colors">
          <LogOut size={20} />
          {sidebarOpen && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;