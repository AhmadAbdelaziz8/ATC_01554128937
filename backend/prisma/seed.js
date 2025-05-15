import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function getRandomFutureDate(daysFromNow = 30, range = 60) {
  const today = new Date();
  const futureDate = new Date(today);
  const daysToAdd = daysFromNow + Math.floor(Math.random() * range);
  futureDate.setDate(futureDate.getDate() + daysToAdd);
  return futureDate;
}

// Sample image URLs for events
const eventImages = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1472653431158-6364773b2a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
];

// Cities for venues
const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Boston",
  "Miami",
  "Seattle",
  "Denver",
  "Austin",
  "San Francisco",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Berlin",
];

// Venue types
const venueTypes = [
  "Convention Center",
  "Hotel",
  "Conference Hall",
  "Theater",
  "Stadium",
  "Gallery",
  "Museum",
  "Park",
  "Community Center",
  "University Campus",
];

// Categories
const categories = [
  "Technology",
  "Business",
  "Food & Drink",
  "Art & Culture",
  "Music",
  "Sports",
  "Education",
  "Health & Wellness",
  "Science",
  "Entertainment",
];

// Generate a random venue
function generateVenue() {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const venueType = venueTypes[Math.floor(Math.random() * venueTypes.length)];
  return `${venueType}, ${city}`;
}

// Generate a random image URL
function getRandomImage() {
  return eventImages[Math.floor(Math.random() * eventImages.length)];
}

// Generate a random price
function getRandomPrice(min = 10, max = 500) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// Generate a random category
function getRandomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

// Array of event names
const eventNames = [
  "Tech Conference",
  "Digital Innovation Summit",
  "Startup Weekend",
  "Annual Developer Conference",
  "Food Festival",
  "Art Exhibition",
  "Music Concert",
  "Sports Tournament",
  "Health & Wellness Expo",
  "Science Fair",
  "Business Networking Event",
  "Industry Conference",
  "Marketing Masterclass",
  "Annual Charity Gala",
  "Film Festival",
  "Photography Workshop",
  "Cooking Class",
  "Wine Tasting",
  "Yoga Retreat",
  "Fashion Show",
  "Book Launch",
  "Career Fair",
  "Educational Seminar",
  "Cultural Festival",
  "Dance Performance",
  "Comedy Night",
  "Tech Hackathon",
  "Gaming Tournament",
  "Craft Beer Festival",
  "Design Workshop",
];

// Array of event descriptions
const eventDescriptions = [
  "Join us for an exciting event featuring the latest innovations in the industry. Network with professionals and learn from expert speakers.",
  "A unique opportunity to explore new ideas and collaborate with like-minded individuals. Don't miss this transformative experience!",
  "Discover the future of technology and connect with industry leaders. This event offers workshops, panels, and networking opportunities.",
  "An immersive experience designed for professionals seeking to expand their knowledge and skills. Featuring hands-on activities and expert sessions.",
  "Celebrate creativity and innovation at this premier event. Engage with thought leaders and participate in interactive exhibitions.",
  "A comprehensive showcase of cutting-edge developments and best practices. Perfect for enthusiasts and professionals alike.",
  "An educational journey through the latest trends and methodologies. Learn from the best in the field and take your skills to the next level.",
  "Experience the convergence of art, technology, and business. This event promises inspiration and practical insights for all attendees.",
  "A gathering of visionaries and practitioners offering fresh perspectives and actionable strategies. Join us for this transformative event.",
  "Immerse yourself in a world of creativity and innovation. Connect with experts and enthusiasts in a collaborative and inspiring environment.",
];

// Generate mock events with different locations
function generateMockEvents(count = 50) {
  const events = [];

  for (let i = 1; i <= count; i++) {
    const eventName = eventNames[Math.floor(Math.random() * eventNames.length)];
    const description =
      eventDescriptions[Math.floor(Math.random() * eventDescriptions.length)];

    events.push({
      name: `${eventName} ${Math.floor(Math.random() * 100)}`,
      description,
      date: getRandomFutureDate(15, 180).toISOString(), // Between 15 days and 6 months from now
      venue: generateVenue(),
      category: getRandomCategory(),
      price: getRandomPrice(),
      imageUrl: getRandomImage(),
    });
  }

  return events;
}

// Generate 50 mock events
const mockEvents = generateMockEvents(50);

async function main() {
  // First, clear existing events
  await prisma.booking.deleteMany({});
  await prisma.event.deleteMany({});

  console.log("Deleted existing events and bookings");

  // Insert the new events
  for (const event of mockEvents) {
    await prisma.event.create({
      data: event,
    });
  }

  console.log(`Inserted ${mockEvents.length} events`);
}

main()
  .then(() => {
    console.log("Seeding finished.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
