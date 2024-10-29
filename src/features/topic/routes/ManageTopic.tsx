import { Button, Chip, Input } from '@nextui-org/react';
import { IoIosSearch } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';
import { TbAdjustmentsHorizontal, TbSortAscending } from 'react-icons/tb';
import TopicTable from '../components/TopicTable';

export default function ManageTopic() {
  return (
    <div className="flex flex-col gap-y-6 py-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-[700] leading-[32px]">Danh sách chủ đề</h1>
          <Chip>100</Chip>
        </div>
        <Button color="primary" endContent={<MdAddCircle size={20} />}>
          Thêm chủ đề
        </Button>
      </div>
      <div className="flex items-end gap-3">
        <Input
          className="w-fit"
          placeholder="Tìm kiếm chủ đề"
          endContent={<IoIosSearch size={16} className="text-default-400" />}
        />
        <Button
          size="sm"
          className="bg-default-100 text-default-800"
          startContent={<TbAdjustmentsHorizontal size={16} className="text-default-400" />}
        >
          Filter
        </Button>
        <Button
          size="sm"
          className="bg-default-100 text-default-800"
          startContent={<TbSortAscending size={16} className="text-default-400" />}
        >
          Sort
        </Button>
      </div>
      <TopicTable />
    </div>
  );
}
