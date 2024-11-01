import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { MdAddCircle } from 'react-icons/md';
import EraTable from '../components/EraTable'; 
import { useState } from 'react';
import UpsertEraModal from '../components/UpsertEraModal/UpsertEraModal'; 
import { IEra } from '../types'; 
import { 
  useCreateEraMutation, 
  useDeleteEraMutation, 
  useUpdateEraMutation 
} from '../api'; 
import toast from 'react-hot-toast';
import queryClient from '@/libs/tanstack-query';

export default function ManageEra() { 
  const upsertEraModalState = useDisclosure({ defaultOpen: false });
  const [era, setEra] = useState<IEra | null>(null); 
  const [total, setTotal] = useState<number | null>(null);

  const useUpdateEra = useUpdateEraMutation({
    onSuccess: () => {
      upsertEraModalState.onClose();
      toast.success('Cập nhật thời đại thành công'); 
      queryClient.invalidateQueries({ queryKey: ['eras'] }); 
    },
  });

  const useCreateEra = useCreateEraMutation({
    onSuccess: async () => {
      upsertEraModalState.onClose();
      toast.success('Tạo thời đại thành công');
      queryClient.invalidateQueries({ queryKey: ['eras'] }); 
    },
  });

  const useDeleteEra = useDeleteEraMutation(); 

  return (
    <div className="flex flex-col gap-y-6 py-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-[700] leading-[32px]">Danh sách thời đại</h1> 
          {total !== null && <Chip>{total}</Chip>}
        </div>
        <Button
          onClick={() => {
            setEra(null);
            upsertEraModalState.onOpen();
          }}
          color="primary"
          endContent={<MdAddCircle size={20} />}
        >
          Thêm thời đại
        </Button>
      </div>

      <EraTable
        onChangeData={(data) => setTotal(data.total)} 
        onEdit={(data) => {
          setEra(data); 
          upsertEraModalState.onOpen();
        }}
        onDelete={async (ids) => {
          if (!useDeleteEra.isPending) {
            try {
              await Promise.all(ids.map((id) => useDeleteEra.mutateAsync(id)));
              queryClient.invalidateQueries({ queryKey: ['eras'] }); 
              toast.success('Xóa thời đại thành công'); 
            } catch {
              queryClient.invalidateQueries({ queryKey: ['eras'] }); 
              toast.error('Có lỗi xảy ra trong quá trình xóa thời đại'); 
            }
          }
        }}
      />

      <UpsertEraModal
        data={era} 
        state={upsertEraModalState}
        onSubmitForm={(data, isEdit) => {
          if (isEdit) {
            if (!useUpdateEra.isPending) useUpdateEra.mutate({ id: data.id, data });
          } else {
            if (!useCreateEra.isPending) useCreateEra.mutate(data);
          }
        }}
      />
    </div>
  );
}
