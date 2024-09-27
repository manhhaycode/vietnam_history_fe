import ConversationPage from "@/features/conversations/routes/ConversationPage";
import { Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Route path="/">
      <Route index element={<ConversationPage />} />
      <Route
        path="/conversations/:conversationId"
        element={<ConversationPage />}
      />
    </Route>
  );
}
