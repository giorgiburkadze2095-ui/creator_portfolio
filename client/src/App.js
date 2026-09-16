import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout.js';
import { ProtectedRoute } from './components/admin/ProtectedRoute.js';
import { AdminLayout } from './components/admin/AdminLayout.js';
import { HomePage } from './pages/HomePage.js';
import { ContentPage } from './pages/ContentPage.js';
import { MusicPage } from './pages/MusicPage.js';
import { AboutPage } from './pages/AboutPage.js';
import { PartnersPage } from './pages/PartnersPage.js';
import { CollaboratePage } from './pages/CollaboratePage.js';
import { TermsOfUsePage } from './pages/TermsOfUsePage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';
import { AdminLoginPage } from './pages/admin/AdminLoginPage.js';
import { AdminSetupPasswordPage } from './pages/admin/AdminSetupPasswordPage.js';
import { AdminAccountPage } from './pages/admin/AdminAccountPage.js';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.js';
import { AdminMessagesPage } from './pages/admin/AdminMessagesPage.js';
import { AdminContentPage } from './pages/admin/AdminContentPage.js';
import { AdminQuotesPage } from './pages/admin/AdminQuotesPage.js';
import { AdminPartnersPage } from './pages/admin/AdminPartnersPage.js';
import { AdminSocialLinksPage } from './pages/admin/AdminSocialLinksPage.js';
import { AdminSiteSettingsPage } from './pages/admin/AdminSiteSettingsPage.js';
import { AdminAdminsPage } from './pages/admin/AdminAdminsPage.js';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/collaborate" element={<CollaboratePage />} />
        <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/setup-password" element={<AdminSetupPasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/account" element={<AdminAccountPage />} />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
          <Route path="/admin/content" element={<AdminContentPage />} />
          <Route path="/admin/quotes" element={<AdminQuotesPage />} />
          <Route path="/admin/partners" element={<AdminPartnersPage />} />
          <Route path="/admin/social-links" element={<AdminSocialLinksPage />} />
          <Route path="/admin/site-settings" element={<AdminSiteSettingsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute requireSuperAdmin />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/admins" element={<AdminAdminsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
