import { useState} from 'react';
import Input from '../Input';

import { useAppStore } from '@/libs/store';
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { useState } from 'react';
import { GiJusticeStar } from 'react-icons/gi';
import { IoIosArrowDown, IoIosCheckmarkCircle } from 'react-icons/io';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import { useOverlayTriggerState } from 'react-stately';

export default function ConversationDetail() {
  //   const { conversationId } = useParams();
  const { isNavExpanded, toggleNav } = useAppStore();
  const [selectedModel, setSelectedModel] = useState(new Set<string>('model3'));
  const modeOverlayState = useOverlayTriggerState({});
  return (
    <div className="w-full h-full border border-divider rounded-xl pb-3 text-small text-default-400">
      <div className="border-b border-divider p-2 relative min-h-14">
        {!isNavExpanded && (
          <Button className="text-default-500" isIconOnly variant="light" onClick={toggleNav}>
            <TbLayoutSidebarRightCollapse size={24} />
          </Button>
        )}
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <Popover state={modeOverlayState} placement="bottom" offset={24}>
            <PopoverTrigger>
              <button className="flex items-center gap-2 outline-none">
                HISAI v1
                <IoIosArrowDown size={18} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <Listbox
                selectionMode="single"
                selectedKeys={selectedModel}
                onSelectionChange={(e) => {
                  setSelectedModel(e as Set<string>);
                  modeOverlayState.close();
                }}
                variant="faded"
              >
                <ListboxSection title="Models">
                  <ListboxItem
                    selectedIcon={<IoIosCheckmarkCircle size={20} />}
                    description="Newest and most advanced model"
                    key="model3"
                    textValue="HISAI v3"
                    className="text-default-500 data-[hover=true]:text-default-500 px-2 py-[6px]"
                    classNames={{ selectedIcon: 'w-[20px] h-[20px]' }}
                    startContent={<GiJusticeStar size={20} />}
                  >
                    HISAI v3
                  </ListboxItem>
                  <ListboxItem
                    selectedIcon={<IoIosCheckmarkCircle size={20} />}
                    description="Advanced model for complex tasks"
                    key="model2"
                    textValue="HISAI v2"
                    className="text-default-500 data-[hover=true]:text-default-500 px-2 py-[6px]"
                    classNames={{ selectedIcon: 'w-[20px] h-[20px]' }}
                    startContent={<GiJusticeStar size={20} />}
                  >
                    HISAI v2
                  </ListboxItem>
                  <ListboxItem
                    selectedIcon={<IoIosCheckmarkCircle size={20} />}
                    description="Newest and most advanced model"
                    key="model1"
                    textValue="HISAI v1"
                    className="text-default-500 data-[hover=true]:text-default-500 px-2 py-[6px]"
                    classNames={{ selectedIcon: 'w-[20px] h-[20px]' }}
                    startContent={<GiJusticeStar size={20} />}
                  >
                    HISAI v1
                  </ListboxItem>
                </ListboxSection>
              </Listbox>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {messages.length === 0 && (
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="logo-container mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/8943/8943377.png"  
              alt="Logo" 
              className="w-12 h-12 mx-auto"  
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-6 py-8 rounded-lg flex flex-col items-center justify-between cursor-pointer hover:bg-gray-500"
                onClick={() => handleSendMessage(suggestion.text)}
                style={{ height: '120px', backgroundColor: '#4A4A4A' }}
              >
                <span className="text-3xl mb-2 flex-1 flex items-center justify-center">{suggestion.icon}</span>
                <span className="text-center text-white flex-1 flex items-center justify-center">{suggestion.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}


      <div className="flex-grow overflow-y-auto px-4 py-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-4 flex items-start ${
              msg.createBy === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <img src={msg.avatar} alt={`${msg.createBy} avatar`} className="w-10 h-10 rounded-full mx-4" />
            <div
              className={`p-4 rounded-lg max-w-xl ${
                msg.createBy === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-700 text-white self-start'
              }`}
              style={{ backgroundColor: msg.createBy === 'user' ? '#343541' : '#444654' }} 
            >
              <strong>{msg.createBy === 'user' ? 'You' : 'HISVNAI'}</strong>
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
      </div>

     
      <Input onSendMessage={handleSendMessage} />
    </div>
  );
}
