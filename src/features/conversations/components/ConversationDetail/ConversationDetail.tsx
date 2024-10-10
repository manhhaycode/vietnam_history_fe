import { useState } from 'react';
import Input from '../Input';
import HeaderConversation from './HeaderConversation';

export default function ConversationDetail() {
  const [messages, setMessages] = useState<any[]>([]);
  const [suggestions] = useState([
    { icon: '📘', text: 'Study Italian vocabulary' },
    { icon: '💌', text: 'Message inviting friend to wedding' },
    { icon: '📅', text: 'Experience Buenos Aires like a local' },
    { icon: '🎮', text: 'Design a fun Tetris game' },
  ]);

 
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      content: message,
      createBy: 'user',
      avatar: 'https://static.znews.vn/static/topic/person/taylorswift.jpg', 
    };


    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        content: 'This is a sample response from HISVN AI.',
        createBy: 'bot',
        avatar:
          'https://static.vecteezy.com/system/resources/previews/022/739/948/original/chatbot-robo-advisor-chat-bot-robot-like-assistant-concept-of-digital-advisor-avatar-to-help-the-customer-icon-vector.jpg', // Avatar bot
      };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);
  };

  return (
    <div className="w-full h-full flex flex-col border border-divider rounded-xl text-small text-default-400">
     <HeaderConversation />
      {messages.length === 0 && (
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="logo-container mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8943/8943377.png"
              alt="Logo"
              className="w-12 h-12 mx-auto"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-6 py-8 rounded-lg flex flex-col items-center justify-between cursor-pointer hover:bg-gray-500"
                onClick={() => handleSendMessage(suggestion.text)}
                style={{ height: '120px', backgroundColor: '#4A4A4A' }}
              >
                <span className="text-3xl mb-2 flex-1 flex items-center justify-center">{suggestion.icon}</span>
                <span className="text-center text-white flex-1 flex items-center justify-center">{suggestion.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

     
      <div className="flex-grow overflow-y-auto px-4 py-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-4 flex items-start ${
              msg.createBy === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <img src={msg.avatar} alt={`${msg.createBy} avatar`} className="w-10 h-10 rounded-full mx-4" />
            <div
              className={`p-4 rounded-lg max-w-xl ${
                msg.createBy === 'user' ? 'bg-gray-600 text-white self-end' : 'bg-gray-700 text-white self-start'
              }`}
              style={{ backgroundColor: msg.createBy === 'user' ? '#343541' : '#444654' }}
            >
              <strong>{msg.createBy === 'user' ? 'You' : 'AcmeAI'}</strong>
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
      </div>

      <Input onSendMessage={handleSendMessage} />
     
    </div>
  );
}
