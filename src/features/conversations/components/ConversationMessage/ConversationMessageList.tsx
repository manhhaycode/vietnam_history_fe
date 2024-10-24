import { useConversationStore } from '@/libs/store';
import ConversationMessageAI from './ConversationMessageAI';
import ConversationMessageUser from './ConversationMessageUser';
import { ScrollShadow } from '@nextui-org/react';
import { Fragment } from 'react/jsx-runtime';

export default function ConversationMessageList() {
  const { messages } = useConversationStore();
  return (
    <ScrollShadow className="w-full h-full max-h-full py-8">
      <div className="flex flex-1 flex-col gap-y-4 w-full">
        {messages.map((message) => (
          <Fragment key={message.id}>
            {message.createdBy === 'bot' ? (
              <ConversationMessageAI message={message} />
            ) : (
              <ConversationMessageUser message={message} />
            )}
          </Fragment>
        ))}
      </div>
    </ScrollShadow>
  );
}
