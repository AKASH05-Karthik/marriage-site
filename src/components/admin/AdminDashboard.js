import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Building, 
  Bed, 
  Bell, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './Dashboard';
import BookingManagement from './BookingManagement';
import VenueManagement from './VenueManagement';
import CustomerManagement from './CustomerManagement';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { notifications } = useBooking();
  const { logoutAdmin } = useAuth();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logoutAdmin();
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, current: location.pathname === '/admin' },
    { name: 'Bookings', href: '/admin/bookings', icon: Calendar, current: location.pathname === '/admin/bookings' },
    { name: 'Venues', href: '/admin/venues', icon: Building, current: location.pathname === '/admin/venues' },
    { name: 'Customers', href: '/admin/customers', icon: Users, current: location.pathname === '/admin/customers' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-primary-600">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold">R</span>
            </div>
            <h1 className="text-white font-bold text-lg">Royal Admin</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  item.current
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="px-4 space-y-2">
              <Link
                to="/admin/notifications"
                className="group flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Bell className="mr-3 h-5 w-5" />
                Notifications
                {unreadNotifications > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {unreadNotifications}
                  </span>
                )}
              </Link>
              <Link
                to="/admin/settings"
                className="group flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
              <Link
                to="/"
                className="group flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Back to Site
              </Link>
              <button
                onClick={handleLogout}
                className="w-full group flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-500" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <span className="text-gray-700 font-medium">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<BookingManagement />} />
            <Route path="/venues" element={<VenueManagement />} />
            <Route path="/customers" element={<CustomerManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
