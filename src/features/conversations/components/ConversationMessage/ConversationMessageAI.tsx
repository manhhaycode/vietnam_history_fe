import { IMessage } from '@/features/conversations';
import { Avatar } from '@nextui-org/react';

export default function ConversationMessageAI({ message }: { message: IMessage }) {
  return (
    <div className="flex w-full gap-x-3 items-start justify-start">
      <div className="flex-shrink-0">
        <Avatar src="/images/avatar_ai.png" alt="avatar_ai" size="sm" />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-x-2 items-center">
          <div className="text-sm font-semibold text-default-500">{message.createdBy}</div>
          <div className="text-xs text-default-400">{message.createdAt}</div>
        </div>
        <div className="text-sm text-default-500">{message.content}</div>
      </div>
    </div>
  );
}
