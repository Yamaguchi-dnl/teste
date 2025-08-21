import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Benefits from '@/components/landing/benefits';
import Methodology from '@/components/landing/methodology';
import PresentationVideo from '@/components/landing/presentation-video';
import Testimonials from '@/components/landing/testimonials';
import Pricing from '@/components/landing/pricing';
import ContactForm from '@/components/landing/contact-form';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <Methodology />
        <PresentationVideo backgroundImageUrl="https://ik.imagekit.io/leosmc2zb/Sem%20T%C3%ADtulo-1(1).png" />
        <Testimonials />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
