import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-300 mr-4">
              Logged in as {user.fullName} ({user.email})
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full  md:w-64 bg-white dark:bg-gray-800/90 shadow rounded-lg p-4">
            <nav className="space-y-2">
              <Link
                to="/admin/events"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-md transition-colors"
              >
                Manage Events
              </Link>
              <Link
                to="/admin/events/new"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-md transition-colors"
              >
                Create Event
              </Link>
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-md transition-colors"
              >
                Back to Website
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white dark:bg-gray-800/90 shadow rounded-lg p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
