import { useState } from 'react';
import { Building2, Plus, Users, FileText, Calendar, CheckCircle } from 'lucide-react';

const PartidosPoliticos = () => {
  const partidos = [
    {
      id: 1,
      nombre: 'Partido Democrático Nacional',
      siglas: 'PDN',
      logo: '🔵',
      fundacion: '1995',
      candidatos: 45,
      militantes: 125000,
      estado: 'Inscrito',
      color: 'blue'
    },
    {
      id: 2,
      nombre: 'Movimiento Popular Peruano',
      siglas: 'MPP',
      logo: '🟢',
      fundacion: '2002',
      candidatos: 38,
      militantes: 98000,
      estado: 'Inscrito',
      color: 'green'
    },
    {
      id: 3,
      nombre: 'Frente Progresista',
      siglas: 'FP',
      logo: '🟣',
      fundacion: '2010',
      candidatos: 52,
      militantes: 145000,
      estado: 'Inscrito',
      color: 'purple'
    },
    {
      id: 4,
      nombre: 'Alianza Nacional',
      siglas: 'AN',
      logo: '🔴',
      fundacion: '1998',
      candidatos: 41,
      militantes: 112000,
      estado: 'Inscrito',
      color: 'red'
    },
    {
      id: 5,
      nombre: 'Partido Regionalista',
      siglas: 'PR',
      logo: '🟡',
      fundacion: '2015',
      candidatos: 28,
      militantes: 67000,
      estado: 'Proceso',
      color: 'yellow'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Partidos</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">24</p>
            </div>
            <Building2 className="text-indigo-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inscritos</p>
              <p className="text-3xl font-bold text-green-600 mt-2">21</p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Proceso</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">3</p>
            </div>
            <FileText className="text-yellow-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Militantes</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">1.2M</p>
            </div>
            <Users className="text-purple-600" size={32} />
          </div>
        </div>
      </div>

      {/* Botón Agregar */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={20} />
          Registrar Nuevo Partido
        </button>
      </div>

      {/* Lista de Partidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {partidos.map((partido) => (
          <div key={partido.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-2 bg-${partido.color}-500`}></div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{partido.logo}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{partido.nombre}</h3>
                      <p className="text-sm text-gray-600 mt-1">Siglas: {partido.siglas}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      partido.estado === 'Inscrito' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {partido.estado}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Calendar size={14} />
                        <span className="text-xs">Fundación</span>
                      </div>
                      <p className="font-semibold text-gray-800">{partido.fundacion}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Users size={14} />
                        <span className="text-xs">Candidatos</span>
                      </div>
                      <p className="font-semibold text-gray-800">{partido.candidatos}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Users size={14} />
                        <span className="text-xs">Militantes</span>
                      </div>
                      <p className="font-semibold text-gray-800">{partido.militantes.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium">
                      Ver Detalles
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Documentos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Información Adicional */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Requisitos para Inscripción</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <CheckCircle className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="font-medium text-gray-800">Acta de Fundación</p>
              <p className="text-sm text-gray-600">Documento notarial con firmas de fundadores</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <CheckCircle className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="font-medium text-gray-800">Estatutos del Partido</p>
              <p className="text-sm text-gray-600">Reglamento interno aprobado</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <CheckCircle className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="font-medium text-gray-800">Padrón de Militantes</p>
              <p className="text-sm text-gray-600">Mínimo 50,000 afiliados verificados</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <CheckCircle className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="font-medium text-gray-800">Plan de Gobierno</p>
              <p className="text-sm text-gray-600">Propuestas en áreas clave</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartidosPoliticos;