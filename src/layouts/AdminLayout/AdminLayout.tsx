import AdminNav from '@/features/admin/components/AdminNav';
import { useAuthStore } from '@/libs/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    if (user && user.roleId !== '999') {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="flex relative">
      <AdminNav />
      <div className="flex-1 px-4 relative overflow-x-hidden">{user?.roleId === '999' && <Outlet />}</div>
    </div>
  );
}
