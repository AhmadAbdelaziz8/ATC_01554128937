import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function getRandomFutureDate(daysFromNow = 30, range = 60) {
  const today = new Date();
  const futureDate = new Date(today);
  const daysToAdd = daysFromNow + Math.floor(Math.random() * range);
  futureDate.setDate(futureDate.getDate() + daysToAdd);
  return futureDate;
}

const events = [
  {
    id: "1",
    name: "Tech Conference 2025",
    description: "A conference for tech enthusiasts...",
    date: getRandomFutureDate(30, 60).toISOString(), // 30-90 days from now
    venue: "Convention Center, Downtown",
    category: "Technology",
    price: 199,
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "2",
    name: "Tech Innovators Conference",
    description:
      "A two-day conference featuring keynote speakers, workshops, and networking opportunities with leaders in the tech industry. Explore the future of technology.",
    category: "Business",
    date: getRandomFutureDate(30, 60).toISOString(),
    venue: "Grand Convention Center, City Center",
    price: 250.0,
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "3",
    name: "Artisan Food",
    description:
      "Discover local and international culinary delights. Tastings, cooking demonstrations, and unique food products.",
    category: "Food & Drink",
    date: getRandomFutureDate(30, 60).toISOString(),
    venue: "The Waterfront Pavilion",
    price: 40.0,
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "4",
    name: "Indie Film Showcase",
    description:
      "A week-long showcase of independent films from emerging filmmakers. Q&A sessions with directors and actors.",
    category: "Performing Arts",
    date: "2024-10-15T19:00:00.000Z",
    venue: "The Art House Cinema",
    price: 15.0,
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
];

async function main() {
  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: {},
      create: event,
    });
  }
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
