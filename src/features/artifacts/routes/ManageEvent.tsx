import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { MdAddCircle } from 'react-icons/md';
import ArtifactTable from '../components/ArtifactTable'; 
import { useState } from 'react';
import UpsertArtifactModal from '../components/UpsertArtifactModal/UpsertArtifactModal'; 
import { IArtifact } from '../types'; 
import { 
  useCreateArtifactMutation, 
  useDeleteArtifactMutation, 
  useUpdateArtifactMutation 
} from '../api'; 
import toast from 'react-hot-toast';
import queryClient from '@/libs/tanstack-query';

export default function ManageArtifact() { 
  const upsertArtifactModalState = useDisclosure({ defaultOpen: false });
  const [artifact, setArtifact] = useState<IArtifact | null>(null); 
  const [total, setTotal] = useState<number | null>(null);

  const useUpdateArtifact = useUpdateArtifactMutation({
    onSuccess: () => {
      upsertArtifactModalState.onClose();
      toast.success('Cập nhật hiện vật thành công'); 
      queryClient.invalidateQueries({ queryKey: ['artifacts'] }); 
    },
  });

  const useCreateArtifact = useCreateArtifactMutation({
    onSuccess: async () => {
      upsertArtifactModalState.onClose();
      toast.success('Tạo hiện vật thành công');
      queryClient.invalidateQueries({ queryKey: ['artifacts'] }); 
    },
  });

  const useDeleteArtifact = useDeleteArtifactMutation(); 

  return (
    <div className="flex flex-col gap-y-6 py-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-[700] leading-[32px]">Danh sách hiện vật</h1> 
          {total !== null && <Chip>{total}</Chip>}
        </div>
        <Button
          onClick={() => {
            setArtifact(null);
            upsertArtifactModalState.onOpen();
          }}
          color="primary"
          endContent={<MdAddCircle size={20} />}
        >
          Thêm hiện vật
        </Button>
      </div>

      <ArtifactTable
        onChangeData={(data) => setTotal(data.total)} 
        onEdit={(data) => {
          setArtifact(data); 
          upsertArtifactModalState.onOpen();
        }}
        onDelete={async (ids) => {
          if (!useDeleteArtifact.isPending) {
            try {
              await Promise.all(ids.map((id) => useDeleteArtifact.mutateAsync(id)));
              queryClient.invalidateQueries({ queryKey: ['artifacts'] }); 
              toast.success('Xóa hiện vật thành công'); 
            } catch {
              queryClient.invalidateQueries({ queryKey: ['artifacts'] }); 
              toast.error('Có lỗi xảy ra trong quá trình xóa hiện vật'); 
            }
          }
        }}
      />

      <UpsertArtifactModal
        data={artifact} 
        state={upsertArtifactModalState}
        onSubmitForm={(data, isEdit) => {
          if (isEdit) {
            if (!useUpdateArtifact.isPending) useUpdateArtifact.mutate({ id: data.id, data });
          } else {
            if (!useCreateArtifact.isPending) useCreateArtifact.mutate(data);
          }
        }}
      />
    </div>
  );
}
