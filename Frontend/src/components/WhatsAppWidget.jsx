// src/components/common/WhatsAppWidget.js

import React, { useState } from 'react';

const WhatsAppWidget = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleExploreClick = () => {
    setShowPopup(true);
  };

  const handleCloseChat = () => {
    setShowPopup(false);
  };

  const handleStartChat = () => {
    const phoneNumber = '911234567891'; // <-- Change this to your WhatsApp number
    const message = encodeURIComponent("Hi, I want to know more!");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div id="whatsapp-button" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      {/* Order Now Button */}
      <button
        onClick={handleExploreClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '15px',
          padding: '10px 20px',
          fontWeight: "600",
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '30px',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
        }}
      >
        <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path d="m.76 21.24 1.412-5.12A10.324 10.324 0 0 1 .76 10.93C.76 5.35 5.35.76 10.964.76 16.58.76 21.24 5.35 21.24 10.93c0 5.578-4.661 10.31-10.276 10.31-1.765 0-3.46-.565-4.978-1.413L.76 21.24Z" fill="#EDEDED"></path>
          <path d="m6.268 17.991.318.177c1.307.812 2.825 1.306 4.414 1.306 4.626 0 8.474-3.848 8.474-8.545 0-4.696-3.848-8.404-8.51-8.404-4.66 0-8.439 3.743-8.439 8.404 0 1.624.46 3.213 1.307 4.555l.212.318-.812 2.966 3.036-.777Z" fill="#25D366"></path>
          <path d="m8.245 6.198-.671-.036a.802.802 0 0 0-.565.212c-.318.283-.848.812-.989 1.519-.247 1.059.141 2.33 1.06 3.601.918 1.271 2.683 3.32 5.79 4.202.989.283 1.766.106 2.402-.282.494-.318.812-.812.918-1.342l.105-.494a.355.355 0 0 0-.176-.389l-2.225-1.024a.337.337 0 0 0-.423.106l-.883 1.13a.275.275 0 0 1-.283.07c-.6-.211-2.613-1.059-3.707-3.177-.036-.106-.036-.212.035-.283l.848-.953c.07-.106.105-.247.07-.353L8.527 6.41a.308.308 0 0 0-.282-.212Z" fill="#FEFEFE"></path>
        </svg>

        Start Chat
      </button>

      {/* Chat Popup */}
      {showPopup && (
        <div
          style={{
            marginTop: '10px',
            width: '360px',
            height: '380px',
            backgroundImage: 'url(https://ik.imagekit.io/cloy701fl/images/anantya-whatsapp.png)',
            backgroundSize: 'cover',
            position: 'relative',
            borderRadius: '20px',
            boxShadow: '0 24px 50px 10px #0066ff12',
            overflow: 'hidden',
          }}
        >
          {/* Close Button */}
          <button
            aria-label="Close chat"
            onClick={handleCloseChat}
            style={{
              position: 'absolute',
              right: '15px',
              color: '#fff',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
            }}
          >
            ×
          </button>

          {/* Header */}
          <div style={{ backgroundColor: '#0a5f54', color: '#fff', display: 'flex', padding: '15px 20px 0px 20px' }}>
            <img
              src="https://ik.imagekit.io/cloy701fl/images/rounded.png"
              alt="User"
              width="45"
              height="45"
              style={{ borderRadius: '50%' }}
            />
            <div style={{ marginLeft: '10px' }}>
              <span>OTGMS</span>
              <p style={{ fontSize: '.7rem', lineHeight: '.8rem' }}>Replies within 10 min</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ padding: '10px 20px', overflowY: 'auto', height: '220px' }}>
            <p
              style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                padding: '0.8rem',
                marginBottom: '10px',
                fontSize: '14px',
              }}
            >
              <br />
              Thank you for contacting OTGMS! How may we assist you?
            </p>
            <p
              style={{
                backgroundColor: '#dcf8c6',
                borderRadius: '15px',
                padding: '0.8rem',
                fontSize: '14px',
                marginLeft: '3rem',
              }}
            >
              <br />
              Hi, I want to know more!
            </p>
          </div>

          {/* CTA Section */}
          <div
            style={{
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: 0,
              width: '100%',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <button
              className='cta-button mt-3'
              onClick={handleStartChat}
              style={{
                backgroundColor: '#22ceba',
                color: 'white',
                width: '90%',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path d="m.76 21.24 1.412-5.12A10.324 10.324 0 0 1 .76 10.93C.76 5.35 5.35.76 10.964.76 16.58.76 21.24 5.35 21.24 10.93c0 5.578-4.661 10.31-10.276 10.31-1.765 0-3.46-.565-4.978-1.413L.76 21.24Z" fill="#EDEDED"></path>
                <path d="m6.268 17.991.318.177c1.307.812 2.825 1.306 4.414 1.306 4.626 0 8.474-3.848 8.474-8.545 0-4.696-3.848-8.404-8.51-8.404-4.66 0-8.439 3.743-8.439 8.404 0 1.624.46 3.213 1.307 4.555l.212.318-.812 2.966 3.036-.777Z" fill="#25D366"></path>
                <path d="m8.245 6.198-.671-.036a.802.802 0 0 0-.565.212c-.318.283-.848.812-.989 1.519-.247 1.059.141 2.33 1.06 3.601.918 1.271 2.683 3.32 5.79 4.202.989.283 1.766.106 2.402-.282.494-.318.812-.812.918-1.342l.105-.494a.355.355 0 0 0-.176-.389l-2.225-1.024a.337.337 0 0 0-.423.106l-.883 1.13a.275.275 0 0 1-.283.07c-.6-.211-2.613-1.059-3.707-3.177-.036-.106-.036-.212.035-.283l.848-.953c.07-.106.105-.247.07-.353L8.527 6.41a.308.308 0 0 0-.282-.212Z" fill="#FEFEFE"></path>
              </svg>
              Start Chat
            </button>

            <p className="powered-by mt-2" style={{ marginTop: '10px', fontSize: '12px', color: '#888' }}>
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.84653 0.0360377C6.13974 0.138097 6.33912 0.438354 6.33912 0.777828V4.66669L9.15651 4.66669C9.41915 4.66669 9.65997 4.82804 9.78125 5.08527C9.90254 5.34251 9.88415 5.65289 9.73354 5.89048L4.80311 13.6682C4.62681 13.9463 4.30753 14.066 4.01433 13.964C3.72113 13.8619 3.52174 13.5616 3.52174 13.2222L3.52174 9.33331H0.704349C0.441715 9.33331 0.200895 9.17196 0.0796083 8.91473C-0.0416787 8.65749 -0.0232851 8.34711 0.127325 8.10952L5.05775 0.331805C5.23405 0.0536972 5.55333 -0.0660216 5.84653 0.0360377Z" fill="#FFA800"></path>
              </svg>
              &nbsp; Powered by <a href="https://anantya.ai/" target="_blank" rel='noreferrer'>Anantya.ai</a>
            </p>

          </div>

        </div>
      )}
    </div>
  );
};

export default WhatsAppWidget;
