import NavBar from "@/layouts/components/NavBar";
import ConversationList from "../components/ConversationList";
import { Button } from "@nextui-org/react";
import { AiOutlineMessage } from "react-icons/ai";
import { IConversation } from "../types";
import ConversationDetail from "../components/ConversationDetail/ConversationDetail";

const conversations: IConversation[] = [
  { id: "1", name: "John Doe", messages: [] },
  { id: "2", name: "Custom support message AI", messages: [] },
  { id: "3", name: "Alice Smith", messages: [] },
  { id: "4", name: "Bob Johnson", messages: [] },
  { id: "5", name: "Charlie Brown", messages: [] },
  { id: "6", name: "David Wilson", messages: [] },
  { id: "7", name: "Eva Green", messages: [] },
  { id: "8", name: "Frank White", messages: [] },
  { id: "9", name: "Grace Black", messages: [] },
  { id: "10", name: "Hank Blue", messages: [] },
];

export default function ConversationPage() {
  return (
    <div className="flex h-[calc(100dvh)] py-4">
      <div className="w-72 h-full">
        <NavBar>
          <Button
            className="bg-default-foreground text-default-50 h-12 w-full justify-start mt-2 mb-6 flex-none"
            startContent={<AiOutlineMessage size={24} />}
          >
            New Chat
          </Button>
          <div className="p-1 flex flex-1 overflow-hidden">
            {/* <div className="h-[10000px]"></div> */}
            <ConversationList conversationList={conversations} />
          </div>
        </NavBar>
      </div>
      <div className="flex-1 px-4">
        <ConversationDetail />
      </div>
    </div>
  );
}
