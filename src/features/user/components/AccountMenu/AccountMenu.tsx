import { useAuthStore } from '@/libs/store';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { TbSelector } from 'react-icons/tb';

export default function AccountMenu() {
  const { user } = useAuthStore();
  return (
    user && (
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="h-[60px] w-full p-3 flex border"
            endContent={<TbSelector size={20} className="text-[#A1A1AA]" />}
          >
            <div className="flex gap-2 flex-1">
              <Avatar size="sm" src={user.avatar} />
              <div className="flex flex-col text-left">
                <p className="font-semibold text-small">{user.fullName}</p>
                <p className="text-tiny text-default-400">{user.email}</p>
              </div>
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection>
            <DropdownItem className="text-default-500">
              <div className="flex gap-2 flex-1">
                <Avatar size="sm" src={user.avatar} />
                <div className="flex flex-col text-left">
                  <p className="font-semibold text-small">{user.fullName}</p>
                  <p className="text-tiny text-default-400">{user.email}</p>
                </div>
              </div>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider>
            <DropdownItem className="text-default-500">My Plan</DropdownItem>
            <DropdownItem className="text-default-500">My Gemini</DropdownItem>
            <DropdownItem className="text-default-500">Customize HISVN AI</DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider>
            <DropdownItem className="text-default-500">Settings</DropdownItem>
            <DropdownItem className="text-default-500">Dowload Mobile App</DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem className="text-default-500">Help & Support</DropdownItem>
            <DropdownItem className="text-danger" color="danger">
              Sign out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    )
  );
}
