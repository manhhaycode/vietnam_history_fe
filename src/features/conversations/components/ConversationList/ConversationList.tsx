import { IConversation } from "@/features/conversations";
import { Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function ConversationList({
  conversationList,
}: {
  conversationList: IConversation[];
}) {
  return (
    <div className="text-small w-full">
      <p className="p-[10px] text-default-400">Recent</p>
      <ScrollShadow hideScrollBar className="max-h-full h-full">
        <Listbox>
          {conversationList.map((conversation) => (
            <ListboxItem
              key={conversation.id}
              href={`/conversations/${conversation.id}`}
              value={conversation.id}
              className="py-[10px] px-3 h-11 text-default-500 group"
              classNames={{ title: "truncate" }}
              endContent={
                <BiDotsHorizontalRounded
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
