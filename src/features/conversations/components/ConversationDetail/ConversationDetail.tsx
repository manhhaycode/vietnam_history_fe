import { useNavigate, useParams } from 'react-router-dom';
import HeaderConversation from './HeaderConversation';
import {
  useCreateConversationMutation,
  useCreateMessageConversationMutation,
  useGetConversation,
  useGetConversationMessages,
} from '@/features/conversations';
import { useEffect, useState } from 'react';
import ConversationMessageList from '../ConversationMessage';
import ConversationInput from '../ConversationInput';
import NewConversation from '../NewConversation';
import { Spinner, useDisclosure } from '@nextui-org/react';
import MessageFilterScopeModal from '../MessageFilterScopeModal';
import { useAuthStore, useConversationStore } from '@/libs/store';
import { v4 as uuidv4 } from 'uuid';

export default function ConversationDetail() {
  const { conversationId } = useParams();
  const { user } = useAuthStore();
  const { messages, setMessages } = useConversationStore();
  const navigate = useNavigate();
  const [isCreateNew, setIsCreateNew] = useState(false);
  const manageFilterModal = useDisclosure({ defaultOpen: false });
  const createConversationMutation = useCreateConversationMutation({
    onSuccess: ({ conversation }) => {
      setIsCreateNew(true);
      navigate('/conversations/' + conversation.id);
      setMessages([{ ...messages[0], conversationId: conversation.id }]);
      createMessageConversationMutation.mutate({ conversationId: conversation.id, message: messages[0].content });
    },
    onError: () => {
      console.log('onError');
    },
  });
  const createMessageConversationMutation = useCreateMessageConversationMutation({
    onSuccess: (data, variables) => {
      if (isCreateNew) {
        setIsCreateNew(false);
      }
      setMessages([
        ...messages,
        {
          content: data.message,
          id: uuidv4(),
          metadata: '',
          conversationId: variables.conversationId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'bot',
          updatedBy: 'bot',
        },
      ]);
    },
    onError: () => {
      console.log('onError');
    },
  });
  const { isLoading: isConversationDetailLoading } = useGetConversation(conversationId);
  const { data: conversationMessageList } = useGetConversationMessages(conversationId, !isCreateNew);

  useEffect(() => {
    setMessages(conversationMessageList?.messages ?? []);
  }, [conversationMessageList, setMessages]);

  return (
    <div className="w-full h-full flex flex-col border border-divider rounded-xl pb-3 text-small text-default-400">
      <HeaderConversation />
      <div className="px-6 flex flex-col gap-3 justify-center items-center flex-1 overflow-hidden">
        {conversationId || messages.length ? (
          isConversationDetailLoading && !isCreateNew ? (
            <Spinner className="flex items-center justify-center w-full h-full" size="lg" color="warning"></Spinner>
          ) : (
            <ConversationMessageList />
          )
        ) : (
          // <ConversationMessageList />
          <NewConversation manageFilterModal={manageFilterModal} />
        )}
        <ConversationInput
          disabled={createConversationMutation.isPending || createMessageConversationMutation.isPending}
          onSubmit={(message, clearMessage) => {
            if (conversationId) {
              createMessageConversationMutation.mutate({ conversationId, message });
              setMessages([
                ...messages,
                {
                  content: message,
                  id: uuidv4(),
                  metadata: '',
                  conversationId,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  createdBy: user!.id,
                  updatedBy: user!.id,
                },
              ]);
            } else {
              createConversationMutation.mutate({});
              setMessages([
                {
                  content: message,
                  id: uuidv4(),
                  metadata: '',
                  conversationId: '',
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  createdBy: user!.id,
                  updatedBy: user!.id,
                },
              ]);
            }
            clearMessage();
          }}
        />
        <p className="font-medium">HISVN AI có khả năng nhầm lẫn. Hãy kiểm tra kỹ thông tin.</p>
      </div>
      <MessageFilterScopeModal state={manageFilterModal} />
    </div>
  );
}
