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
import { EPlaceStatus, IPlace } from '@/features/places'; 
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function UpsertPlaceModal({
  state,
  data,
  onSubmitForm,
}: {
  state: ReturnType<typeof useDisclosure>;
  data: IPlace | null;
  onSubmitForm?: (data: IPlace, isEdit: boolean) => void;
}) {
  const { handleSubmit, register, reset } = useForm<IPlace>({
    defaultValues: { status: EPlaceStatus.PENDING },
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
              {data ? 'Cập nhật địa điểm' : 'Tạo địa điểm mới'}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <Input label="Tên địa điểm" {...register('name')} defaultValue={data?.name} />
                  <Textarea label="Mô tả" {...register('description')} defaultValue={data?.description} />
                  <Input label="Địa chỉ" {...register('location')} defaultValue={data?.location} />
                  <Input label="Hình ảnh" {...register('thumbnail')} defaultValue={data?.thumbnail} />
                  <Select
                    label="Trạng thái"
                    {...register('status')}
                    defaultSelectedKeys={[data?.status ?? EPlaceStatus.PENDING]}
                  >
                    {Object.values(EPlaceStatus).map((option) => (
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
