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
import { EFigureStatus, IFigure } from '@/features/figure';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import dayjs from 'dayjs';

export default function UpsertFigureModal({
  state,
  data,
  onSubmitForm,
}: {
  state: ReturnType<typeof useDisclosure>;
  data: IFigure | null;
  onSubmitForm?: (data: IFigure, isEdit: boolean) => void;
}) {
  const { handleSubmit, register, reset } = useForm<IFigure>({
    defaultValues: { status: EFigureStatus.PENDING },
  });

  const onSubmit = handleSubmit((dataSubmit) => {
    if (onSubmitForm)
      onSubmitForm(
        {
          ...dataSubmit,
          birthDate: dayjs(dataSubmit.birthDate).toISOString(),
          deathDate: dayjs(dataSubmit.deathDate).toISOString(),
        },
        !!data,
      );
  });

  useEffect(() => {
    if (state.isOpen) {
      if (data)
        reset({
          ...data,
          birthDate: dayjs(data.birthDate).format('YYYY-MM-DD'),
          deathDate: dayjs(data.deathDate).format('YYYY-MM-DD'),
        });
      else setTimeout(() => reset(), 0);
    }
  }, [state.isOpen, data, reset]);

  return (
    <Modal placement="top" size="xl" isOpen={state.isOpen} onOpenChange={state.onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{data ? 'Cập nhật nhân vật' : 'Tạo nhân vật mới'}</ModalHeader>
            <ModalBody>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <Input label="Tên nhân vật" {...register('name')} defaultValue={data?.name} />
                  <Textarea label="Tiểu sử" {...register('biography')} defaultValue={data?.biography} />
                  <Input label="Ngày sinh" {...register('birthDate')} />
                  <Input label="Ngày mất" {...register('deathDate')} />
                  <Input label="Hình ảnh" {...register('thumbnail')} defaultValue={data?.thumbnail} />
                  <Select
                    label="Trạng thái"
                    {...register('status')}
                    defaultSelectedKeys={[data?.status ?? EFigureStatus.PENDING]}
                  >
                    {Object.values(EFigureStatus).map((option) => (
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
