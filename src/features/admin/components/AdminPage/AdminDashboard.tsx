import NavBar from '@/layouts/components/NavBar';
import { Button } from '@nextui-org/react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { useAppStore } from '@/libs/store';
import { CiSquareQuestion } from 'react-icons/ci';
import { MdContentPaste } from 'react-icons/md';

export default function AdminDashboard() {
    const { isNavExpanded } = useAppStore();

    const users = [
        { id: 1, name: 'Alice Johnson', email: 'alice.johnson@gmail.com',role : 'Staff', status: 'Active' },
        { id: 2, name: 'Bob Smith', email: 'bob.smith@gmail.com',role : 'User', status: 'Inactive' },
        { id: 3, name: 'Charlie Davis', email: 'charlie.davis@gmail.com',role : 'User', status: 'Active' },
    ];

    const deleteUser = (id: number) => {
        console.log(`Delete user with id: ${id}`);
    };

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


                <div className="overflow-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    User Name
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    
                                    <td className="px-6 py-4 border-b bg-[#18181B]">{user.name}</td>
                                    <td className="px-6 py-4 border-b bg-[#18181B]">{user.email}</td>
                                    <td className="px-6 py-4 border-b bg-[#18181B]">{user.role}</td>
                                    <td className="px-6 py-4 border-b bg-[#18181B]">{user.status}</td>
                                    <td className="px-6 py-4 border-b bg-[#18181B]">
                                        <Button size="sm" color="danger" onClick={() => deleteUser(user.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
