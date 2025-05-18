import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import heroItems from "@/data/carousel-data";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleSearchAllEvents = () => {
    navigate("/search");
  };

  return (
    <div className="w-full py-6 sm:py-8 md:py-12">
      <Carousel
        className="w-full max-w-5xl mx-auto"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {heroItems.map((item) => (
            <CarouselItem key={item.id}>
              <div className="p-1">
                <div
                  className="relative w-full h-[350px] bg-cover bg-center text-white rounded-lg 
                  overflow-hidden"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center text-center p-6 z-10">
                    {item.supertitle && (
                      <p className="text-sm sm:text-base font-semibold uppercase tracking-wider mb-2">
                        {item.supertitle}
                      </p>
                    )}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
                      {item.title}
                    </h2>
                    <p
                      className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl 
                    md:max-w-2xl mx-auto"
                    >
                      {item.subtitle}
                    </p>
                    <Button
                      size="lg"
                      className="transform hover:scale-105"
                      onClick={handleSearchAllEvents}
                    >
                      {item.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex" />{" "}
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex" />{" "}
      </Carousel>
    </div>
  );
}
