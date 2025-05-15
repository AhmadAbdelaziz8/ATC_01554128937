import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { getUserBookings, cancelBooking } from "../services/bookingService";
import { format } from "date-fns";
import { Ticket, Calendar, MapPin, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyBookingsPage() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await getUserBookings(token);
        setBookings(bookings);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId, token);
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Error
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Ticket className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          No bookings found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You haven't booked any events yet.
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Explore Events
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        My Bookings
      </h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white dark:bg-gray-800/90 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={
                    booking.event.imageUrl ||
                    "https://via.placeholder.com/300x200?text=Event"
                  }
                  alt={booking.event.name}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6 md:w-2/3">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {booking.event.name}
                </h2>

                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {format(new Date(booking.event.date), "PPP 'at' p")}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{booking.event.venue}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                  <Ticket className="h-4 w-4 mr-2" />
                  <span>Tickets: {booking.numberOfTickets}</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/events/${booking.event.id}`}
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    View Event
                  </Link>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
