import React, { useState, useEffect } from 'react';
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
import dayjs from 'dayjs';
import InputTime from '../InputTime';

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
    defaultValues: { status: EEraStatus.PENDING, era: 'AD' },
  });

  const [startEra, setStartEra] = useState('AD'); // State cho kỷ nguyên của startDate
  const [endEra, setEndEra] = useState('AD'); // State cho kỷ nguyên của endDate

  const onSubmit = handleSubmit((dataSubmit) => {
    const startDateParts = dataSubmit.startDate.split('/');
    const endDateParts = dataSubmit.endDate.split('/');

    const startYear = startEra === 'BC' ? (0 - parseInt(startDateParts[0], 10)).toString() : startDateParts[0];
    const endYear = endEra === 'BC' ? (0 - parseInt(endDateParts[0], 10)).toString() : endDateParts[0];

    const formattedData = {
      ...dataSubmit,
      startDate: `${startYear}-${startDateParts[1] || '01'}-01`,
      endDate: `${endYear}-${endDateParts[1] || '01'}-01`,
      era: startEra as 'AD' | 'BC',
    };

    console.log("Dữ liệu gửi đi:", formattedData);

    if (onSubmitForm) {
      onSubmitForm(formattedData, !!data);
    }
  });

  useEffect(() => {
    if (state.isOpen) {
      if (data) {
        reset({
          ...data,
          startDate: dayjs(data.startDate).format('YYYY'),
          endDate: dayjs(data.endDate).format('YYYY'),
          era: parseInt(data.startDate) < 0 ? 'BC' : 'AD',
        });
        setStartEra(parseInt(data.startDate) < 0 ? 'BC' : 'AD');
        setEndEra(parseInt(data.endDate) < 0 ? 'BC' : 'AD');
      } else {
        setTimeout(() => reset(), 0);
      }
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
                  {/* Truyền các props mới vào InputTime */}
                  <InputTime
                    register={register}
                    startEra={startEra}
                    setStartEra={setStartEra}
                    endEra={endEra}
                    setEndEra={setEndEra}
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
