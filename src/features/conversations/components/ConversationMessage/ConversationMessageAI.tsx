import { IMessage } from '@/features/conversations';
import { Avatar } from '@nextui-org/react';
import dayjs from 'dayjs';
import { marked } from 'marked';
export default function ConversationMessageAI({ message }: { message: Partial<IMessage> }) {
  return (
    <div className="flex w-full gap-x-3 items-start justify-start">
      <div className="flex-shrink-0">
        <Avatar src="/images/avatar_ai.png" alt="avatar_ai" size="sm" />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-x-2 items-center">
          <div className="text-sm font-semibold text-default-500">{message.createdBy}</div>
          <div className="text-xs text-default-400">{dayjs(message.createdAt).format('HH:mm')}</div>
        </div>
        <div
          className="text-sm text-default-500"
          dangerouslySetInnerHTML={{ __html: marked(message.content || '', { breaks: true }) }}
        ></div>
      </div>
    </div>
  );
}
