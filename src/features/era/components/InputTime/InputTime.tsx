import React from 'react';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { UseFormRegister } from 'react-hook-form';

interface InputTimeProps {
  register: UseFormRegister<any>;
  startEra: string;
  setStartEra: React.Dispatch<React.SetStateAction<string>>;
  endEra: string;
  setEndEra: React.Dispatch<React.SetStateAction<string>>;
}

const InputTime: React.FC<InputTimeProps> = ({ register, startEra, setStartEra, endEra, setEndEra }) => {
  const [startDateType, setStartDateType] = React.useState('year');
  const [endDateType, setEndDateType] = React.useState('year');

  const validateDate = (dateString: string, dateType: string) => {
    return dateType === 'year' ? /^\d{1,4}$/.test(dateString) : /^\d{1,2}\/\d{4}$/.test(dateString);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Start Date Group */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Select
          value={startEra}
          onChange={(e) => setStartEra(e.target.value)}
          style={{ width: '150px' }}
        >
          <SelectItem value="AD" key="AD">Sau Công Nguyên</SelectItem>
          <SelectItem value="BC" key="BC">Trước Công Nguyên</SelectItem>
        </Select>

        <Input
          type="text"
          label="Ngày bắt đầu"
          placeholder={startDateType === 'year' ? "YYYY" : "MM/YYYY"}
          {...register('startDate', {
            validate: (value) => validateDate(value, startDateType) || 'Định dạng ngày không hợp lệ',
          })}
          style={{ width: '150px' }}
        />

        <Select
          value={startDateType}
          onChange={(e) => setStartDateType(e.target.value)}
          style={{ width: '150px' }}
        >
          <SelectItem value="year" key="year">Chỉ năm</SelectItem>
          <SelectItem value="monthYear" key="monthYear">Tháng năm</SelectItem>
        </Select>
      </div>

      {/* End Date Group */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Select
          value={endEra}
          onChange={(e) => setEndEra(e.target.value)}
          style={{ width: '150px' }}
        >
          <SelectItem value="AD" key="AD">Sau Công Nguyên</SelectItem>
          <SelectItem value="BC" key="BC">Trước Công Nguyên</SelectItem>
        </Select>

        <Input
          type="text"
          label="Ngày kết thúc"
          placeholder={endDateType === 'year' ? "YYYY" : "MM/YYYY"}
          {...register('endDate', {
            validate: (value) => validateDate(value, endDateType) || 'Định dạng ngày không hợp lệ',
          })}
          style={{ width: '150px' }}
        />

        <Select
          value={endDateType}
          onChange={(e) => setEndDateType(e.target.value)}
          style={{ width: '150px' }}
        >
          <SelectItem value="year" key="year">Chỉ năm</SelectItem>
          <SelectItem value="monthYear" key="monthYear">Tháng năm</SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default InputTime;
