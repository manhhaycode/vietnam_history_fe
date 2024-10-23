import {
  Accordion,
  AccordionItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

export default function MessageFilterScopeModal({
  state,
  portalContainer,
}: {
  state: ReturnType<typeof useDisclosure>;
  portalContainer?: Element;
}) {
  return (
    <Modal
      placement="center"
      portalContainer={portalContainer}
      size="xl"
      isOpen={state.isOpen}
      onOpenChange={state.onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Chọn phạm vi câu hỏi</ModalHeader>
            <ModalBody>
              <Accordion variant="splitted">
                <AccordionItem title="Chủ đề">Tất cả</AccordionItem>
                <AccordionItem title="Niên đại">Chỉ câu hỏi hiện tại</AccordionItem>
                <AccordionItem title="Sự kiện lịch sử">Chỉ trong cuộc trò chuyện</AccordionItem>
                <AccordionItem title="Nhân vật lịch sử">Chỉ trong cuộc trò chuyện</AccordionItem>
                <AccordionItem title="Di tích lịch sử">Chỉ trong cuộc trò chuyện</AccordionItem>
                <AccordionItem title="Hiện vật lịch sử">Chỉ trong cuộc trò chuyện</AccordionItem>
              </Accordion>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
