import Error from '@/components/Error';
import ManageArtifact from '@/features/artifacts/routes/ManageEvent';
import { GoogleOAuthCallbackPage, LoginPage } from '@/features/auth';
import ConversationPage from '@/features/conversations/routes/ConversationPage';
import ManageEvent from '@/features/event/routes/ManageEvent';
import ManageFigure from '@/features/figure/routes/ManageFigure';
import ManagePlace from '@/features/places/routes/ManagePlace';
import ManageTopic from '@/features/topic/routes/ManageTopic';
import { WithAuthencation } from '@/hoocs';
import AdminLayout from '@/layouts/AdminLayout';
import { Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<WithAuthencation />} path="/">
        <Route index element={<ConversationPage />} />
        <Route path="/conversations/:conversationId" element={<ConversationPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div>Admin Home Dashboard</div>} />
          <Route path="manage-topic" element={<ManageTopic />} />
          <Route path="manage-event" element={<ManageEvent />} />
          <Route path="manage-place" element={<ManagePlace />} />
          <Route path="manage-figure" element={<ManageFigure />} />
          <Route path="manage-artifact" element={<ManageArtifact />} />


        </Route>
      </Route>
      <Route path="auth/google/callback" element={<GoogleOAuthCallbackPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}
