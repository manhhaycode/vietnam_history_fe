import ConversationPage from "@/features/conversations/routes/ConversationPage";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ConversationPage />}></Route>
      {/* <Route path="/" element={<DefaultLayout />}>
        <Route index element={<div>Home</div>} />
      </Route> */}
    </Routes>
  );
}
