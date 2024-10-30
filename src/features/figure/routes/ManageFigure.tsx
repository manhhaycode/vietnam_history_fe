import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { MdAddCircle } from 'react-icons/md';
import FigureTable from '../components/FigureTable';
import { useState } from 'react';
import UpsertFigureModal from '../components/UpsertFigureModal';
import { IFigure } from '../types';
import { 
  useCreateFigureMutation, 
  useDeleteFigureMutation, 
  useUpdateFigureMutation 
} from '../api';
import toast from 'react-hot-toast';
import queryClient from '@/libs/tanstack-query';

export default function ManageFigure() {
  const upsertFigureModalState = useDisclosure({ defaultOpen: false });
  const [figure, setFigure] = useState<IFigure | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const useUpdateFigure = useUpdateFigureMutation({
    onSuccess: () => {
      upsertFigureModalState.onClose();
      toast.success('Cập nhật nhân vật thành công');
      queryClient.invalidateQueries({ queryKey: ['figures'] });
    },
  });

  const useCreateFigure = useCreateFigureMutation({
    onSuccess: async () => {
      upsertFigureModalState.onClose();
      toast.success('Tạo nhân vật thành công');
      queryClient.invalidateQueries({ queryKey: ['figures'] });
    },
  });

  const useDeleteFigure = useDeleteFigureMutation();

  return (
    <div className="flex flex-col gap-y-6 py-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-[700] leading-[32px]">Danh sách nhân vật</h1>
          {total !== null && <Chip>{total}</Chip>}
        </div>
        <Button
          onClick={() => {
            setFigure(null);
            upsertFigureModalState.onOpen();
          }}
          color="primary"
          endContent={<MdAddCircle size={20} />}
        >
          Thêm nhân vật
        </Button>
      </div>

      <FigureTable
        onChangeData={(data) => setTotal(data.total)}
        onEdit={(data) => {
          setFigure(data);
          upsertFigureModalState.onOpen();
        }}
        onDelete={async (ids) => {
          if (!useDeleteFigure.isPending) {
            try {
              await Promise.all(ids.map((id) => useDeleteFigure.mutateAsync(id)));
              queryClient.invalidateQueries({ queryKey: ['figures'] });
              toast.success('Xóa nhân vật thành công');
            } catch {
              queryClient.invalidateQueries({ queryKey: ['figures'] });
              toast.error('Có lỗi xảy ra trong quá trình xóa nhân vật');
            }
          }
        }}
      />

      <UpsertFigureModal
        data={figure}
        state={upsertFigureModalState}
        onSubmitForm={(data, isEdit) => {
          if (isEdit) {
            if (!useUpdateFigure.isPending) useUpdateFigure.mutate({ id: data.id, data });
          } else {
            if (!useCreateFigure.isPending) useCreateFigure.mutate(data);
          }
        }}
      />
    </div>
  );
}
