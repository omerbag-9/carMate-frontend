import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Ai from '../../assets/images/Frame2005.png';

export default function Layout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <div className="sm:w-[90%] m-auto p-0">
        <Navbar />
        
        <Outlet />

        <Footer />
        
        {/* Chat button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={toggleChat}
            className={`rounded-full shadow-lg overflow-hidden flex items-center justify-center transition-all duration-300 ${isChatOpen ? 'bg-red-900 hover:bg-red-800 p-3' : 'p-0 w-16 h-16'}`}
            aria-label="Open chat"
          >
            {isChatOpen ? (
              <i className="fas fa-times text-white text-lg"></i>
            ) : (
              <img 
                src={Ai}
                alt="Chat icon" 
                className="w-full h-full object-cover"
              />
            )}
          </button>
        </div>

        {/* Chat iframe container */}
        {isChatOpen && (
          <div className="fixed bottom-24 right-6 z-40 w-full max-w-md h-96 md:h-128 shadow-xl rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/uHgSFn5RAsRr_-OZFyP3c"
              width="100%"
              className="h-full"
              frameBorder="0"
              title="Chatbot"
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
}