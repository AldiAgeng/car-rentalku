import { useEffect } from "react";
import { NavigationBar, IntroJumbotron, OurServices, WhyUs, Testimonial, GettingStarted, FAQ, Footer } from "../components";

export default function Home() {
  useEffect(() => {
    document.title = "Car Rental | Home";
  }, []);
  return (
    <div>
      <NavigationBar />
      <IntroJumbotron />
      <OurServices />
      <WhyUs />
      <Testimonial />
      <GettingStarted />
      <FAQ />
      <Footer />
    </div>
  );
}
