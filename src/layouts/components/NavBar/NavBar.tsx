import { Logo } from '@/assets/icons';
import { AccountMenu } from '@/features/user';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { TbSettings2 } from 'react-icons/tb';

export default function NavBar({ children }: { children: React.ReactNode[] }) {
  return (
    <nav className="flex flex-col flex-1 p-4 bg-[#18181B] h-full w-full">
      <div className="flex gap-2 px-2 items-center mb-8">
        <Logo />
        <h1 className="font-bold">HISVN AI</h1>
      </div>
      <AccountMenu />
      {children}

      <Listbox>
        <ListboxItem
          key={'help'}
          className="py-[10px] px-3 h-11 text-default-500"
          classNames={{ title: 'truncate' }}
          startContent={<IoInformationCircleOutline size={24} />}
        >
          Help
        </ListboxItem>
        <ListboxItem
          key={'settings'}
          className="py-[10px] px-3 h-11 text-default-500"
          classNames={{ title: 'truncate' }}
          startContent={<TbSettings2 size={24} />}
        >
          Settings
        </ListboxItem>
      </Listbox>
    </nav>
  );
}
