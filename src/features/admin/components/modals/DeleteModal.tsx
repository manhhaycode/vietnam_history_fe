import React from 'react';
import { Modal, Button } from '@nextui-org/react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = 'this item',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      
          <p >Confirm</p>
          <p>Are you sure you want to delete {itemName}?</p>
          <Button  color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button  color="danger" onClick={onConfirm}>
            Delete
          </Button>
     
    </Modal>
  );
};

export default DeleteModal;
