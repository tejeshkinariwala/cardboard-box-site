import { Header, Footer } from '@/components/layout';
import { Hero } from './Hero';
import { Services } from './Services';
import { Products } from './Products';
import { Testimonials } from './Testimonials';
import { Contact } from './Contact';

export function Landing() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Products />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
