import { Button, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';

export default function ConversationInput({
  onSubmit,
  disabled,
}: {
  onSubmit: (message: string, clearMessage: () => void) => void;
  disabled?: boolean;
}) {
  const [message, setMessage] = useState('');
  return (
    <Textarea
      disabled={disabled}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message"
      variant="bordered"
      fullWidth
      startContent={<Button isIconOnly variant="light" startContent={<ImAttachment size={20} />}></Button>}
      endContent={
        <Button
          onPress={() => onSubmit(message, setMessage.bind(null, ''))}
          isIconOnly
          variant="light"
          startContent={<FaArrowCircleUp size={24} />}
        ></Button>
      }
      size="lg"
      maxRows={4}
      minRows={1}
      classNames={{
        innerWrapper: 'items-center text-foreground',
      }}
    />
  );
}
