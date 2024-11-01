import { IPagination, NextUIColor, TableHeaderItem } from '@/common/types';
import { EPlaceStatus, IPlace, useGetPlaces } from '@/features/places';

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

const statusColorMap: Record<EPlaceStatus, NextUIColor> = {
  [EPlaceStatus.PUBLISHED]: 'success',
  [EPlaceStatus.DRAFT]: 'primary',
  [EPlaceStatus.PENDING]: 'warning',
  [EPlaceStatus.REJECTED]: 'primary',
  [EPlaceStatus.DELETED]: 'danger',
  
};

export default function PlaceTable({
  onChangeData,
  onDelete,
  onEdit,
}: {
  onChangeData?: (data: IPagination<IPlace>) => void;
  onDelete?: (ids: string[]) => void;
  onEdit?: (data: IPlace) => void;
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setFilter] = useState<Partial<IPlace>>({
    name: '',
  });
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<string>([]));

  const columns: TableHeaderItem[] = useMemo(
    () => [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'description', label: 'Description' },
      { key: 'status', label: 'Status' },
      { key: 'actions', label: 'Actions' },
    ],
    []
  );

  const { data: places, isFetching } = useGetPlaces({
    page,
    pageSize,
    filter,
    sortOrder: sortDescriptor?.direction === 'ascending' ? 'asc' : 'desc',
    sortBy: sortDescriptor?.column as string,
  });

  useEffect(() => {
    if (onChangeData && places) {
      onChangeData(places);
    }
  }, [places, onChangeData]);

  useEffect(() => {
    setPage(1);
  }, [filter, pageSize]);

  const renderCell = useCallback(
    (place: IPlace, columnKey: keyof IPlace | 'actions') => {
      const cellValue = place[columnKey as keyof IPlace];
      switch (columnKey) {
        case 'name':
          return (
            <User
              className="min-w-48 justify-start"
              classNames={{ name: 'line-clamp-2' }}
              avatarProps={{
                radius: 'lg',
                size: 'lg',
                src: place.thumbnail,
                className: 'flex-shrink-0',
                fallback: <CiImageOff />,
              }}
              name={cellValue}
            />
          );
        case 'status':
          return (
            <Chip className="capitalize" color={statusColorMap[place.status]} size="sm" variant="flat">
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
                    onEdit(place);
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
              setFilter((filter) => ({ ...filter, name: e.target.value }))
            }
            className="w-fit"
            placeholder="Tìm kiếm địa điểm"
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
        aria-label="Place Table"
        bottomContent={
          places && places.totalPage > 0 ? (
            <div className="flex w-full justify-center gap-6">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={places.totalPage}
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
          emptyContent="Không có dữ liệu hiển thị."
        >
             {places
            ? places.data.map((row) => (
                <TableRow key={row.id}>
                  {(columnKey) => <TableCell>{renderCell(row, columnKey as keyof IPlace)}</TableCell>}
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </>
  );
}
