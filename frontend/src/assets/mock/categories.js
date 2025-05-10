import {
  Music,
  Zap,
  Clapperboard,
  CalendarDays,
  Heart,
  Gamepad2,
  Briefcase,
  Utensils,
} from "lucide-react";

const categories = [
  {
    name: "Music",
    icon: Music,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    link: "/events/category/music",
  },
  {
    name: "Nightlife",
    icon: Zap,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    link: "/events/category/nightlife",
  },
  {
    name: "Performing Arts",
    icon: Clapperboard,
    color: "text-red-500",
    bgColor: "bg-red-100",
    link: "/events/category/performing-arts",
  },
  {
    name: "Holidays",
    icon: CalendarDays,
    color: "text-green-500",
    bgColor: "bg-green-100",
    link: "/events/category/holidays",
  },
  {
    name: "Hobbies",
    icon: Gamepad2,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    link: "/events/category/hobbies",
  },
  {
    name: "Business",
    icon: Briefcase,
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
    link: "/events/category/business",
  },
  {
    name: "Food & Drink",
    icon: Utensils,
    color: "text-teal-500",
    bgColor: "bg-teal-100",
    link: "/events/category/food-drink",
  },
];

export default categories;
