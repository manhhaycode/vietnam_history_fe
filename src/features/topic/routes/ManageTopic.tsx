import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { MdAddCircle } from 'react-icons/md';
import TopicTable from '../components/TopicTable';
import { useState } from 'react';
import UpsertTopicModal from '../components/UpsertTopicModal/UpsertTopicModal';
import { ITopic } from '../types';
import { useCreateTopicMutation, useDeleteTopicMuatation, useUpdateTopicMutation } from '../api';
import toast from 'react-hot-toast';
import queryClient from '@/libs/tanstack-query';

export default function ManageTopic() {
  const upsertTopicModalState = useDisclosure({ defaultOpen: false });
  const [topic, setTopic] = useState<ITopic | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const useUpdateTopic = useUpdateTopicMutation({
    onSuccess: () => {
      upsertTopicModalState.onClose();
      toast.success('Cập nhật chủ đề thành công');
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
  });
  const useCreateTopic = useCreateTopicMutation({
    onSuccess: async () => {
      upsertTopicModalState.onClose();
      toast.success('Tạo chủ đề thành công');
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
  });
  const useDeleteTopic = useDeleteTopicMuatation();

  return (
    <div className="flex flex-col gap-y-6 py-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-[700] leading-[32px]">Danh sách chủ đề</h1>
          {total !== null && <Chip>{total}</Chip>}
        </div>
        <Button
          onClick={() => {
            setTopic(null);
            upsertTopicModalState.onOpen();
          }}
          color="primary"
          endContent={<MdAddCircle size={20} />}
        >
          Thêm chủ đề
        </Button>
      </div>
      <TopicTable
        onChangeData={(data) => setTotal(data.total)}
        onEdit={(data) => {
          setTopic(data);
          upsertTopicModalState.onOpen();
        }}
        onDelete={async (ids) => {
          if (!useDeleteTopic.isPending) {
            try {
              await Promise.all(ids.map((id) => useDeleteTopic.mutateAsync(id)));
              queryClient.invalidateQueries({ queryKey: ['topics'] });
              toast.success('Xóa chủ đề thành công');
            } catch {
              queryClient.invalidateQueries({ queryKey: ['topics'] });
              toast.error('Có lỗi xảy ra trong quá trình xóa chủ đề');
            }
          }
        }}
      />
      <UpsertTopicModal
        data={topic}
        state={upsertTopicModalState}
        onSubmitForm={(data, isEdit) => {
          if (isEdit) {
            if (!useUpdateTopic.isPending) useUpdateTopic.mutate({ id: data.id, data });
          } else {
            if (!useCreateTopic.isPending) useCreateTopic.mutate(data);
          }
        }}
      />
    </div>
  );
}
