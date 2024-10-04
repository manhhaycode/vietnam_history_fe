import { IConversation } from '@/features/conversations';
import { Listbox, ListboxItem, ScrollShadow } from '@nextui-org/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function ConversationList({ conversationList }: { conversationList: IConversation[] }) {
  const navigate = useNavigate();
  return (
    <div className="text-small w-full">
      <ScrollShadow hideScrollBar className="max-h-full h-full">
        <Listbox>
          {conversationList.map((conversation) => (
            <ListboxItem
              onClick={() => {
                navigate(`/conversations/${conversation.id}`);
              }}
              key={conversation.id}
              value={conversation.id}
              className="py-[10px] px-3 h-11 text-default-500 group"
              classNames={{ title: 'truncate' }}
              endContent={
                <BiDotsHorizontalRounded
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  size={24}
                  className="hidden group-hover:block"
                />
              }
            >
              {conversation.name}
            </ListboxItem>
          ))}
        </Listbox>
      </ScrollShadow>
    </div>
  );
}
