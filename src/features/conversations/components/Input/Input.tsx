import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { FiPaperclip } from 'react-icons/fi';  
import { MdMic } from 'react-icons/md';  
interface InputProps {
  onSendMessage: (message: string) => void;
}

export default function Input({ onSendMessage }: InputProps) {
  const [message, setMessage] = useState('');


  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage(''); 
  };

  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="input-container flex items-center px-4 py-3 ">
    
      <FiPaperclip size={24} className="text-gray-400 mr-3 cursor-pointer" />

    
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Send a message to AcmeAI"
        className="flex-grow p-3 rounded-full border-none bg-[#2A2A2A] text-white placeholder-gray-400 focus:outline-none"
        style={{ marginRight: '10px' }}
      />

      
      <MdMic size={24} className="text-gray-400 cursor-pointer mr-3" />


      <button
        onClick={handleSendMessage}
        disabled={!message.trim()}
        className="p-2 bg-blue-600 text-white rounded-full disabled:bg-gray-500"
      >
        <AiOutlineSend size={24} />
      </button>
    </div>
  );
}
