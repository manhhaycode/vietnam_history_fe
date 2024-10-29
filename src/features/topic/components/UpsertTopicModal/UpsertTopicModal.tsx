import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { ETopicStatus, ITopic } from '@/features/topic';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
export default function UpsertTopicModal({
  state,
  data,
  onSubmitForm,
}: {
  state: ReturnType<typeof useDisclosure>;
  data: ITopic | null;
  onSubmitForm?: (data: ITopic, isEdit: boolean) => void;
}) {
  const { handleSubmit, register, reset } = useForm<ITopic>({ defaultValues: {} });

  const onSubmit = handleSubmit((dataSubmit) => {
    if (onSubmitForm) onSubmitForm(dataSubmit, !!data);
  });

  useEffect(() => {
    if (state.isOpen) {
      if (data) reset(data);
      else
        setTimeout(() => {
          reset();
        });
    }
  }, [state.isOpen, data, reset]);

  return (
    <Modal placement="top" size="xl" isOpen={state.isOpen} onOpenChange={state.onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{data ? 'Cập nhật chủ đề' : 'Tạo chủ đề mới'}</ModalHeader>
            <ModalBody>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <Input label="Tên chủ đề" {...register('name')} defaultValue={data?.name} />
                  <Textarea label="Mô tả" {...register('description')} defaultValue={data?.description} />
                  <Input label="Hình ảnh" {...register('thumbnail')} defaultValue={data?.thumbnail} />
                  <Select
                    label="Trạng thái"
                    {...register('status')}
                    {...(data?.status && { defaultSelectedKeys: [data.status] })}
                  >
                    {Object.keys(ETopicStatus).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </Select>
                  <Button radius="sm" color="primary" type="submit">
                    {data ? 'Cập nhật' : 'Tạo mới'}
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
