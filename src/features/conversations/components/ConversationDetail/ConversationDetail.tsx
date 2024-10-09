// import { useParams } from "react-router-dom";

import HeaderConversation from './HeaderConversation';

export default function ConversationDetail() {
  //   const { conversationId } = useParams();
  return (
    <div className="w-full h-full border border-divider rounded-xl pb-3 text-small text-default-400">
      <HeaderConversation />
    </div>
  );
}
