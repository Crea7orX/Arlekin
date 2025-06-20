import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { MapSection } from "@/components/map-section";
import { PinsSection } from "@/components/pins-section";
import { StatisticsSection } from "@/components/statistics-section";

export default function HomePage() {
  return (
    <>
      <Header className="p-2 md:px-6" />
      <main className="pb-12">
        <HeroSection className="px-2 py-12 md:px-6" />
        <MapSection className="p-2 md:px-6" />
        <PinsSection className="p-2 md:px-6" />
        <StatisticsSection className="p-2 md:px-6" />
      </main>
      <Footer className="mt-auto p-2 md:px-6" />
    </>
  );
}
