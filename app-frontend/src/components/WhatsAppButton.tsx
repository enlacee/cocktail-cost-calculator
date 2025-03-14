import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({ message = "¡Hola! Tengo una consulta sobre", phone = "123456789" }) => {
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-600_ p-3 md:p-4 rounded-xl _shadow-xl flex flex-col items-center gap-2 _hover:bg-green-600 transition text-white"
    >
      <div className="bg-green-600 text-white p-3 md:p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition">
        <FaWhatsapp className="w-8 h-8 md:w-10 md:h-10" />
      </div>
      <span className="text-xs md:text-sm bg-green-500 text-white px-2 md:px-3 py-1 rounded-lg shadow-md text-center">
        {message}
      </span>
    </a>
  );
};

export default WhatsAppButton;
