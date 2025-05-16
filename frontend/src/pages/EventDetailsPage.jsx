import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Tag,
  Info,
  Ticket,
  DollarSign,
} from "lucide-react";
import { getEventById } from "../services/eventService";
import { bookEvent } from "../services/bookingService";
import { useAuth } from "../contexts/AuthContext";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const foundEvent = await getEventById(eventId, token);
        setEvent(foundEvent);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, token]);

  const handleBookNow = async () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (event.isBooked) {
      navigate("/my-bookings");
      return;
    }

    setBookingInProgress(true);
    setBookingError(null);

    try {
      await bookEvent(event.id, token);
      navigate(`/booking-confirmation/${event.id}`);
    } catch (error) {
      console.error("Booking failed:", error);

      if (error.message?.includes("already booked")) {
        navigate("/my-bookings");
        return;
      }

      setBookingError(error.message);
    } finally {
      setBookingInProgress(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-slate-600">Loading event details...</p>
      </div>
    );
  }

  const eventPrice = parseInt(event.price).toFixed(2);
  const fallbackImageUrl =
    "https://via.placeholder.com/800x400?text=Event+Image";

  if (!event) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">
          Event Not Found
        </h1>
        <p className="text-slate-600">
          The event you are looking for does not exist or may have been removed.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Event Image */}
        <img
          src={
            imageError ? fallbackImageUrl : event.imageUrl || fallbackImageUrl
          }
          alt={event.name}
          className="w-full h-64 sm:h-80 md:h-96 object-cover"
          onError={handleImageError}
        />

        <div className="p-6 md:p-8">
          {/* Event Name */}
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            {event.name}
          </h1>

          {/* Event info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6 text-slate-700">
            <div className="flex items-start">
              <Tag className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Category:</span>{" "}
                {event.category}
              </div>
            </div>
            <div className="flex items-start">
              <CalendarDays className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Date & Time:</span>{" "}
                {formatDate(event.date)}
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Venue:</span> {event.venue}
              </div>
            </div>
            <div className="flex items-start">
              <DollarSign className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Price:</span>
                {eventPrice > 0 ? ` $${eventPrice}` : " Free"}
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-700 mb-3 flex items-center">
              <Info className="w-6 h-6 mr-2 text-orange-500" />
              About this Event
            </h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Booking Button */}
          <div className="text-center mb-6">
            {bookingError && (
              <div className="text-red-500 mb-4">{bookingError}</div>
            )}

            {event.isBooked ? (
              <div className="mb-4">
                <div className="text-green-600 font-medium mb-2">
                  You've already booked this event!
                </div>
                <Link
                  to="/my-bookings"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg text-lg transition duration-300 inline-block"
                >
                  View My Bookings
                </Link>
              </div>
            ) : (
              <button
                onClick={handleBookNow}
                disabled={bookingInProgress}
                className={`
                  bg-orange-500 hover:bg-orange-600 text-white font-bold 
                  py-3 px-10 rounded-lg text-lg transition duration-300
                  ${
                    bookingInProgress
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:scale-105"
                  }
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50
                `}
              >
                {bookingInProgress ? (
                  <>
                    <span className="inline-block w-5 h-5 mr-2 border-t-2 border-b-2 border-white rounded-full animate-spin"></span>
                    Booking...
                  </>
                ) : (
                  <>
                    <Ticket className="w-5 h-5 mr-2 inline-block" />
                    Book Now (1 Ticket)
                  </>
                )}
              </button>
            )}

            {!isAuthenticated && (
              <div className="mt-3 text-sm text-gray-600">
                You need to be logged in to book this event.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
