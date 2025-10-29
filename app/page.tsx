import Header from "@/components/header";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Services from "@/components/services";
import Testimonials from "@/components/testimonials";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
