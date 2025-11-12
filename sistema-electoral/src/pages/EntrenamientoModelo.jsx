import { useState, useEffect } from 'react';
import { Brain, Play, Download, Upload, AlertCircle, CheckCircle, TrendingUp, Activity, Zap, Target, BarChart3, Database, Clock, Cpu } from 'lucide-react';

const EntrenamientoModelo = () => {
    const [modelType, setModelType] = useState('sklearn');
    const [algorithm, setAlgorithm] = useState('logistic');
    const [isTraining, setIsTraining] = useState(false);
    const [trainingComplete, setTrainingComplete] = useState(false);
    const [trainingProgress, setTrainingProgress] = useState(0);
    const [trainingHistory, setTrainingHistory] = useState([]); // <-- Nuevo estado

    const sklearnAlgorithms = [
        { id: 'logistic', name: 'Regresión Logística', icon: '📊' },
        { id: 'random-forest', name: 'Random Forest', icon: '🌳' },
        { id: 'svm', name: 'SVM', icon: '🎯' },
        { id: 'gradient-boosting', name: 'Gradient Boosting', icon: '🚀' }
    ];

    const pytorchModels = [
        { id: 'neural-network', name: 'Red Neuronal', icon: '🧠' },
        { id: 'lstm', name: 'LSTM', icon: '🔄' },
        { id: 'cnn', name: 'CNN', icon: '🖼️' },
        { id: 'transformer', name: 'Transformer', icon: '⚡' }
    ];

    const metricsData = {
        accuracy: 94.5,
        precision: 92.8,
        recall: 93.2,
        f1Score: 93.0
    };

    // Simular historial inicial
    useEffect(() => {
        const initialHistory = [
            { id: 1, date: '2025-11-10 09:15', algorithm: 'Random Forest', framework: 'Scikit-Learn', accuracy: 96.2, f1: 95.8, time: '4.2s' },
            { id: 2, date: '2025-11-10 14:22', algorithm: 'Red Neuronal', framework: 'PyTorch', accuracy: 91.5, f1: 90.9, time: '12.8s' },
            { id: 3, date: '2025-11-11 11:05', algorithm: 'Regresión Logística', framework: 'Scikit-Learn', accuracy: 89.7, f1: 88.3, time: '1.1s' },
        ];
        setTrainingHistory(initialHistory);
    }, []);

    const getCurrentAlgorithmName = () => {
        const list = modelType === 'sklearn' ? sklearnAlgorithms : pytorchModels;
        return list.find(a => a.id === algorithm)?.name || algorithm;
    };

    const handleTraining = () => {
        setIsTraining(true);
        setTrainingComplete(false);
        setTrainingProgress(0);

        const interval = setInterval(() => {
            setTrainingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsTraining(false);
                    setTrainingComplete(true);

                    // Simular métricas aleatorias
                    const accuracy = +(85 + Math.random() * 14).toFixed(1);
                    const f1 = +(accuracy - Math.random() * 5).toFixed(1);

                    const newEntry = {
                        id: Date.now(),
                        date: new Date().toLocaleString('es-ES', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                        algorithm: getCurrentAlgorithmName(),
                        framework: modelType === 'sklearn' ? 'Scikit-Learn' : 'PyTorch',
                        accuracy,
                        f1,
                        time: `${(Math.random() * 10 + 1).toFixed(1)}s`
                    };

                    setTrainingHistory(prev => [newEntry, ...prev].slice(0, 8));
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white bg-opacity-20 rounded-full">
                            <Brain size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Entrenamiento de Modelos</h2>
                            <p className="text-sm opacity-90 mt-1">Entrenamiento y evaluación de modelos de Machine Learning</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selector de Framework */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Seleccionar Framework</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => setModelType('sklearn')}
                        className={`p-6 rounded-xl border-2 transition-all ${modelType === 'sklearn'
                                ? 'border-indigo-500 bg-indigo-50 shadow-md'
                                : 'border-gray-200 hover:border-indigo-300'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-5xl">🔬</div>
                            <div className="text-left">
                                <p className="text-xl font-bold text-gray-800">Scikit-Learn</p>
                                <p className="text-sm text-gray-600">Algoritmos clásicos de ML</p>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => setModelType('pytorch')}
                        className={`p-6 rounded-xl border-2 transition-all ${modelType === 'pytorch'
                                ? 'border-indigo-500 bg-indigo-50 shadow-md'
                                : 'border-gray-200 hover:border-indigo-300'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-5xl">🔥</div>
                            <div className="text-left">
                                <p className="text-xl font-bold text-gray-800">PyTorch</p>
                                <p className="text-sm text-gray-600">Redes neuronales profundas</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Configuración del Modelo */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Panel de Configuración */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Selección de Algoritmo */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            {modelType === 'sklearn' ? 'Algoritmo' : 'Arquitectura'}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {(modelType === 'sklearn' ? sklearnAlgorithms : pytorchModels).map((algo) => (
                                <button
                                    key={algo.id}
                                    onClick={() => setAlgorithm(algo.id)}
                                    className={`p-4 rounded-lg border-2 transition-all ${algorithm === algo.id
                                            ? 'border-purple-500 bg-purple-50'
                                            : 'border-gray-200 hover:border-purple-300'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{algo.icon}</div>
                                    <p className="text-sm font-medium text-gray-800">{algo.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hiperparámetros */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Hiperparámetros</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Learning Rate
                                </label>
                                <input
                                    type="number"
                                    defaultValue="0.001"
                                    step="0.0001"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Épocas / Iteraciones
                                </label>
                                <input
                                    type="number"
                                    defaultValue="100"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Batch Size
                                </label>
                                <input
                                    type="number"
                                    defaultValue="32"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Train/Test Split
                                </label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="0.8">80/20</option>
                                    <option value="0.7">70/30</option>
                                    <option value="0.6">60/40</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Botón de Entrenamiento */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <button
                            onClick={handleTraining}
                            disabled={isTraining}
                            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-white font-bold text-lg transition-all ${isTraining
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {isTraining ? (
                                <>
                                    <Activity className="animate-spin" size={24} />
                                    Entrenando Modelo...
                                </>
                            ) : (
                                <>
                                    <Play size={24} />
                                    Iniciar Entrenamiento
                                </>
                            )}
                        </button>

                        {isTraining && (
                            <div className="mt-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600">Progreso</span>
                                    <span className="font-bold text-indigo-600">{trainingProgress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${trainingProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Panel de Métricas */}
                <div className="space-y-6">
                    {/* Estado del Modelo */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Estado del Modelo</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Framework</span>
                                <span className="font-bold text-gray-800">{modelType === 'sklearn' ? 'Scikit-Learn' : 'PyTorch'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Algoritmo</span>
                                <span className="font-bold text-gray-800">{getCurrentAlgorithmName()}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Estado</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${trainingComplete
                                        ? 'bg-green-100 text-green-800'
                                        : isTraining
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {trainingComplete ? 'Entrenado' : isTraining ? 'Entrenando' : 'No Entrenado'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* NUEVO: Modelos Entrenados (Historial Compacto) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Database size={20} className="text-indigo-600" />
                            Modelos Entrenados
                        </h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {trainingHistory.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-4">Sin entrenamientos previos</p>
                            ) : (
                                trainingHistory.map((model) => (
                                    <div key={model.id} className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm">{model.algorithm}</p>
                                                <p className="text-xs text-gray-600">{model.framework}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-green-600">{model.accuracy}%</p>
                                                <p className="text-xs text-indigo-600">F1: {model.f1}%</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {model.date}</span>
                                            <span className="flex items-center gap-1"><Cpu size={12} /> {model.time}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Métricas de Rendimiento (original) */}
                    {trainingComplete && (
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Target size={20} className="text-green-600" />
                                Métricas de Rendimiento
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600">Accuracy</span>
                                        <span className="font-bold text-green-600">{metricsData.accuracy}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-green-600 h-2 rounded-full"
                                            style={{ width: `${metricsData.accuracy}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600">Precision</span>
                                        <span className="font-bold text-blue-600">{metricsData.precision}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${metricsData.precision}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600">Recall</span>
                                        <span className="font-bold text-purple-600">{metricsData.recall}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full"
                                            style={{ width: `${metricsData.recall}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600">F1-Score</span>
                                        <span className="font-bold text-indigo-600">{metricsData.f1Score}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full"
                                            style={{ width: `${metricsData.f1Score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                    <Download size={18} />
                                    Descargar Modelo
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Consejos */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                            <div>
                                <p className="font-bold text-blue-900 mb-2">Consejos de Entrenamiento</p>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Normaliza los datos antes del entrenamiento</li>
                                    <li>• Ajusta el learning rate si hay overfitting</li>
                                    <li>• Usa validación cruzada para mejores resultados</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Historial de Entrenamientos (tabla original al final) */}
            {trainingComplete && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Historial de Entrenamientos</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Fecha</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Modelo</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Accuracy</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">F1-Score</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Tiempo</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-800">2024-11-11 14:30</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{getCurrentAlgorithmName()}</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-bold">{metricsData.accuracy}%</td>
                                    <td className="px-4 py-3 text-sm text-indigo-600 font-bold">{metricsData.f1Score}%</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">2.5s</td>
                                    <td className="px-4 py-3">
                                        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                            Ver Detalles
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntrenamientoModelo;