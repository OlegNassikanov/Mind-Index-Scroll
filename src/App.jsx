import React, { useState, useRef } from "react";

const CognitiveNavigationDemo = () => {
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [dragStart, setDragStart] = useState(null);
  const [indexPosition, setIndexPosition] = useState({ x: 0, y: 0 });
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const chatContainerRef = useRef(null);

  // Симулированные данные чата с ИИ
  const chatMessages = [
    { id: 1, type: "user", text: "Расскажи про машинное обучение", section: "intro" },
    { id: 2, type: "ai", text: "Машинное обучение — это подраздел ИИ, который создаёт алгоритмы для автоматического обучения на данных...", section: "intro" },
    { id: 3, type: "user", text: "Какие есть типы ML?", section: "types" },
    { id: 4, type: "ai", text: "Существует три типа: с учителем, без учителя, с подкреплением. Каждый решает свои задачи...", section: "types" },
    { id: 5, type: "user", text: "Объясни нейронные сети", section: "neural" },
    { id: 6, type: "ai", text: "Нейронные сети — вычислительные модели, вдохновлённые биологией. Состоят из слоёв нейронов...", section: "neural" },
    { id: 7, type: "user", text: "Как применять в бизнесе?", section: "business" },
    { id: 8, type: "ai", text: "ML революционизирует бизнес через автоматизацию, предиктивную аналитику, персонализацию...", section: "business" },
    { id: 9, type: "user", text: "Покажи примеры кода", section: "code" },
    { id: 10, type: "ai", text: "Пример линейной регрессии на Python:\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression().fit(X, y)", section: "code" },
  ];

  // Автоматически сгенерированное ИИ "оглавление по смыслам"
  const mindIndex = [
    { id: "intro", title: "🎯 Основы ML", description: "Введение в машинное обучение", messages: [1, 2], color: "#3b82f6" },
    { id: "types", title: "🔀 Типы обучения", description: "Виды ML", messages: [3, 4], color: "#8b5cf6" },
    { id: "neural", title: "🧠 Нейросети", description: "Принципы работы нейронных сетей", messages: [5, 6], color: "#06d6a0" },
    { id: "business", title: "💼 Бизнес-применение", description: "Практические кейсы", messages: [7, 8], color: "#f59e0b" },
    { id: "code", title: "⚡ Код и примеры", description: "Примеры реализации", messages: [9, 10], color: "#ef4444" },
  ];

  // Жестовое управление - удержание и свайп
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY, time: Date.now() });
  };

  const handleTouchMove = (e) => {
    if (!dragStart) return;

    const touch = e.touches[0];
    const deltaY = touch.clientY - dragStart.y;
    const timeDelta = Date.now() - dragStart.time;

    // Долгое нажатие + движение = вызов оглавления
    if (timeDelta > 400 && Math.abs(deltaY) > 25) {
      setIsIndexOpen(true);
      setIndexPosition({
        x: Math.min(Math.max(touch.clientX - 175, 20), window.innerWidth - 370),
                       y: Math.min(Math.max(touch.clientY - 150, 50), window.innerHeight - 400)
      });
    }
  };

  const handleTouchEnd = () => setDragStart(null);

  // Прыжок к секции с анимацией
  const jumpToSection = (sectionId) => {
    setSelectedTopic(sectionId);
    setActiveSection(sectionId);
    setIsIndexOpen(false);

    // Плавный переход с задержкой для визуального эффекта
    setTimeout(() => {
      const element = document.getElementById(`section-${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);

    // Сброс подсветки через 2 секунды
    setTimeout(() => {
      setActiveSection(null);
      setSelectedTopic(null);
    }, 3000);
  };

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
          color: "white",
          overflow: "hidden",
          position: "relative",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
    {/* Основной чат */}
    <div
    ref={chatContainerRef}
    style={{
      height: "100%",
      overflowY: "auto",
      padding: "1.5rem",
      paddingBottom: "5rem",
      scrollBehavior: "smooth"
    }}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
    >
    <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
    <h1 style={{
      fontSize: "2rem",
      fontWeight: "700",
      background: "linear-gradient(90deg, #60a5fa, #a78bfa, #34d399)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "0.5rem"
    }}>
    🧠 Cognitive Navigation
    </h1>
    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
    Удерживай и проводи пальцем для вызова Mind Index
    </p>
    </div>

    {chatMessages.map((msg) => (
      <div
      key={msg.id}
      id={`section-${msg.section}`}
      style={{
        display: "flex",
        justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
        transition: "all 0.3s ease"
      }}
      >
      <div style={{
        maxWidth: "75%",
        padding: "0.8rem 1.2rem",
        borderRadius: msg.type === "user" ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
        background: msg.type === "user"
        ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
        : "rgba(55, 65, 81, 0.8)",
                                color: "white",
                                backdropFilter: "blur(10px)",
                                border: activeSection === msg.section ? "2px solid #60a5fa" : "1px solid rgba(255,255,255,0.1)",
                                boxShadow: activeSection === msg.section
                                ? "0 0 20px rgba(96, 165, 250, 0.5)"
                                : "0 4px 15px rgba(0,0,0,0.2)",
                                transform: selectedTopic === msg.section ? "scale(1.02)" : "scale(1)",
                                whiteSpace: "pre-wrap",
                                fontSize: "0.95rem",
                                lineHeight: "1.5"
      }}>
      {msg.text}
      </div>
      </div>
    ))}
    </div>
    </div>

    {/* Mind Index Overlay */}
    {isIndexOpen && (
      <div
      onClick={() => setIsIndexOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.6)",
                     backdropFilter: "blur(8px)",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     zIndex: 50,
                     animation: "fadeIn 0.2s ease-out"
      }}
      >
      <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        left: `${indexPosition.x}px`,
        top: `${indexPosition.y}px`,
        background: "rgba(17, 24, 39, 0.95)",
                     borderRadius: "20px",
                     padding: "1.5rem",
                     minWidth: "350px",
                     maxWidth: "400px",
                     border: "1px solid rgba(96, 165, 250, 0.3)",
                     boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                     backdropFilter: "blur(20px)",
                     animation: "slideUp 0.3s ease-out"
      }}
      >
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
                     paddingBottom: "0.8rem"
      }}>
      <h3 style={{
        fontSize: "1.2rem",
        fontWeight: "600",
        background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                     backgroundClip: "text",
                     WebkitBackgroundClip: "text",
                     WebkitTextFillColor: "transparent"
      }}>
      📚 Mind Index
      </h3>
      <button
      onClick={() => setIsIndexOpen(false)}
      style={{
        background: "none",
        border: "none",
        color: "rgba(255,255,255,0.7)",
                     fontSize: "1.2rem",
                     cursor: "pointer",
                     padding: "0.25rem",
                     borderRadius: "50%",
                     transition: "all 0.2s"
      }}
      onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
      onMouseLeave={(e) => e.target.style.background = "none"}
      >
      ✕
      </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
      {mindIndex.map((item) => (
        <div
        key={item.id}
        onClick={() => jumpToSection(item.id)}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        style={{
          padding: "1rem",
          background: hoveredItem === item.id
          ? `linear-gradient(135deg, ${item.color}20, ${item.color}10)`
          : "rgba(55, 65, 81, 0.6)",
                                borderRadius: "12px",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: `1px solid ${hoveredItem === item.id ? item.color : "rgba(255,255,255,0.1)"}`,
                                transform: hoveredItem === item.id ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
                                transition: "all 0.2s ease",
                                boxShadow: hoveredItem === item.id ? `0 8px 25px ${item.color}30` : "0 2px 10px rgba(0,0,0,0.1)"
        }}
        >
        <div>
        <h4 style={{
          fontWeight: "500",
          fontSize: "0.95rem",
          marginBottom: "0.3rem",
          color: hoveredItem === item.id ? item.color : "white"
        }}>
        {item.title}
        </h4>
        <p style={{
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.6)",
                                margin: 0
        }}>
        {item.description}
        </p>
        </div>
        <div style={{
          fontSize: "0.75rem",
          color: item.color,
          fontWeight: "500",
          background: `${item.color}20`,
          padding: "0.25rem 0.5rem",
          borderRadius: "8px"
        }}>
        {item.messages.length} msg
        </div>
        </div>
      ))}
      </div>

      <div style={{
        marginTop: "1.2rem",
        paddingTop: "1rem",
        borderTop: "1px solid rgba(255,255,255,0.1)",
                     textAlign: "center"
      }}>
      <p style={{
        fontSize: "0.75rem",
        color: "rgba(255,255,255,0.5)",
                     margin: 0
      }}>
      🎯 Тапни для прыжка • 🔄 Векторная навигация
      </p>
      </div>
      </div>
      </div>
    )}

    {/* Инструкция */}
    <div style={{
      position: "fixed",
      bottom: "1.5rem",
      left: "1rem",
      right: "1rem",
      zIndex: 10,
      display: "flex",
      justifyContent: "center"
    }}>
    <div style={{
      background: "rgba(17, 24, 39, 0.9)",
          padding: "0.8rem 1.5rem",
          borderRadius: "12px",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          textAlign: "center",
          maxWidth: "400px"
    }}>
    💡 <strong style={{ color: "#60a5fa" }}>Попробуй жест:</strong> Удерживай палец и проведи вверх/вниз для вызова Mind Index
    </div>
    </div>

    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      `}</style>
      </div>
  );
};

export default CognitiveNavigationDemo;
