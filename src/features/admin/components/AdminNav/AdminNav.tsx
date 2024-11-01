import NavBar from '@/layouts/components/NavBar';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { Link, useLocation } from 'react-router-dom';

export default function AdminNav() {
  const location = useLocation();

  return (
    <div className="h-[calc(100dvh)] w-72 sticky top-0 left-0">
      <NavBar>
        <div className="flex-1 py-4">
          <Listbox classNames={{ list: 'gap-4' }}>
            <ListboxItem
              classNames={{
                base: twMerge(
                  'p-0 text-default-500 data-[popover=true]:transition-colors data-[popover=true]:bg-default data-[popover=true]:text-default-foreground ',
                  location.pathname.includes('manage-topic') ? 'text-default-foreground bg-default' : '',
                ),
              }}
              hideSelectedIcon={true}
              key={'Manage Topic'}
              textValue={'Manage Topic'}
            >
              <Link className="w-full p-3 block" to={`/admin/manage-topic`}>
                Manage Topic
              </Link>
            </ListboxItem>
            <ListboxItem
              classNames={{
                base: twMerge(
                  'p-0 text-default-500 data-[popover=true]:transition-colors data-[popover=true]:bg-default data-[popover=true]:text-default-foreground ',
                  location.pathname.includes('manage-event') ? 'text-default-foreground bg-default' : '',
                ),
              }}
              hideSelectedIcon={true}
              key={'Manage Event'}
              textValue={'Manage Event'}
            >
              <Link className="w-full p-3 block" to={`/admin/manage-event`}>
                Manage Event
              </Link>
            </ListboxItem>
            <ListboxItem
              classNames={{
                base: twMerge(
                  'p-0 text-default-500 data-[popover=true]:transition-colors data-[popover=true]:bg-default data-[popover=true]:text-default-foreground ',
                  location.pathname.includes('manage-place') ? 'text-default-foreground bg-default' : '',
                ),
              }}
              hideSelectedIcon={true}
              key={'Manage place'}
              textValue={'Manage place'}
            >
              <Link className="w-full p-3 block" to={`/admin/manage-place`}>
                Manage Place
              </Link>
            </ListboxItem>
          </Listbox>
        </div>
      </NavBar>
    </div>
  );
}
