import { useState } from 'react';
import { Upload, File, CheckCircle, AlertCircle, Download, X } from 'lucide-react';

const CargaDatos = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      status: 'processing',
      progress: 0
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);

    // Simular procesamiento
    newFiles.forEach((file, index) => {
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'success', progress: 100 } : f
        ));
      }, 2000 + (index * 500));
    });
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Instrucciones */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Instrucciones de Carga</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Formatos aceptados: CSV, XLSX, JSON</li>
          <li>• Tamaño máximo por archivo: 50 MB</li>
          <li>• Asegúrese de que los datos incluyan: ID, Nombre, Edad, Distrito</li>
          <li>• Los archivos se procesarán automáticamente después de la carga</li>
        </ul>
      </div>

      {/* Zona de Carga */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Cargar Archivos</h3>
        
        <form 
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="mb-6"
        >
          <div className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50'
          }`}>
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <h4 className="text-lg font-medium text-gray-700 mb-2">
              Arrastra y suelta tus archivos aquí
            </h4>
            <p className="text-sm text-gray-500 mb-4">o</p>
            <label className="inline-block">
              <span className="px-6 py-3 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors">
                Seleccionar Archivos
              </span>
              <input
                type="file"
                multiple
                onChange={handleChange}
                className="hidden"
                accept=".csv,.xlsx,.json"
              />
            </label>
          </div>
        </form>

        {/* Archivos Cargados */}
        {uploadedFiles.length > 0 && (
          <div>
            <h4 className="text-md font-bold text-gray-800 mb-3">Archivos Cargados</h4>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <File className="text-indigo-600" size={24} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-gray-800">{file.name}</p>
                      <span className="text-xs text-gray-500">{file.size}</span>
                    </div>
                    {file.status === 'processing' && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                      </div>
                    )}
                    {file.status === 'success' && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle size={16} />
                        <span className="text-xs">Procesado exitosamente</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Plantillas Disponibles */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Plantillas Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">Plantilla CSV</h4>
              <Download size={18} className="text-indigo-600" />
            </div>
            <p className="text-xs text-gray-600">Formato estándar para registro de votantes</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">Plantilla Excel</h4>
              <Download size={18} className="text-indigo-600" />
            </div>
            <p className="text-xs text-gray-600">Incluye validación de datos automática</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">Plantilla JSON</h4>
              <Download size={18} className="text-indigo-600" />
            </div>
            <p className="text-xs text-gray-600">Para integración con APIs externas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargaDatos;