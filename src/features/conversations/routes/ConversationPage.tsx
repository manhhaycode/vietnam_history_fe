import NavBar from '@/layouts/components/NavBar';
import ConversationList from '../components/ConversationList';
import { Button } from '@nextui-org/react';
import { AiOutlineMessage } from 'react-icons/ai';
import ConversationDetail from '../components/ConversationDetail/ConversationDetail';
import { useGetConversations } from '../api';
import { useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useAppStore } from '@/libs/store';

export default function ConversationPage() {
  const { conversationId } = useParams();
  const { data: conversations } = useGetConversations({ page: 1, size: 10 });
  const { isNavExpanded } = useAppStore();

  return (
    <div className="flex h-[calc(100dvh)] py-4">
      <div className={twMerge('h-full transition-size overflow-x-hidden', isNavExpanded ? 'w-72' : 'w-0')}>
        <NavBar>
          <Button
            className="bg-default-foreground text-default-50 h-12 w-full justify-start mt-2 mb-6 flex-none"
            startContent={<AiOutlineMessage size={24} />}
          >
            New Chat
          </Button>
          <p className="px-4 py-3 text-small text-default-400">Recent</p>
          <div className="p-1 flex flex-1 overflow-hidden">
            {conversations && (
              <ConversationList conversationList={conversations.data} selectedConversation={conversationId} />
            )}
          </div>
        </NavBar>
      </div>
      <div className="flex-1 px-4">
        <ConversationDetail />
      </div>
    </div>
  );
}
