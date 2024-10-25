import Error from '@/components/Error';
import { AdminDashboard } from '@/features/admin';
import { GoogleOAuthCallbackPage, LoginPage } from '@/features/auth';
import ConversationPage from '@/features/conversations/routes/ConversationPage';
import { WithAuthencation } from '@/hoocs';
import { Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<WithAuthencation />} path="/">
        <Route index element={<ConversationPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/conversations/:conversationId" element={<ConversationPage />} />
      </Route>
      <Route path="auth/google/callback" element={<GoogleOAuthCallbackPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}
