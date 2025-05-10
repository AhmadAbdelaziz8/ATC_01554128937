import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Ticket } from "lucide-react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function EventCard({ event }) {
  if (!event) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl">
      <Link to={`/events/${event.id}`} className="block">
        <img
          src={
            event.imageUrl ||
            "https://via.placeholder.com/400x250?text=Event+Image"
          }
          alt={event.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/events/${event.id}`} className="block mb-2">
          <h3 className="text-xl font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
            {event.name}
          </h3>
        </Link>

        <div className="text-sm text-slate-600 mb-1 flex items-center">
          <CalendarDays
            className="mr-2 text-orange-500 h-4 w-4"
            strokeWidth={2}
          />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="text-sm text-slate-600 mb-3 flex items-center">
          <MapPin className="mr-2 text-orange-500 h-4 w-4" strokeWidth={2} />{" "}
          <span>{event.venue}</span>
        </div>

        {/* Price*/}
        <div className="text-lg font-bold text-slate-700 mt-auto mb-3">
          {event.price > 0 ? `$${event.price.toFixed(2)}` : "Free"}
        </div>
      </div>

      {/* book button*/}
      <div className="px-4 pb-4 pt-2 border-t border-slate-200">
        {event.isBooked ? (
          <span className="w-full block text-center bg-green-500 text-white py-2 px-4 rounded-md font-semibold">
            Booked
          </span>
        ) : (
          <Link
            to={`/events/${event.id}`} // Or a dedicated booking link/handler
            className="w-full block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Book Now
          </Link>
        )}
      </div>
    </div>
  );
}
