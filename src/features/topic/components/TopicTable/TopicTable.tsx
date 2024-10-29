import { NextUIColor, TableHeaderItem } from '@/common/types';
import { ETopicStatus, ITopic, useGetTopics } from '@/features/topic';
import {
  Chip,
  Pagination,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from '@nextui-org/react';
import { useCallback, useMemo, useState } from 'react';
const statusColorMap: Record<ETopicStatus, NextUIColor> = {
  [ETopicStatus.PUBLISHED]: 'success',
  [ETopicStatus.PENDING]: 'warning',
  [ETopicStatus.ACHIEVED]: 'primary',
  [ETopicStatus.DISABLED]: 'danger',
};
export default function TopicTable() {
  const [page, setPage] = useState(1);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<string>([]));
  const columns: TableHeaderItem[] = useMemo(
    () => [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'description', label: 'Description' },
      { key: 'status', label: 'Status' },
      { key: 'actions', label: 'Actions' },
    ],
    [],
  );
  const { data: topics } = useGetTopics({ page, pageSize: 5 });

  const renderCell = useCallback((topics: ITopic, columnKey: keyof ITopic) => {
    const cellValue = topics[columnKey];
    switch (columnKey) {
      case 'name':
        return (
          <User avatarProps={{ radius: 'lg', src: topics.thumbnail, className: 'flex-shrink-0' }} name={cellValue} />
        );
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[topics.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case 'description':
        return <span className="text-sm text-foreground-400">{cellValue}</span>;
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      isHeaderSticky
      classNames={{
        wrapper: 'max-h-[calc(100vh-200px)]',
      }}
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      aria-label="Example table with dynamic content"
      bottomContent={
        topics && topics?.totalPage > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={topics.totalPage}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            className="font-semibold uppercase"
            align={column.key === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
            allowsResizing={column.key !== 'actions'}
            key={column.key}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {(((topics as any)?.topics ?? []) as ITopic[]).map((row) => (
          <TableRow key={row.id}>
            {(columnKey) => <TableCell>{renderCell(row, columnKey as keyof ITopic)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
