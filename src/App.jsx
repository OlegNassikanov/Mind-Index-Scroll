import React, { useState, useRef } from 'react';

const CognitiveNavigationDemo = () => {
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [dragStart, setDragStart] = useState(null);
  const [indexPosition, setIndexPosition] = useState({ x: 0, y: 0 });
  const [selectedTopic, setSelectedTopic] = useState(null);
  const chatContainerRef = useRef(null);

  // Симулированные данные чата
  const chatMessages = [
    { id: 1, type: 'user', text: 'Расскажи про машинное обучение', section: 'intro' },
    { id: 2, type: 'ai', text: 'Машинное обучение — это подраздел искусственного интеллекта, который фокусируется на создании алгоритмов...', section: 'intro' },
    { id: 3, type: 'user', text: 'Какие есть типы ML?', section: 'types' },
    { id: 4, type: 'ai', text: 'Существует три основных типа машинного обучения: обучение с учителем, без учителя и обучение с подкреплением...', section: 'types' },
    { id: 5, type: 'user', text: 'Объясни нейронные сети', section: 'neural' },
    { id: 6, type: 'ai', text: 'Нейронные сети — это вычислительные модели, вдохновленные биологическими нейронными сетями...', section: 'neural' },
    { id: 7, type: 'user', text: 'Как применять в бизнесе?', section: 'business' },
    { id: 8, type: 'ai', text: 'Машинное обучение революционизирует бизнес через автоматизацию процессов, анализ данных...', section: 'business' },
    { id: 9, type: 'user', text: 'Покажи примеры кода', section: 'code' },
    { id: 10, type: 'ai', text: 'Вот простой пример линейной регрессии на Python:\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression...', section: 'code' }
  ];

  const mindIndex = [
    { id: 'intro', title: '🎯 Основы ML', description: 'Введение в машинное обучение', messages: [1, 2] },
    { id: 'types', title: '🔀 Типы обучения', description: 'Виды машинного обучения', messages: [3, 4] },
    { id: 'neural', title: '🧠 Нейросети', description: 'Принципы работы нейронных сетей', messages: [5, 6] },
    { id: 'business', title: '💼 Бизнес-применение', description: 'Практические кейсы', messages: [7, 8] },
    { id: 'code', title: '⚡ Код и примеры', description: 'Техническая реализация', messages: [9, 10] }
  ];

  // --- Жестовое управление (тачскрин) ---
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY, time: Date.now() });
  };

  const handleTouchMove = (e) => {
    if (!dragStart) return;
    const touch = e.touches[0];
    const deltaY = touch.clientY - dragStart.y;
    const timeDelta = Date.now() - dragStart.time;

    if (timeDelta > 500 && Math.abs(deltaY) > 30) {
      setIsIndexOpen(true);
      setIndexPosition({ x: touch.clientX - 150, y: touch.clientY - 100 });
    }
  };

  const handleTouchEnd = () => {
    setDragStart(null);
  };

  // --- Управление мышью (средняя кнопка) ---
  const handleMouseDown = (e) => {
    if (e.button === 1) {
      e.preventDefault();
      setDragStart({ x: e.clientX, y: e.clientY, time: Date.now() });
    }
  };

  const handleMouseMove = (e) => {
    if (!dragStart) return;
    const deltaY = e.clientY - dragStart.y;
    const timeDelta = Date.now() - dragStart.time;

    if (timeDelta > 500 && Math.abs(deltaY) > 30) {
      setIsIndexOpen(true);
      setIndexPosition({ x: e.clientX - 150, y: e.clientY - 100 });
    }
  };

  const handleMouseUp = (e) => {
    if (dragStart && e.button === 1) {
      setDragStart(null);
    }
  };

  const jumpToSection = (sectionId) => {
    setSelectedTopic(sectionId);
    setActiveSection(sectionId);
    setIsIndexOpen(false);

    const element = document.getElementById(`section-${sectionId}`);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-screen bg-gray-900 text-white overflow-hidden relative">
    {/* Основной чат */}
    <div
    ref={chatContainerRef}
    className="h-full overflow-y-auto px-4 py-6 pb-20"
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    style={{ scrollBehavior: 'smooth' }}
    >
    <div className="max-w-2xl mx-auto space-y-4">
    <div className="text-center mb-8">
    <h1 className="text-2xl font-bold mb-2">🧠 Cognitive Navigation Demo</h1>
    <p className="text-gray-400 text-sm">Удерживай палец или среднюю кнопку мыши и проводи вверх/вниз для вызова Mind Index</p>
    </div>

    {chatMessages.map((msg) => (
      <div
      key={msg.id}
      id={`section-${msg.section}`}
      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-300 ${
        activeSection === msg.section ? 'ring-2 ring-blue-500 rounded-lg p-2' : ''
      }`}
      >
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'
      } ${selectedTopic === msg.section ? 'animate-pulse' : ''}`}>
      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
      </div>
      </div>
    ))}
    </div>
    </div>

    {/* Mind Index Overlay */}
    {isIndexOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsIndexOpen(false)}>
      <div
      className="bg-gray-800 rounded-2xl p-6 max-w-sm mx-4 shadow-2xl border border-gray-600"
      style={{ transform: `translate(${indexPosition.x}px, ${indexPosition.y}px)`, animation: 'fadeInScale 0.3s ease-out' }}
      onClick={(e) => e.stopPropagation()}
      >
      <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">📚 Mind Index</h3>
      <button onClick={() => setIsIndexOpen(false)} className="text-gray-400 hover:text-white transition-colors">✕</button>
      </div>

      <div className="space-y-3">
      {mindIndex.map((item) => (
        <div key={item.id} className="p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-all duration-200 transform hover:scale-105" onClick={() => jumpToSection(item.id)}>
        <div className="flex items-center justify-between">
        <div>
        <h4 className="font-medium text-sm">{item.title}</h4>
        <p className="text-xs text-gray-400 mt-1">{item.description}</p>
        </div>
        <div className="text-xs text-blue-400">{item.messages.length} msg</div>
        </div>
        </div>
      ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-600">
      <p className="text-xs text-gray-400 text-center">🎯 Тапни для прыжка • 🔄 Векторная навигация</p>
      </div>
      </div>
      </div>
    )}

    {/* Инструкция */}
    <div className="fixed bottom-4 left-4 right-4 z-10">
    <div className="bg-gray-800 rounded-lg p-3 text-center shadow-lg">
    <p className="text-xs text-gray-300">
    💡 <strong>Попробуй жест или среднюю кнопку мыши:</strong> удерживай и проводи вверх/вниз
    </p>
    </div>
    </div>

    <style jsx>{`
      @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      `}</style>
      </div>
  );
};

export default CognitiveNavigationDemo;
