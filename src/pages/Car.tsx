import { useEffect } from "react";
import { NavigationBar, IntroJumbotron, FilterCars, Footer } from "../components";
export default function Car() {
  useEffect(() => {
    document.title = "Car Rental | Car";
  }, []);
  return (
    <div>
      <NavigationBar />
      <IntroJumbotron />
      <FilterCars />
      <Footer />
    </div>
  );
}
