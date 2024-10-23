import { useAuthStore } from '@/libs/store';
import { Avatar } from '@nextui-org/react';
import { IMessage } from '@/features/conversations';

export default function ConversationMessageUser({ message }: { message: IMessage }) {
  const { user } = useAuthStore();
  return (
    <div className="flex w-full gap-x-3 items-start justify-end">
      <div className="flex flex-col">
        <div className="flex gap-x-2 items-center">
          <div className="text-sm font-semibold text-default-500">{message.createdBy}</div>
          <div className="text-xs text-default-400">{message.createdAt}</div>
        </div>
        <div className="text-sm text-default-500">{message.content}</div>
      </div>
      <div className="flex-shrink-0">
        <Avatar src={user?.avatar} alt="avatar_user" size="sm" />
      </div>
    </div>
  );
}
