import Business from "./Business";
import FeaturedServices from "./FeaturedServices";
import HeroSection from "./HeroSection";
import HighRatedServices from "./HighRatedServices";
import HowWorks from "./HowWorks";
import Links from "./Links";
import OurCategories from "./OurCategories";
import PopularProviders from "./PopularProviders";
import PopularServices from "./PopularServices";
import PreferredServices from "./PreferredServices";
import Provider from "./Provider";
import RecentBlog from "./RecentBlog";
import Testimonial from "./Testimonial";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <OurCategories />
      <FeaturedServices />
      <PopularServices />
      <HowWorks />
      <PopularProviders />
      <PreferredServices />
      <HighRatedServices />
      <Testimonial />
      <Provider />
      <RecentBlog />
      <Business />
      <Links />
    </>
  );
};

export default HomePage;