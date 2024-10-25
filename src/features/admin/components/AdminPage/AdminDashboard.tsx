import NavBar from '@/layouts/components/NavBar';
import { Button } from '@nextui-org/react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { useAppStore } from '@/libs/store';
import { CiSquareQuestion } from 'react-icons/ci';
import { MdContentPaste } from 'react-icons/md';
import Table from '../Table';

export default function AdminDashboard() {
    const { isNavExpanded } = useAppStore();

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
    ];

    const data = [
        { id: '1', name: 'John Doe', email: 'johndoe@example.com' },
        { id: '2', name: 'Jane Smith', email: 'janesmith@example.com' },
        { id: '3', name: 'Alice Johnson', email: 'alice@example.com' },
    ];

    const handleEdit = (id: string) => {
        console.log(`Editing user with id: ${id}`);
    };

    const handleDelete = (id: string) => {
        console.log(`Deleting user with id: ${id}`);
    };

    //Layouts 
    return (
        <div className="flex h-[calc(100dvh)] py-4">

            <div className={twMerge('h-full transition-size overflow-x-hidden', isNavExpanded ? 'w-72' : 'w-0')}>
                <NavBar>
                    <Button
                        className="bg-default-foreground text-default-50 h-12 w-full justify-start mt-2 mb-6 flex-none"
                        startContent={<AiOutlineUserAdd size={24} />}
                    >
                        Add New User
                    </Button>
                    <Button
                        className="bg-default-foreground text-default-50 h-12 w-full justify-start mt-2 mb-6 flex-none"
                        startContent={<CiSquareQuestion size={24} />}
                    >
                        Request
                    </Button>
                    <Button
                        className="bg-default-foreground text-default-50 h-12 w-full justify-start mt-2 mb-6 flex-none"
                        startContent={<MdContentPaste size={24} />}
                    >
                        Add New Topic
                    </Button>

                    <p className="px-4 py-3 text-small text-default-400">User Management</p>
                </NavBar>
            </div>


            <div className="flex-1 px-4">
                <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

                <div className="p-4">
                    <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
                </div>

            </div>
        </div>
    );
}
