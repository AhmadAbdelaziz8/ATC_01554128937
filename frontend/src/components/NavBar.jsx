import { Link } from "react-router-dom";
import { FiSearch, FiMapPin } from "react-icons/fi";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-xs">
      <div className="container mx-auto px-4 py-3 flex gap-4 items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl text-blue-500">
          Bookify
        </Link>
        <div className="flex-1 max-w-2xl mx-4">
          {" "}
          {/* container of search bar */}
          <div className="flex flex-1 items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Search Events Input with Icon */}
            <div className="flex items-center flex-grow pl-4">
              {" "}
              {/* pl-4 for padding before icon */}
              <FiSearch className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search events"
                className="w-full py-2 pr-2 text-sm text-gray-700 focus:outline-none"
                // Removed individual border/ring as it's on the parent
              />
            </div>

            {/* Vertical Divider */}
            <div className="h-6 border-l border-gray-300 mx-2"></div>

            {/* Location Input */}
            <div className="flex items-center flex-grow pl-2">
              {" "}
              {/* pl-2, pr-4 for padding around icon */}
              <FiMapPin className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Location"
                className="w-full py-2 pr-4 text-sm text-gray-700 focus:outline-none"
                // Removed individual border/ring
              />
            </div>

            {/* Search Button */}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full m-1" // m-1 to give some space inside the parent
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>
          </div>
        </div>

        {/* {navigation links} */}
        <div className="space-x-4 hidden md:flex">
          <Link to="/" className="hover:text-blue-500">
            create events
          </Link>
          <Link to="/auth" className="hover:text-blue-500">
            sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}
