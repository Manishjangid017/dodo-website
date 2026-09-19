'use client';
import Applications from './Applications';
import BrandStatement from './BrandStatement';
import EnquiryForm from './EnquiryForm';
import FAQ from './FAQ';
import Hero from './Hero';
import Packaging from './Packaging';
import ProductCharacteristics from './ProductCharacteristics';
import ProductIntro from './ProductIntro';
import ProductShowcase from './ProductShowcase';
import ProductStory from './ProductStory';
import QualitySection from './QualitySection';

export default function MainHome() {
  return (
    <>
      {/* 1. Hero — cinematic product intro */}
      <Hero />

      {/* 2. Product intro — editorial headline + quality pillars */}
      <ProductIntro />

      {/* 3. Product showcase — variants with scroll parallax */}
      <ProductShowcase />

      {/* 4. Product story — source → selection → processing → quality */}
      <ProductStory />

      {/* 5. Product characteristics — specs, colour, heat, aroma */}
      {/* <ProductCharacteristics /> */}

      {/* 6. Quality section — trust, standards, consistency */}
      <QualitySection />

      {/* 7. Applications — food mfg, spice blending, hospitality, export */}
      {/* <Applications /> */}

      {/* 8. Packaging & supply — pack sizes, bulk, wholesale, export */}
      {/* <Packaging /> */}

      {/* 9. Brand statement — full-width parallax, large editorial type */}
      <BrandStatement />

      {/* 10. FAQ — accordion */}
      {/* <FAQ /> */}

      {/* 11. Enquiry form — primary conversion section */}
      <EnquiryForm />
    </>
  );
}
