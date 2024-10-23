import { useConversationStore } from '@/libs/store';
import ConversationMessageAI from './ConversationMessageAI';
import ConversationMessageUser from './ConversationMessageUser';
import { ScrollShadow } from '@nextui-org/react';

export default function ConversationMessageList() {
  const { messages } = useConversationStore();
  return (
    <ScrollShadow className="w-full h-full max-h-full py-8">
      <div className="flex flex-1 flex-col gap-y-4 w-full">
        {messages.map((message) => (
          <>
            {message.createdBy === 'bot' ? (
              <ConversationMessageAI key={message.id} message={message} />
            ) : (
              <ConversationMessageUser key={message.id} message={message} />
            )}
          </>
        ))}
      </div>
    </ScrollShadow>
  );
}
