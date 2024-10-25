import React, { useState } from 'react';
import NavBar from '@/layouts/components/NavBar';
import { Button } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { useAppStore } from '@/libs/store';
import { useCreateTopicMutation } from '@/features/topic/api';
import { MdContentPaste } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { CiSquareQuestion } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

export default function AdminAddTopic() {
    const { isNavExpanded } = useAppStore();
    const navigate = useNavigate(); 
    const handleAddTopicClick = () => {
        navigate('/admin/add-topic'); 
    };
    const [topicData, setTopicData] = useState({
        name: '',
        description: '',
        thumbnail: '',
        status: '',
        metadata: '',
    });
    const [isCreating, setIsCreating] = useState(false);

    const createTopicMutation = useCreateTopicMutation({
        onSuccess: () => {
            alert('Topic created successfully');
            setTopicData({ name: '', description: '', thumbnail: '', status: '', metadata: '' });
        },
        onError: (error) => {
            alert(`Failed to create topic: ${error}`);
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTopicData({ ...topicData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        createTopicMutation.mutate(topicData);
        setIsCreating(false);
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
                        onClick={handleAddTopicClick}
                    >
                        Add New Topic
                    </Button>

                    <p className="px-4 py-3 text-small text-default-400">User Management</p>
                </NavBar>
            </div>

            <div className="flex-1 px-4">
                <h2 className="text-xl font-bold mb-4">Add New Topic</h2>

                <div className="p-4 bg-gray-100 border border-gray-300">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="text-[color:#333]">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={topicData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border bg-gray-900"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-[color:#333]">Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={topicData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border bg-gray-900"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-[color:#333]">Thumbnail:</label>
                            <input
                                type="text"
                                name="thumbnail"
                                value={topicData.thumbnail}
                                onChange={handleInputChange}
                                className="w-full p-2 border bg-gray-900"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-[color:#333]">Status:</label>
                            <input
                                type="text"
                                name="status"
                                value={topicData.status}
                                onChange={handleInputChange}
                                className="w-full p-2 border bg-gray-900"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-[color:#333]">Metadata:</label>
                            <input
                                type="text"
                                name="metadata"
                                value={topicData.metadata}
                                onChange={handleInputChange}
                                className="w-full p-2 border bg-gray-900"
                            />
                        </div>
                        <Button type="submit" disabled={isCreating}>
                            {isCreating ? 'Creating...' : 'Create Topic'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
