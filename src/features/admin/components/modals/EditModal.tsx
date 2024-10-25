import React, { useState } from 'react';
import { Modal, Input, Button } from '@nextui-org/react';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    data: any;
}

export const EditModal: React.FC<EditModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    data
}) => {
    const [formData, setFormData] = useState(data);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="p-4"
        >
            <h1>Edit information</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(data).map((key) => (
                    key !== 'id' && (
                        <div key={key} className="mb-4">
                            <p className="mb-2 capitalize">{key}</p>
                            <Input
                                fullWidth
                                value={formData[key]}
                                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                            />
                        </div>
                    )
                ))}
            </form>
            <Button  color="danger" onClick={() => onClose()}>
                Cancel
            </Button>
            <Button  onClick={() => onSubmit(formData)}>
                Save
            </Button>

        </Modal>
    );
};