import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllEvents } from "../services/eventService";
import { useAuth } from "../AuthContext";
import EventCard from "@/components/EventCard/EventCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import categories from "../assets/mock/categories-data";

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-800"></div>
    </div>
  );
}

// Error Message Component
function ErrorMessage({ message }) {
  return <p className="text-center text-red-600">Error: {message}</p>;
}

// Pagination Controls Component
function PaginationControls({ currentPage, totalPages, onPageChange }) {
  // Only show a limited number of page buttons on smaller screens
  const getPageNumbers = () => {
    // For 5 or fewer pages, show all page numbers
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Otherwise, show a window of pages around the current page
    const pageWindow = [];

    // Always show page 1
    pageWindow.push(1);

    // Calculate the start and end of the window
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      pageWindow.push("...");
    }

    // Add the window of pages
    for (let i = startPage; i <= endPage; i++) {
      pageWindow.push(i);
    }

    // Add ellipsis before the last page if needed
    if (endPage < totalPages - 1) {
      pageWindow.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      pageWindow.push(totalPages);
    }

    return pageWindow;
  };

  return (
    <div className="flex flex-wrap justify-center items-center mt-8 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 sm:px-3 py-2 rounded-md flex items-center ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
        }`}
      >
        <FiChevronLeft className="mr-1" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex flex-wrap justify-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 sm:px-3 py-2 rounded-md flex items-center ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <FiChevronRight className="ml-1" />
      </button>
    </div>
  );
}

// Event Grid Component
function EventGrid({ events }) {
  if (!events.length) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-slate-600">
          No events found in this category.
        </p>
        <Link
          to="/search"
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          View All Events
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function CategoryResultsPage() {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useAuth();
  const { categorySlug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Find the category name from the slug
  const getCategoryName = (slug) => {
    const category = categories.find((cat) => {
      const catSlug = cat.link.split("/").pop();
      return catSlug === slug;
    });

    return category ? category.name : categorySlug;
  };

  // Get readable category name
  const categoryName = getCategoryName(categorySlug);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch events whenever category or page changes
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Pass token if user is authenticated to get booking status
        // Also pass the category parameter and pagination parameters
        const data = await getAllEvents(
          isAuthenticated ? token : null,
          null, // No location filter
          currentPage,
          8, // 8 events per page
          categoryName // Pass the category name
        );

        // Update state with events and pagination data
        setEvents(data.events);
        setPagination(data.pagination);
        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token, isAuthenticated, categoryName, currentPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {categoryName} Events
        </h1>
        <p className="text-slate-600">
          Browse all {categoryName.toLowerCase()} events
        </p>
        {!loading && !error && pagination.total > 0 && (
          <p className="text-slate-500 mt-1">
            Showing page {pagination.page} of {pagination.totalPages} (
            {pagination.total} total events)
          </p>
        )}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          <EventGrid events={events} />
          {pagination.totalPages > 1 && (
            <PaginationControls
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
