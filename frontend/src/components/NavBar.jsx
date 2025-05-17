import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import LocationSearch from "./ui/LocationSearch";
import ThemeToggle from "./ui/ThemeToggle";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [locationSearch, setLocationSearch] = useState(
    searchParams.get("location") || ""
  );
  const navigate = useNavigate();
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setLocationSearch(searchParams.get("location") || "");
  }, [searchParams]);

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
    setMobileMenuOpen(false);
  };

  const handleLocationChange = (value) => {
    setLocationSearch(value);
  };

  const handleLocationSearch = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      e.preventDefault();
      if (locationSearch.trim()) {
        navigate(
          `/search?location=${encodeURIComponent(locationSearch.trim())}`
        );
      } else {
        navigate("/search");
      }
      setMobileSearchOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileSearchOpen) setMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-card dark:bg-dark-surface shadow-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        {/* Main navbar row */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-2xl text-primary dark:text-primary"
          >
            Bookify
          </Link>

          {/* Desktop search bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-4">
            <div className="flex flex-1 items-center border border-gray-300 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
              <div className="flex items-center flex-grow pl-4">
                <FiSearch
                  className="text-gray-500 dark:text-gray-300 mr-2"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search events"
                  className="w-full py-2 pr-2 text-sm text-gray-700 dark:text-white bg-transparent focus:outline-none"
                />
              </div>
              <div className="h-6 border-l border-gray-300 dark:border-gray-600 mx-2"></div>
              <LocationSearch
                value={locationSearch}
                onChange={handleLocationChange}
                onSearch={handleLocationSearch}
              />
              <button
                type="button"
                className="bg-primary hover:bg-primary-hover text-white p-2 rounded-full m-1"
                aria-label="Search"
                onClick={handleLocationSearch}
              >
                <FiSearch size={20} />
              </button>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user && (
              <Link
                to="/my-bookings"
                className="text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary font-medium whitespace-nowrap"
              >
                My Bookings
              </Link>
            )}
            {isAuthenticated && user && user.role === "ADMIN" && (
              <Link
                to="/admin"
                className="text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary font-medium whitespace-nowrap"
              >
                Admin Panel
              </Link>
            )}
            <ThemeToggle />
            {isAuthenticated && user ? (
              <div className="relative">
                <div
                  ref={avatarRef}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  {getInitials(user)}
                </div>
                {showModal && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-3 z-50 border dark:border-gray-700"
                  >
                    <div className="flex flex-col items-center px-4 pb-2">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white font-bold text-2xl mb-2">
                        {getInitials(user)}
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        {user.fullName || user.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {user.email}
                      </span>
                      <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
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
                      className="w-11/12 mx-auto block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2 px-4 rounded transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary whitespace-nowrap"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={toggleMobileSearch}
              className="p-2 text-gray-700 dark:text-gray-200"
              aria-label="Search"
            >
              <FiSearch size={22} />
            </button>
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 dark:text-gray-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {mobileSearchOpen && (
          <div className="mt-3 mb-2">
            <div className="flex flex-1 items-center border border-gray-300 dark:border-gray-700 rounded-full shadow-sm bg-white dark:bg-gray-800">
              <div className="flex items-center flex-grow pl-4">
                <FiSearch
                  className="text-gray-500 dark:text-gray-300 mr-2"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search events"
                  className="w-full py-2 pr-2 text-sm text-gray-700 dark:text-white bg-transparent focus:outline-none"
                  autoFocus
                />
              </div>
              <div className="h-6 border-l border-gray-300 dark:border-gray-600 mx-2"></div>
              <LocationSearch
                value={locationSearch}
                onChange={handleLocationChange}
                onSearch={handleLocationSearch}
              />
              <button
                type="button"
                className="bg-primary hover:bg-primary-hover text-white p-2 rounded-full m-1"
                aria-label="Search"
                onClick={handleLocationSearch}
              >
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile menu*/}
        {mobileMenuOpen && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3 pb-2">
            <div className="flex flex-col space-y-4">
              {isAuthenticated && user && (
                <Link
                  to="/my-bookings"
                  className="text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Bookings
                </Link>
              )}
              {isAuthenticated && user && user.role === "ADMIN" && (
                <Link
                  to="/admin"
                  className="text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              {isAuthenticated && user ? (
                <div className="flex items-center">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg mr-3">
                    {getInitials(user)}
                  </div>
                  <div>
                    <div className="text-gray-700 dark:text-white font-medium">
                      {user.fullName || user.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
              {isAuthenticated && user && (
                <button
                  onClick={handleLogout}
                  className="text-left text-red-500 hover:text-red-600 font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
