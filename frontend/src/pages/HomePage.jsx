import HeroSection from "@/components/HeroSection";
import CategoryLinks from "@/components/CategoryLinks";
import { mockEvents } from "../assets/mock/events-data"; // Import mock data
import EventCard from "@/components/EventCard/EventCard";

export default function HomePage() {
  return (
    <div className="text-3xl font-bold">
      <HeroSection />
      <CategoryLinks />
      {/* Upcoming Events */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-10 text-slate-800">
          Upcoming Events
        </h2>
        {mockEvents && mockEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-600">
            No upcoming events at the moment. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
