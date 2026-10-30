import CalendarSection from "@/components/CalendarSection";
import Countdown from "@/components/Countdown";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Invitation from "@/components/Invitation";
import Quote from "@/components/Quote";
import ThankYou from "@/components/ThankYou";
import VenueSection from "@/components/VenueSection";

export default function Home() {
  return (
    <Invitation>
      <Hero />
      <Countdown />
      <CalendarSection />
      <Events />
      <Quote />
      <VenueSection />
      <Gallery />
      <ThankYou />
    </Invitation>
  );
}
