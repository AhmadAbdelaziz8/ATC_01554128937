import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function getRandomFutureDate(daysFromNow = 30, range = 60) {
  const today = new Date();
  const futureDate = new Date(today);
  const daysToAdd = daysFromNow + Math.floor(Math.random() * range);
  futureDate.setDate(futureDate.getDate() + daysToAdd);
  return futureDate;
}

const categoryImages = {
  Workshops: [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1544928147-79a2dbc1f669?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ],
  Networking: [
    "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ],
  Educational: [
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ],
  Holidays: [
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1482330454287-3cf6c782003b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ],
  Hobbies: [
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1472653431158-6364773b2a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ],
  Business: [
    "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1580795479025-93d13fd9aa6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ],
  "Food & Drink": [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ],
  Music: [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ],
  Sports: [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1556037757-b8c239ec6607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ],
  "Art & Culture": [
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1605378515056-41193ee747d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ],
};

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

const categories = Object.keys(categoryImages);

function generateVenue() {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const venueType = venueTypes[Math.floor(Math.random() * venueTypes.length)];
  return `${venueType}, ${city}`;
}

function getRandomImageForCategory(category) {
  const images = categoryImages[category];
  return images[Math.floor(Math.random() * images.length)];
}

function getRandomPrice(min = 10, max = 500) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

const eventNames = {
  Workshops: [
    "Design Workshop",
    "Pottery Workshop",
    "Creative Writing Workshop",
    "Photography Workshop",
    "Coding Bootcamp",
  ],
  Networking: [
    "Business Mixer",
    "Industry Meetup",
    "Professional Networking",
    "Startup Weekend",
    "Tech Networking Event",
  ],
  Educational: [
    "Science Fair",
    "History Lecture",
    "Educational Seminar",
    "Learning Symposium",
    "Academic Conference",
  ],
  Holidays: [
    "Christmas Celebration",
    "New Year's Party",
    "Holiday Festival",
    "Easter Event",
    "Halloween Party",
  ],
  Hobbies: [
    "Book Club Meeting",
    "Gardening Workshop",
    "Chess Tournament",
    "Painting Class",
    "Craft Workshop",
  ],
  Business: [
    "Business Conference",
    "Marketing Seminar",
    "Entrepreneurship Summit",
    "Investment Forum",
    "Corporate Retreat",
  ],
  "Food & Drink": [
    "Food Festival",
    "Wine Tasting",
    "Cooking Class",
    "Beer Festival",
    "Culinary Tour",
  ],
  Music: [
    "Live Concert",
    "Jazz Night",
    "Music Festival",
    "Orchestra Performance",
    "Band Showcase",
  ],
  Sports: [
    "Marathon",
    "Basketball Tournament",
    "Soccer Match",
    "Tennis Open",
    "Volleyball Competition",
  ],
  "Art & Culture": [
    "Art Exhibition",
    "Cultural Festival",
    "Museum Tour",
    "Theater Performance",
    "Dance Recital",
  ],
};

const eventDescriptions = [
  "Join us for an exciting event featuring the latest innovations in the industry. Network with professionals and learn from expert speakers.",
  "A unique opportunity to explore new ideas and collaborate with like-minded individuals. Don't miss this transformative experience!",
  "Discover the future of technology and connect with industry leaders. This event offers workshops, panels, and networking opportunities.",
  "An immersive experience designed for professionals seeking to expand their knowledge and skills. Featuring hands-on activities and expert sessions.",
  "Celebrate creativity and innovation at this premier event. Engage with thought leaders and participate in interactive exhibitions.",
];

function generateMockEvents(count = 30) {
  const events = [];

  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const eventNameOptions = eventNames[category] || ["Event"];
    const eventName =
      eventNameOptions[Math.floor(Math.random() * eventNameOptions.length)];
    const description =
      eventDescriptions[Math.floor(Math.random() * eventDescriptions.length)];

    events.push({
      name: `${eventName} ${Math.floor(Math.random() * 100)}`,
      description,
      date: getRandomFutureDate(15, 180).toISOString(),
      venue: generateVenue(),
      category,
      price: getRandomPrice(),
      imageUrl: getRandomImageForCategory(category),
    });
  }

  return events;
}

const mockEvents = generateMockEvents(30);

async function main() {
  await prisma.booking.deleteMany({});
  await prisma.event.deleteMany({});

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
