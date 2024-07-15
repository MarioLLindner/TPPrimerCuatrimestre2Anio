import React, { useState, useEffect } from 'react';
import './WhatsAppButton.css';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber }) => {
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="whatsapp-button-container">
      {showBubble && <div className="whatsapp-bubble">Contactate con nosotros</div>}
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <FaWhatsapp size={40} color="#25D366" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
