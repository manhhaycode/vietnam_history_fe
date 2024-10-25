import React, { useState } from 'react';
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

  
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{ id: string, name: string, email: string } | null>(null);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
      ];
      
    const data = [
        { id: '1', name: 'John Doe', email: 'johndoe@gmail.com' },
        { id: '2', name: 'Jane Smith', email: 'janesmith@gmail.com' },
        { id: '3', name: 'Alice Johnson', email: 'alice@gmail.com' },
    ];

   
    const handleEdit = (id: string) => {
        const user = data.find((user) => user.id === id);
        if (user) {
            setSelectedUser(user);
            setIsEditing(true);  
        }
    };


    const handleDelete = (id: string) => {
        const user = data.find((user) => user.id === id);
        if (user) {
            setSelectedUser(user);
            setIsDeleting(true);  
        }
    };

   
    const handleEditSubmit = (updatedUser: any) => {
        console.log('Updated User Data:', updatedUser);
        setIsEditing(false);  
    };

   
    const handleDeleteConfirm = () => {
        if (selectedUser) {
            console.log(`Deleting user with id: ${selectedUser.id}`);
            setIsDeleting(false); 
        }
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

                <div className="p-4">
                    <Table
                        columns={columns}
                        data={data}
                        onEdit={(id: string) => handleEdit(id)}
                        onDelete={(id: string) => handleDelete(id)}
                    />

                    {/* Edit Form */}
                    {isEditing && selectedUser && (
                        <div className="mt-4 p-4 bg-gray-100 border border-gray-300">
                            <h3 className="text-[color:#333]">Edit User</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleEditSubmit(selectedUser);
                            }}>
                                <div className="mb-4">
                                    <label className="text-[color:#333]">Name:</label>
                                    <input
                                        type="text"
                                        value={selectedUser.name}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                        className="w-full p-2 border"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="text-[color:#333]">Email:</label>
                                    <input
                                        type="email"
                                        value={selectedUser.email}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                        className="w-full p-2 border"
                                    />
                                </div>
                                <Button type="submit">Save</Button>
                                <Button onClick={() => setIsEditing(false)} className="ml-2" color="danger">Cancel</Button>
                            </form>
                        </div>
                    )}

                    {/* Delete Confirm */}
                    {isDeleting && selectedUser && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-300">
                            <h3 className="text-[color:#333]">Are you sure you want to delete {selectedUser.name}?</h3>
                            <Button onClick={handleDeleteConfirm} color="danger">Confirm Delete</Button>
                            <Button onClick={() => setIsDeleting(false)} className="ml-2">Cancel</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
