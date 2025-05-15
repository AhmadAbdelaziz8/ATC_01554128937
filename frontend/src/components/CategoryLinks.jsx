import { Link } from "react-router-dom";
import categories from "../assets/mock/categories-data";

export default function CategoryLinks() {
  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-gray-800/80">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-foreground dark:text-white">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const categorySlug = category.link.split("/").pop();

            return (
              <Link
                key={category.name}
                to={`/category/${categorySlug}`}
                className="flex flex-col items-center p-4 rounded-lg group transition-transform duration-200 ease-in-out hover:scale-105"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 transition-all duration-200 group-hover:shadow-lg ${category.bgColor} dark:opacity-90`}
                >
                  <IconComponent
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${category.color}`}
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-white group-hover:text-secondary dark:group-hover:text-secondary">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
