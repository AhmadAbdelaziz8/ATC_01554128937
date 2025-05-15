import { Link } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { LinkButton } from "../ui/Button";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function EventCard({ event }) {
  const [imageError, setImageError] = useState(false);

  if (!event) return null;
  const eventPrice = parseInt(event.price).toFixed(2);
  const fallbackImageUrl =
    "https://via.placeholder.com/400x250?text=Event+Image";
  const handleImageError = () => setImageError(true);

  return (
    <Card className="flex flex-col group transition-all duration-300 hover:shadow-xl h-full">
      <Link to={`/events/${event.id}`} className="block">
        <img
          src={
            imageError ? fallbackImageUrl : event.imageUrl || fallbackImageUrl
          }
          alt={event.name}
          onError={handleImageError}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <CardContent className="flex flex-col flex-grow">
        <Link to={`/events/${event.id}`} className="block mb-2">
          <h3 className="text-xl font-semibold text-foreground dark:text-dark-text group-hover:text-secondary transition-colors">
            {event.name}
          </h3>
        </Link>

        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center">
          <CalendarDays
            className="mr-2 text-secondary h-4 w-4"
            strokeWidth={2}
          />
          <span>{formatDate(event.date)}</span>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 flex items-center">
          <MapPin className="mr-2 text-secondary h-4 w-4" strokeWidth={2} />
          <span>{event.venue}</span>
        </div>

        <div className="text-lg font-bold text-foreground dark:text-white mt-auto mb-3">
          {eventPrice > 0 ? `$${eventPrice}` : "Free"}
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-2">
        {event.isBooked ? (
          <span className="w-full block text-center bg-green-500 text-white py-2 px-4 rounded-md font-semibold">
            Booked
          </span>
        ) : (
          <LinkButton
            to={`/events/${event.id}`}
            variant="secondary"
            className="w-full justify-center"
          >
            Book Now
          </LinkButton>
        )}
      </CardFooter>
    </Card>
  );
}
