import Error from '@/components/Error';
import { LoginPage } from '@/features/auth';
import ConversationPage from '@/features/conversations/routes/ConversationPage';
import { Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ConversationPage />} />
        <Route path="/conversations/:conversationId" element={<ConversationPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}
