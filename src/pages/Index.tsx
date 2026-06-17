import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import CredentialsSection from "@/components/CredentialsSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import MuniBrasilCastSection from "@/components/MuniBrasilCastSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <Marquee />
        <CredentialsSection />
        <AboutSection />
        <ServicesSection />
        <TeamSection />
        <MuniBrasilCastSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Index;
