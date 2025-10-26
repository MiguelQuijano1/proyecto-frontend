import { 
  BarChart3, Database, FileUp, Settings, Users, TrendingUp, 
  LogOut, Menu, X, Vote, UserCheck, Building2, MapPinned,
  FileText, ShieldCheck, ClipboardList, Home, Zap
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
  const menuSections = [
    {
      title: 'General',
      items: [
        { id: 'dashboard', name: 'Inicio', icon: Home },
      ]
    },
    {
      title: 'Gestión Electoral',
      items: [
        { id: 'candidatos', name: 'Candidatos', icon: UserCheck },
        { id: 'partidos', name: 'Partidos Políticos', icon: Building2 },
        { id: 'votantes', name: 'Padrón Electoral', icon: Users },
        { id: 'mesas', name: 'Mesas de Votación', icon: MapPinned },
        { id: 'votacion', name: 'Proceso de Votación', icon: Vote },
        { id: 'resultados', name: 'Resultados', icon: BarChart3 },
      ]
    },
    {
      title: 'Análisis de Datos',
      items: [
        { id: 'datos', name: 'Gestión de Datos', icon: Database },
        { id: 'carga', name: 'Importar Datos', icon: FileUp },
        { id: 'limpieza', name: 'Limpieza de Datos', icon: Settings },
        { id: 'analisis', name: 'Análisis Estadístico', icon: TrendingUp },
        { id: 'visualizacion', name: 'Visualización', icon: BarChart3 },
      ]
    },
    {
      title: 'Administración',
      items: [
        { id: 'reportes', name: 'Reportes', icon: FileText },
        { id: 'auditoria', name: 'Auditoría', icon: ShieldCheck },
        { id: 'configuracion', name: 'Configuración', icon: ClipboardList },
      ]
    }
  ];

  return (
    <aside className={`${
      sidebarOpen ? 'w-72' : 'w-20'
    } bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-900 text-white transition-all duration-300 flex flex-col relative overflow-hidden`}>
      
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header del Sidebar */}
      <div className="relative p-5 flex items-center justify-between border-b border-white/10">
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">ONPE</h1>
              <p className="text-xs text-indigo-300">Sistema Electoral</p>
            </div>
          </div>
        )}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-110"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menú de Navegación */}
      <nav className="relative flex-1 p-4 overflow-y-auto custom-scrollbar">
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {sidebarOpen && (
              <h3 className="text-xs font-semibold text-indigo-300 uppercase mb-3 px-3 tracking-wider">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                          : 'text-indigo-200 hover:bg-white/10 hover:text-white'
                      }`}
                      title={!sidebarOpen ? item.name : ''}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                      )}
                      <Icon size={20} className={`relative z-10 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                      {sidebarOpen && (
                        <span className="text-sm font-medium relative z-10">{item.name}</span>
                      )}
                      {isActive && (
                        <div className="absolute right-0 w-1 h-8 bg-white rounded-l-full"></div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="relative p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-indigo-200 hover:bg-white/10 rounded-xl transition-all group">
          <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          {sidebarOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;