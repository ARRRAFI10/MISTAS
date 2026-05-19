import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DirectoryPage from './pages/DirectoryPage'
import EngagementPage from './pages/EngagementPage'
import CareersPage from './pages/CareersPage'
import NewsEventsPage from './pages/NewsEventsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import EventDetailPage from './pages/EventDetailPage'
import CommunityPage from './pages/CommunityPage'
import CommunityBatchPage from './pages/community/CommunityBatchPage'
import CommunityBatchDetailPage from './pages/community/CommunityBatchDetailPage'
import CommunityDepartmentsPage from './pages/community/CommunityDepartmentsPage'
import CommunityDeptDetailPage from './pages/community/CommunityDeptDetailPage'
import CommunityChaptersPage from './pages/community/CommunityChaptersPage'
import CommunityForumPage from './pages/community/CommunityForumPage'
import CommunityForumDetailPage from './pages/community/CommunityForumDetailPage'
import ContactPage from './pages/ContactPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import PortalPage from './pages/PortalPage'
import AlumniProfilePage from './pages/AlumniProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="directory" element={<DirectoryPage />} />
          <Route path="engagement" element={<EngagementPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="news" element={<NewsEventsPage />} />
          <Route path="news/:id" element={<NewsDetailPage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="community/batch" element={<CommunityBatchPage />} />
          <Route path="community/batch/:year" element={<CommunityBatchDetailPage />} />
          <Route path="community/departments" element={<CommunityDepartmentsPage />} />
          <Route path="community/departments/:id" element={<CommunityDeptDetailPage />} />
          <Route path="community/chapters" element={<CommunityChaptersPage />} />
          <Route path="community/forum" element={<CommunityForumPage />} />
          <Route path="community/forum/:id" element={<CommunityForumDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="alumni/:id" element={<AlumniProfilePage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<PortalPage />} />
      </Routes>
    </BrowserRouter>
  )
}
