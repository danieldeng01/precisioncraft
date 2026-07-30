import { Hero } from "@/components/home/Hero";
import { CraftMarquee } from "@/components/home/CraftMarquee";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Products } from "@/components/home/Products";
import { Portfolio } from "@/components/home/Portfolio";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Contact } from "@/components/home/Contact";
import { faqs, site } from "@/lib/site";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": `${site.url}/#business` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero />
      <CraftMarquee />
      <About />
      <Services />
      <Process />
      <Products />
      <Portfolio />
      <Features />
      <Testimonials />
      <Faq />
      <CtaBanner />
      <Contact />
    </>
  );
}
