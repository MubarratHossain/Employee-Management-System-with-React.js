import Banner from "../Banner/Banner";
import CTASection from "../CTA/CTAsection";
import KeyFeaturesAndFAQ from "../keyfeature/KeyFeaturesAndFAQ";
import Services from "../services/Services";
import Testimonials from "../Testimonials/Testimonials";
import TimeRecordingSection from "../Timerecord/TimeRecordingSection";

const Home = () => {
  return (
    <div>
      <Banner />

      <Services></Services>

     <Testimonials></Testimonials>

     <TimeRecordingSection></TimeRecordingSection>

     <KeyFeaturesAndFAQ></KeyFeaturesAndFAQ>

     <CTASection></CTASection>

      {/* Contact Section */}
   
    </div>
  );
};

export default Home;
