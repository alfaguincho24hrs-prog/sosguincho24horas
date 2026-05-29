import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { MapPin, Phone, Star, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { PARTNERS } from "@/components/site-data";

export function PartnersCarousel() {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  return (
    <Carousel opts={{ align: "start", loop: true }} plugins={[autoplay.current]} className="w-full">
      <CarouselContent>
        {PARTNERS.map((p) => (
          <CarouselItem key={p.name} className="sm:basis-1/2 lg:basis-1/3">
            <Card className="h-full border-border/60 transition-all hover:border-accent/60 hover:shadow-[var(--shadow-elegant)]">
              <CardContent className="space-y-3 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[image:var(--gradient-cta)] text-primary">
                    <img 
                      src="/icon-192.png" 
                      alt={`Logotipo da empresa de guincho ${p.name}`} 
                      className="h-7 w-7 object-contain" 
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-accent-foreground">
                    <Star className="h-4 w-4 fill-accent text-accent" /> {p.rating}
                  </div>
                </div>
                <h4 className="text-lg font-semibold">{p.name}</h4>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {p.city}
                </p>
                <Button asChild className="w-full bg-[image:var(--gradient-cta)] text-primary hover:opacity-95 shadow-sm">
                  <a href={`tel:${p.phone.replace(/\D/g, "")}`}>
                    <Phone className="h-4 w-4" /> {p.phone}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}

export default PartnersCarousel;
