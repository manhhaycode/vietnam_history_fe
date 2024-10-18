import { Button, Textarea } from '@nextui-org/react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';

export default function ConversationInput() {
  return (
    <Textarea
      placeholder="Type a message"
      variant="bordered"
      fullWidth
      startContent={<Button isIconOnly variant="light" startContent={<ImAttachment size={20} />}></Button>}
      endContent={<Button isIconOnly variant="light" startContent={<FaArrowCircleUp size={24} />}></Button>}
      size="lg"
      maxRows={4}
      minRows={1}
      classNames={{
        innerWrapper: 'items-center text-foreground',
      }}
    />
  );
}
