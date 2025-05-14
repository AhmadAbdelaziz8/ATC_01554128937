import { Link } from "react-router-dom";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { useAuth } from "../AuthContext";
import { useState, useRef, useEffect } from "react";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);

  const getInitials = (user) => {
    const fullName = user?.fullName || user?.name || "";
    if (!fullName) return "";
    const names = fullName.trim().split(" ");
    const first = names[0]?.[0]?.toUpperCase() || "";
    const last = names[1]?.[0]?.toUpperCase() || "";
    return first + last;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowModal(false);
      }
    }
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  const handleAvatarClick = () => setShowModal((v) => !v);
  const handleCloseModal = () => setShowModal(false);
  const handleLogout = () => {
    logout();
    setShowModal(false);
  };

  return (
    <nav className="bg-white shadow-xs">
      <div className="container mx-auto px-4 py-3 flex gap-4 items-center">
        <Link to="/" className="font-bold text-2xl text-blue-500">
          Bookify
        </Link>
        <div className="flex-1 max-w-2xl mx-4">
          <div className="flex flex-1 items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center flex-grow pl-4">
              <FiSearch className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search events"
                className="w-full py-2 pr-2 text-sm text-gray-700 focus:outline-none"
              />
            </div>
            <div className="h-6 border-l border-gray-300 mx-2"></div>
            <div className="flex items-center flex-grow pl-2">
              <FiMapPin className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Location"
                className="w-full py-2 pr-4 text-sm text-gray-700 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full m-1"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>
          </div>
        </div>
        <div className="space-x-4 hidden md:flex items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            create events
          </Link>
          {isAuthenticated && user && (
            <Link
              to="/my-bookings"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              My Bookings
            </Link>
          )}
          {isAuthenticated && user && user.role === "ADMIN" && (
            <Link
              to="/admin"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Admin Panel
            </Link>
          )}
          {isAuthenticated && user ? (
            <div className="relative">
              <div
                ref={avatarRef}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg cursor-pointer"
                onClick={handleAvatarClick}
              >
                {getInitials(user)}
              </div>
              {showModal && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-3 z-50 border"
                >
                  <div className="flex flex-col items-center px-4 pb-2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-2xl mb-2">
                      {getInitials(user)}
                    </div>
                    <span className="font-semibold text-slate-700 mb-1">
                      {user.fullName || user.name}
                    </span>
                    <span className="text-xs text-gray-500 mb-2">
                      {user.email}
                    </span>
                    <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {user.role || "USER"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-11/12 mx-auto block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mb-2 transition"
                  >
                    Logout
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="w-11/12 mx-auto block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="hover:text-blue-500">
              sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
