import AdminNav from '@/features/admin/components/AdminNav';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex relative">
      <AdminNav />
      <div className="flex-1 px-4 relative">
        <Outlet />
      </div>
    </div>
  );
}
