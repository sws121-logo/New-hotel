import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';

// Hotel Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/hotel/HomePage';
import RoomsPage from './pages/hotel/RoomsPage';
import HallsPage from './pages/hotel/HallsPage';
import ReviewsPage from './pages/hotel/ReviewsPage';
import ContactPage from './pages/hotel/ContactPage';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRooms from './pages/admin/AdminRooms';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="rooms" element={<AdminRooms />} />
                <Route path="halls" element={<div className="p-6">Party Halls Management (Coming Soon)</div>} />
                <Route path="bookings" element={<div className="p-6">Bookings Management (Coming Soon)</div>} />
                <Route path="reviews" element={<div className="p-6">Reviews Management (Coming Soon)</div>} />
                <Route path="payments" element={<div className="p-6">Payments Management (Coming Soon)</div>} />
                <Route path="settings" element={<div className="p-6">Settings (Coming Soon)</div>} />
                <Route path="" element={<AdminDashboard />} />
              </Routes>
            </AdminLayout>
          } />
          
          {/* Hotel Routes */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/rooms" element={<RoomsPage />} />
                  <Route path="/halls" element={<HallsPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;