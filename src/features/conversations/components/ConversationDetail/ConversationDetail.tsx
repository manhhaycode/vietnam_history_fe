// import { useParams } from "react-router-dom";

import { useParams } from 'react-router-dom';
import HeaderConversation from './HeaderConversation';
import { useGetConversation } from '@/features/conversations';
import { useEffect } from 'react';
import ConversationMessageList from '../ConversationMessage';
import ConversationInput from '../ConversationInput';

export default function ConversationDetail() {
  const { conversationId } = useParams();
  const { data: conversation } = useGetConversation(conversationId);
  useEffect(() => {
    console.log(conversation);
  }, [conversation]);

  return (
    <div className="w-full h-full flex flex-col border border-divider rounded-xl pb-3 text-small text-default-400">
      <HeaderConversation />
      <div className="px-6 flex flex-col gap-3 justify-center items-center flex-1">
        <ConversationMessageList />
        <ConversationInput />
        <p className="font-medium">AcmeAI can make mistakes. Check important info.</p>
      </div>
    </div>
  );
}
