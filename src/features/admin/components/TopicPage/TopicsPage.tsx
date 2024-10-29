import { useGetTopicById as useGetTopicByIdFromTopicAPI, useDeleteTopicMutation } from '@/features/topic/api/topicAPI';
import { useNavigate } from 'react-router-dom';
import Table from '@/features/admin/components/Table';
import NavBar from '@/layouts/components/NavBar';
import { Button } from '@nextui-org/react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { CiSquareQuestion, CiEdit } from 'react-icons/ci';
import { MdContentPaste } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { useAppStore } from '@/libs/store';

export default function TopicsPage() {
    const { isNavExpanded } = useAppStore();
    const { data: topics, isLoading, isError } = useGetTopicById();
    const deleteTopicMutation = useDeleteTopicMutation();
    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate(`/admin/edit-topic/${id}`);
    };

    const handleAddTopicClick = () => {
        navigate('/admin/add-topic');
    };
    

    const handleViewTopicClick = () => {
        navigate('/admin/topics');
    };

    const handleDelete = (id: string) => {
        deleteTopicMutation.mutate(id, {
            onSuccess: () => {
                alert('Topic deleted successfully');
            },
            onError: (error) => {
                alert(`Failed to delete topic: ${error}`);
            }
        });
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'status', label: 'Status' },
    ];

    if (isLoading) return <p>Loading topics...</p>;
    if (isError) return <p>Error loading topics</p>;

    return (
        <div className="flex h-[calc(100dvh)]">
            
            <div className={twMerge('transition-all h-full overflow-x-hidden', isNavExpanded ? 'w-72' : 'w-0')}>
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
                        startContent={<CiEdit size={24} />}
                        onClick={handleAddTopicClick}
                    >
                        Add New Topic
                    </Button>
                    <Button
                        className="bg-default-foreground text-default-50 h-12 w-full justify-start mt-2 mb-6 flex-none"
                        startContent={<MdContentPaste size={24} />}
                        onClick={handleViewTopicClick}
                    >
                        View all topics
                    </Button>
                    <p className="px-4 py-3 text-small text-default-400">User Management</p>
                </NavBar>
            </div>

          
            <div className="flex-1 p-4">
                <h2 className="text-xl font-bold mb-4">All Topics</h2>
                {topics && topics.length > 0 ? (
                    <Table
                        columns={columns}
                        data={topics}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <p>No topics available.</p>
                )}
            </div>
        </div>
    );
}
function useGetTopicById(): { data: any; isLoading: any; isError: any; } {
    throw new Error('Function not implemented.');
}

