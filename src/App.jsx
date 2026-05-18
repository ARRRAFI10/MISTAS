import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DirectoryPage from './pages/DirectoryPage'
import EngagementPage from './pages/EngagementPage'
import CareersPage from './pages/CareersPage'
import NewsEventsPage from './pages/NewsEventsPage'
import CommunityPage from './pages/CommunityPage'
import ContactPage from './pages/ContactPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import PortalPage from './pages/PortalPage'
import AlumniProfilePage from './pages/AlumniProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages with shared Layout (Navbar + Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="directory" element={<DirectoryPage />} />
          <Route path="engagement" element={<EngagementPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="news" element={<NewsEventsPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="alumni/:id" element={<AlumniProfilePage />} />
        </Route>

        {/* Full-screen pages (no shared Layout) */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<PortalPage />} />
      </Routes>
    </BrowserRouter>
  )
}
