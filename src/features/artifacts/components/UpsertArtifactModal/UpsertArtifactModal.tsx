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
import { IArtifact, EArtifactStatus } from '@/features/artifacts'; 
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function UpsertArtifactModal({
  state,
  data,
  onSubmitForm,
}: {
  state: ReturnType<typeof useDisclosure>;
  data: IArtifact | null;
  onSubmitForm?: (data: IArtifact, isEdit: boolean) => void;
}) {
  const { handleSubmit, register, reset } = useForm<IArtifact>({
    defaultValues: { status: EArtifactStatus.PENDING },
  });

  const onSubmit = handleSubmit((dataSubmit) => {
    if (onSubmitForm) onSubmitForm(dataSubmit, !!data);
  });

  useEffect(() => {
    if (state.isOpen) {
      if (data) reset(data);
      else setTimeout(() => reset(), 0);
    }
  }, [state.isOpen, data, reset]);

  return (
    <Modal placement="top" size="xl" isOpen={state.isOpen} onOpenChange={state.onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {data ? 'Cập nhật hiện vật' : 'Tạo hiện vật mới'}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <Input label="Tên hiện vật" {...register('name')} defaultValue={data?.name} />
                  <Textarea label="Mô tả" {...register('description')} defaultValue={data?.description} />
                  <Input label="Vị trí tìm thấy" {...register('locationFound')} defaultValue={data?.locationFound} />
                  <Input label="Thumbnail" {...register('thumbnail')} defaultValue={data?.thumbnail} />
                  <Select
                    label="Trạng thái"
                    {...register('status')}
                    defaultSelectedKeys={[data?.status ?? EArtifactStatus.PENDING]}
                  >
                    {Object.values(EArtifactStatus).map((option) => (
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
