import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import GestionDatos from './pages/GestionDatos';
import CargaDatos from './pages/CargaDatos';
import LimpiezaDatos from './pages/LimpiezaDatos';
import AnalisisEstadistico from './pages/AnalisisEstadistico';
import Visualizacion from './pages/Visualizacion';
import RegistroVotantes from './pages/RegistroVotantes';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'datos': return <GestionDatos />;
      case 'carga': return <CargaDatos />;
      case 'limpieza': return <LimpiezaDatos />;
      case 'analisis': return <AnalisisEstadistico />;
      case 'visualizacion': return <Visualizacion />;
      case 'votantes': return <RegistroVotantes />;
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