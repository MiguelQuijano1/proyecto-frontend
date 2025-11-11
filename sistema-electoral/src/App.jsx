// sistema-electoral/src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Candidatos from './pages/Candidatos';
import ResultadosElectorales from './pages/ResultadosElectorales';
import Reportes from './pages/Reportes';

// Páginas de autenticación
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';

// Componente ProtectedRoute para proteger rutas del dashboard
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Verificar si hay sesión activa al cargar
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Función para manejar login exitoso
  const handleLoginSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', 'admin');
    setIsAuthenticated(true);
  };

  // Función para manejar logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setActiveSection('dashboard');
  };

  // Componente DashboardLayout para las rutas protegidas
  const DashboardLayout = () => {
    // Función para renderizar el contenido según la sección activa
    const renderContent = () => {
      switch(activeSection) {
        case 'dashboard': return <Dashboard />;
        case 'resultados': return <ResultadosElectorales />;
        
        // Módulo Electoral
        case 'candidatos': return <Candidatos />;
        case 'votantes': return <RegistroVotantes />;
        
        // Módulo de Datos
        case 'datos': return <GestionDatos />;
        case 'carga': return <CargaDatos />;
        case 'limpieza': return <LimpiezaDatos />;
        case 'analisis': return <AnalisisEstadistico />;
        case 'visualizacion': return <Visualizacion />;
        
        // Módulo de Administración
        case 'reportes': return <Reportes />;
        
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
          onLogout={handleLogout}
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
  };

  return (
    <Router>
      <Routes>
        {/* Ruta pública - Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Ruta de login */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <Login onLoginSuccess={handleLoginSuccess} />
          } 
        />
        
        {/* Rutas protegidas del dashboard */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;