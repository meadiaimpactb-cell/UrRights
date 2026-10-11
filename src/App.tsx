import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ChatPage from "./pages/admin/ChatPage";
import RequestsPage from "./pages/admin/RequestsPage";
import ContentPage from "./pages/admin/ContentPage";
import LanguagesPage from "./pages/admin/LanguagesPage";
import PartnersPage from "./pages/admin/PartnersPage";
import AuditPage from "./pages/admin/AuditPage";
import ProfilePage from "./pages/admin/ProfilePage";
import RolesPage from "./pages/admin/RolesPage";
import QuestionsPage from "./pages/admin/QuestionsPage";
import SectionsPage from "./pages/admin/SectionsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import UsersPage from "./pages/admin/UsersPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="sections" element={<SectionsPage />} />
        <Route path="questions" element={<QuestionsPage />} />
        <Route path="languages" element={<LanguagesPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="audit" element={<AuditPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
