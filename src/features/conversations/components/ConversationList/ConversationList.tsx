import { IConversation } from '@/features/conversations';
import { Listbox, ListboxItem, ScrollShadow } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import ConversationPopup from './ConversationPopup';
import { twMerge } from 'tailwind-merge';

export default function ConversationList({
  conversationList,
  selectedConversation,
}: {
  conversationList: IConversation[];
  selectedConversation?: string;
}) {
  return (
    <div className="text-small w-full">
      <ScrollShadow hideScrollBar className="max-h-full h-full">
        <Listbox classNames={{ list: 'gap-1' }}>
          {conversationList.map((conversation) => (
            <ListboxItem
              id={'conversation-' + conversation.id}
              classNames={{
                base: twMerge(
                  'p-0 text-default-500 data-[popover=true]:transition-colors data-[popover=true]:bg-default data-[popover=true]:text-default-foreground ',
                  selectedConversation === conversation.id ? 'text-default-foreground bg-default' : '',
                ),
              }}
              hideSelectedIcon={true}
              key={conversation.id}
              textValue={conversation.name}
              endContent={<ConversationPopup conversation={conversation} />}
            >
              <Link className="w-full p-3 block" to={`/conversations/${conversation.id}`}>
                {conversation.name}
              </Link>
            </ListboxItem>
          ))}
        </Listbox>
      </ScrollShadow>
    </div>
  );
}
