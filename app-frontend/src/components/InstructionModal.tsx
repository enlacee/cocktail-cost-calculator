import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const InstructionModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const hasSeenVideo = localStorage.getItem("seenVideo");
    if (!hasSeenVideo) {
      setShowModal(true);
    }

    // Cerrar con la tecla ESC
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
        setShowVideo(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setShowVideo(false);
  };

  const handleWatchVideo = () => {
    setShowVideo(true);
    setShowModal(false);
    localStorage.setItem("seenVideo", "true");
  };
  
  const modalContent = (
    <>
      {/* Modal de Pregunta */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">📽️ Aprende a usar la app en 1 minuto</h2>
            <p className="text-gray-600 mb-4">Te mostramos rápidamente cómo funciona.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleWatchVideo}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Ver Instrucciones
              </button>
              <button
                onClick={handleClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                No, Gracias
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal del Video */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-3/4 max-w-2xl">
            <button
              onClick={handleClose}
              className="absolute -top-6 -right-6 bg-gray-700 text-white p-2 rounded-full text-xl"
            >
              ✖
            </button>
            <video
              src="/video.mp4"
              autoPlay
              controls
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default InstructionModal;
