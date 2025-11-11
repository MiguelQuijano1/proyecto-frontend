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
      ]
    },
    {
      title: 'Análisis de Datos',
      items: [
        { id: 'datos', name: 'Gestión de Datos', icon: Database },
        { id: 'carga', name: 'Importar Datos', icon: FileUp },
        { id: 'limpieza', name: 'Deteccion de Fraudes', icon: Settings },
        { id: 'analisis', name: 'Análisis Estadístico', icon: TrendingUp },
        { id: 'visualizacion', name: 'Visualización', icon: BarChart3 },
      ]
    },
    {
      title: 'Administración',
      items: [
        { id: 'reportes', name: 'Reportes', icon: FileText },
      ]
    }
  ];

  return (
    <aside 
      className={`${sidebarOpen ? 'w-72' : 'w-20'} transition-all duration-300 flex flex-col relative overflow-hidden`}
      style={{
        background: 'linear-gradient(180deg, #0f172a 0%, #312e81 50%, #581c87 100%)'
      }}
    >
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="absolute top-0 left-0 rounded-full animate-pulse"
          style={{
            width: '288px',
            height: '288px',
            background: '#6366f1',
            filter: 'blur(80px)'
          }}
        />
        <div 
          className="absolute bottom-0 right-0 rounded-full animate-pulse"
          style={{
            width: '288px',
            height: '288px',
            background: '#a855f7',
            filter: 'blur(80px)',
            animationDelay: '1s'
          }}
        />
      </div>

      {/* Header del Sidebar */}
      <div className="relative p-5 flex items-center justify-between border-b border-white border-opacity-10">
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #818cf8 0%, #a855f7 100%)'
              }}
            >
              <Zap className="text-white" size={20} />
            </div>
            <div>
              <h1 
                className="text-xl font-bold"
                style={{
                  background: 'linear-gradient(90deg, #ffffff 0%, #c7d2fe 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                ONPE
              </h1>
              <p className="text-xs text-indigo-300">Sistema Electoral</p>
            </div>
          </div>
        )}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 text-white"
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
                          ? 'text-white shadow-lg'
                          : 'text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white'
                      }`}
                      style={isActive ? {
                        background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                        boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.5)'
                      } : {}}
                      title={!sidebarOpen ? item.name : ''}
                    >
                      {isActive && (
                        <div 
                          className="absolute inset-0 animate-pulse"
                          style={{
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, transparent 100%)'
                          }}
                        />
                      )}
                      <Icon 
                        size={20} 
                        className={`relative z-10 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} 
                      />
                      {sidebarOpen && (
                        <span className="text-sm font-medium relative z-10">{item.name}</span>
                      )}
                      {isActive && (
                        <div 
                          className="absolute right-0 w-1 h-8 bg-white rounded-l-full"
                        />
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
      <div className="relative p-4 border-t border-white border-opacity-10">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-indigo-200 hover:bg-white hover:bg-opacity-10 rounded-xl transition-all group">
          <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          {sidebarOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;