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
  import { EEraStatus, IEra } from '@/features/era'; 
  import { useForm } from 'react-hook-form';
  import { useEffect } from 'react';
  
  export default function UpsertEraModal({
    state,
    data,
    onSubmitForm,
  }: {
    state: ReturnType<typeof useDisclosure>;
    data: IEra | null;
    onSubmitForm?: (data: IEra, isEdit: boolean) => void;
  }) {
    const { handleSubmit, register, reset } = useForm<IEra>({
      defaultValues: { status: EEraStatus.PENDING },
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
                {data ? 'Cập nhật thời đại' : 'Tạo thời đại mới'}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    <Input label="Tên thời đại" {...register('name')} defaultValue={data?.name} />
                    <Textarea label="Mô tả" {...register('description')} defaultValue={data?.description} />
                    <Input label="Hình ảnh" {...register('thumbnail')} defaultValue={data?.thumbnail} />
                    <Input
                      type="datetime-local"
                      label="Ngày bắt đầu"
                      {...register('startDate')}
                      defaultValue={data?.startDate}
                    />
                    <Input
                      type="datetime-local"
                      label="Ngày kết thúc"
                      {...register('endDate')}
                      defaultValue={data?.endDate}
                    />
                    
                    
                    <Select
                      label="Trạng thái"
                      {...register('status')}
                      defaultSelectedKeys={[data?.status ?? EEraStatus.PENDING]}
                    >
                      {Object.values(EEraStatus).map((option) => (
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
  