import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Páginas existentes
import Dashboard from './pages/Dashboard';
import GestionDatos from './pages/GestionDatos';
import CargaDatos from './pages/CargaDatos';
import LimpiezaDatos from './pages/LimpiezaDatos';
import AnalisisEstadistico from './pages/AnalisisEstadistico';
import Visualizacion from './pages/Visualizacion';
import RegistroVotantes from './pages/RegistroVotantes';

// Nuevas páginas
import Candidatos from './pages/Candidatos';
import PartidosPoliticos from './pages/PartidosPoliticos';
import MesasVotacion from './pages/MesasVotacion';
import Votacion from './pages/Votacion';
import ResultadosElectorales from './pages/ResultadosElectorales';
import Reportes from './pages/Reportes';
import Configuracion from './pages/Configuracion';
import Auditoria from './pages/Auditoria';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard': return <Dashboard />;
      
      // Módulo Electoral
      case 'candidatos': return <Candidatos />;
      case 'partidos': return <PartidosPoliticos />;
      case 'mesas': return <MesasVotacion />;
      case 'votacion': return <Votacion />;
      case 'resultados': return <ResultadosElectorales />;
      case 'votantes': return <RegistroVotantes />;
      
      // Módulo de Datos
      case 'datos': return <GestionDatos />;
      case 'carga': return <CargaDatos />;
      case 'limpieza': return <LimpiezaDatos />;
      case 'analisis': return <AnalisisEstadistico />;
      case 'visualizacion': return <Visualizacion />;
      
      // Módulo de Administración
      case 'reportes': return <Reportes />;
      case 'auditoria': return <Auditoria />;
      case 'configuracion': return <Configuracion />;
      
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <main className="flex-1 overflow-auto">
        <Header 
          activeSection={activeSection}
          sidebarOpen={sidebarOpen}
        />
        
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;