import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTopicById , useUpdateTopicMutation } from '@/features/topic/api/topicAPI';
import { Button, Input, Textarea } from '@nextui-org/react';

export default function EditTopicPage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const { data: topic, isLoading, isError } = useGetTopicById(id as string); 
    const updateTopicMutation = useUpdateTopicMutation(); 

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: '',
        thumbnail: '',
        metadata: '',
    });

    
    useEffect(() => {
        if (topic) {
            setFormData({
                name: topic.name,
                description: topic.description ,
                status: topic.status ,
                thumbnail: topic.thumbnail ,
                metadata: topic.metadata ,
            });
        }
    }, [topic]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateTopicMutation.mutate(
            { id: id as string, ...formData },
            {
                onSuccess: () => {
                    alert('Topic updated successfully!');
                    navigate('/admin/topics'); // Redirect after update
                },
                onError: (error) => {
                    alert(`Failed to update topic: ${error.message}`);
                },
            }
        );
    };

    if (isLoading) return <p>Loading topic...</p>;
    if (isError) return <p>Error loading topic</p>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Edit Topic</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    className="mb-4"
                />
                <Textarea
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    className="mb-4"
                />
                <Input
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    fullWidth
                    className="mb-4"
                />
                <Input
                    label="Thumbnail"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    fullWidth
                    className="mb-4"
                />
                <Textarea
                    label="Metadata"
                    name="metadata"
                    value={formData.metadata}
                    onChange={handleChange}
                    fullWidth
                    className="mb-4"
                />
                <Button type="submit" color="primary" className="mt-4">
                    Update Topic
                </Button>
            </form>
        </div>
    );
// }
// function useGetTopicById(arg0: string): { data: any; isLoading: any; isError: any; } {
//     throw new Error('Function not implemented.');
// }

