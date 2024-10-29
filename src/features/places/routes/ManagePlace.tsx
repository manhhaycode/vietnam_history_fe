import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { MdAddCircle } from 'react-icons/md';
import PlaceTable from '../components/PlaceTable';
import { useState } from 'react';
import UpsertPlaceModal from '../components/UpsertTopicModal';
import { IPlace } from '../types';
import { useCreatePlaceMutation, useDeletePlaceMutation, useUpdatePlaceMutation } from '../api';
import toast from 'react-hot-toast';
import queryClient from '@/libs/tanstack-query';

export default function ManagePlace() {
  const upsertPlaceModalState = useDisclosure({ defaultOpen: false });
  const [place, setPlace] = useState<IPlace | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const useUpdatePlace = useUpdatePlaceMutation({
    onSuccess: () => {
      upsertPlaceModalState.onClose();
      toast.success('Cập nhật địa điểm thành công');
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });

  const useCreatePlace = useCreatePlaceMutation({
    onSuccess: async () => {
      upsertPlaceModalState.onClose();
      toast.success('Tạo địa điểm thành công');
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });

  const useDeletePlace = useDeletePlaceMutation();

  return (
    <div className="flex flex-col gap-y-6 py-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-[700] leading-[32px]">Danh sách địa điểm</h1>
          {total !== null && <Chip>{total}</Chip>}
        </div>
        <Button
          onClick={() => {
            setPlace(null);
            upsertPlaceModalState.onOpen();
          }}
          color="primary"
          endContent={<MdAddCircle size={20} />}
        >
          Thêm địa điểm
        </Button>
      </div>

      <PlaceTable
        onChangeData={(data) => setTotal(data.total)}
        onEdit={(data) => {
          setPlace(data);
          upsertPlaceModalState.onOpen();
        }}
        onDelete={async (ids) => {
          if (!useDeletePlace.isPending) {
            try {
              await Promise.all(ids.map((id) => useDeletePlace.mutateAsync(id)));
              queryClient.invalidateQueries({ queryKey: ['places'] });
              toast.success('Xóa địa điểm thành công');
            } catch {
              queryClient.invalidateQueries({ queryKey: ['places'] });
              toast.error('Có lỗi xảy ra trong quá trình xóa địa điểm');
            }
          }
        }}
      />

      <UpsertPlaceModal
        data={place}
        state={upsertPlaceModalState}
        onSubmitForm={(data, isEdit) => {
          if (isEdit) {
            if (!useUpdatePlace.isPending) useUpdatePlace.mutate({ id: data.id, data });
          } else {
            if (!useCreatePlace.isPending) useCreatePlace.mutate(data);
          }
        }}
      />
    </div>
  );
}
