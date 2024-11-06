import { IPagination, NextUIColor, TableHeaderItem } from '@/common/types';
import { EEraStatus, IEra, useGetEras } from '@/features/era'; // Updated imports
import {
  Button,
  Chip,
  Input,
  Pagination,
  Select,
  Selection,
  SelectItem,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CiImageOff } from 'react-icons/ci';
import { IoIosSearch } from 'react-icons/io';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
import { TbAdjustmentsHorizontal, TbSortAscending } from 'react-icons/tb';

const statusColorMap: Record<EEraStatus, NextUIColor> = {
  [EEraStatus.DRAFT]: 'success',
  [EEraStatus.PENDING]: 'warning',
  [EEraStatus.PUBLISHED]: 'primary',
  [EEraStatus.REJECTED]: 'danger',
  [EEraStatus.DELETED]: 'danger',

};

export default function EraTable({
  onChangeData,
  onDelete,
  onEdit,
}: {
  onChangeData?: (data: IPagination<IEra>) => void;
  onDelete?: (ids: string[]) => void;
  onEdit?: (data: IEra) => void;
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setFilter] = useState<Partial<IEra>>({ name: '' });
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
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

  const { data: eras, isFetching } = useGetEras({ 
    page,
    pageSize,
    filter,
    sortOrder: sortDescriptor?.direction === 'ascending' ? 'asc' : 'desc',
    sortBy: sortDescriptor?.column as string,
  });

  useEffect(() => {
    if (onChangeData && eras) {
      onChangeData(eras);
    }
  }, [eras, onChangeData]);

  useEffect(() => setPage(1), [filter, pageSize]);

  const renderCell = useCallback(
    (era: IEra, columnKey: keyof IEra | 'actions') => {
      const cellValue = era[columnKey as keyof IEra];
      switch (columnKey) {
        case 'name':
          return (
            <User
              className="min-w-48 justify-start"
              classNames={{ name: 'line-clamp-2' }}
              avatarProps={{
                radius: 'lg',
                size: 'lg',
                src: era.thumbnail,  // Sử dụng thumbnail để hiển thị ảnh
                className: 'flex-shrink-0',
                fallback: <CiImageOff />,
              }}
              name={cellValue}
            />
          );
        case 'status':
          return (
            <Chip className="capitalize" color={statusColorMap[era.status]} size="sm" variant="flat">
              {cellValue}
            </Chip>
          );
        case 'description':
          return <span className="text-sm text-foreground-400 line-clamp-2">{cellValue}</span>;
        case 'actions':
          return (
            <div className="flex justify-center gap-x-3">
              <Button
                isIconOnly
                variant="flat"
                color="warning"
                startContent={<RiPencilLine size={16} />}
                onClick={() => {
                  if (onEdit) {
                    onEdit(era);
                  }
                }}
              />
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                startContent={<RiDeleteBinLine size={16} />}
                onClick={() => {
                  onDelete?.([...selectedKeys] as string[]);
                }}
              />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onDelete, onEdit, selectedKeys]
  );
  

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-end gap-3">
          <Input
            value={filter.name}
            onChange={(e) =>
              setFilter((filter:any) => ({ ...filter, name: e.target.value }))
            }
            className="w-fit"
            placeholder="Tìm kiếm thời đại"
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
        <div className="flex items-center gap-3 text-default-400 text-small">
          <label className="flex-shrink-0">Rows per page:</label>
          <Select
            defaultSelectedKeys={[pageSize.toString()]}
            multiple={false}
            className="bg-transparent outline-none text-default-400 text-small"
            classNames={{ mainWrapper: 'w-16' }}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <SelectItem key="5">5</SelectItem>
            <SelectItem key="10">10</SelectItem>
            <SelectItem key="15">15</SelectItem>
          </Select>
        </div>
      </div>

      <Table
        isHeaderSticky
        classNames={{ wrapper: 'max-h-[calc(100vh-200px)]' }}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => keys instanceof Set && setSelectedKeys(keys)}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        aria-label="Era table with dynamic content"
        bottomContent={
          eras && eras.totalPage > 0 ? (
            <div className="flex w-full justify-center gap-6">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={eras.totalPage}
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
              key={column.key}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isFetching}
          loadingContent={<Spinner color="warning" label="Loading..." />}
          emptyContent={'Không có dữ liệu hiển thị.'}
        >
          {eras
            ? eras.data.map((row) => (
                <TableRow key={row.id}>
                  {(columnKey) => <TableCell>{renderCell(row, columnKey as keyof IEra)}</TableCell>}
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </>
  );
}
