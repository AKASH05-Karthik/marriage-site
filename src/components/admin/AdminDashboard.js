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
  const { logout } = useAuth();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, current: location.pathname === '/' || location.pathname === '/admin' },
    { name: 'Bookings', href: '/bookings', icon: Calendar, current: location.pathname === '/bookings' || location.pathname === '/admin/bookings' },
    { name: 'Venues', href: '/venues', icon: Building, current: location.pathname === '/venues' || location.pathname === '/admin/venues' },
    { name: 'Customers', href: '/customers', icon: Users, current: location.pathname === '/customers' || location.pathname === '/admin/customers' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-col border-r border-gray-200`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-600 font-bold text-lg">R</span>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">Royal Admin</h1>
              <p className="text-primary-100 text-xs">Management Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-primary-100 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Admin Profile Card */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">A</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Administrator</h3>
              <p className="text-sm text-gray-600">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    item.current
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600 hover:scale-105'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${item.current ? 'text-white' : 'text-gray-500 group-hover:text-primary-600'}`} />
                  {item.name}
                  {item.current && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Secondary Navigation */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                to="#"
                className="group flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 hover:text-primary-600 transition-all duration-200 hover:scale-105"
              >
                <Bell className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                Notifications
                {unreadNotifications > 0 && (
                  <span className="ml-auto bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full px-2.5 py-1 shadow-lg animate-pulse">
                    {unreadNotifications}
                  </span>
                )}
              </Link>
              <Link
                to="#"
                className="group flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 hover:text-primary-600 transition-all duration-200 hover:scale-105"
              >
                <Settings className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                Settings
              </Link>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
            <Link
              to="/"
              className="group flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:scale-105"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-500 group-hover:text-blue-600" />
              Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full group flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 hover:scale-105"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-30">
          <div className="flex items-center justify-between h-20 px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {navigation.find(item => item.current)?.name || 'Dashboard'}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Welcome back! Here's what's happening with your venues.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Notifications */}
              <div className="relative">
                <button className="p-3 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200">
                  <Bell className="h-6 w-6" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full px-2 py-1 shadow-lg animate-bounce">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Admin Profile */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-primary-50 to-purple-50 px-4 py-2 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">Admin</span>
                  <p className="text-xs text-gray-600">Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<BookingManagement />} />
              <Route path="/venues" element={<VenueManagement />} />
              <Route path="/customers" element={<CustomerManagement />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
