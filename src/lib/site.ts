/**
 * Single source of truth for Precision Craft Interiors Kenya Ltd.
 */
export const site = {
  name: "Precision Craft",
  legalName: "Precision Craft Interiors Kenya Ltd",
  tagline: "Crafting Beautiful Spaces with Precision",
  description:
    "Premium custom cabinetry and interior solutions in Eldoret, Kenya. Bespoke kitchens, wardrobes, media walls, vanities and commercial interiors — designed, built and installed with precision for homes, hotels, offices and institutions across Uasin Gishu and beyond.",
  url: "https://precisioncraft.co.ke",
  email: "hello@precisioncraft.co.ke",
  emailQuotes: "quotes@precisioncraft.co.ke",
  phone: "+254 743 717 230",
  phoneHref: "tel:+254743717230",
  whatsapp: "https://wa.me/254743717230",
  founder: {
    name: "Udo Wegner",
    role: "Founder & Managing Director",
    year: 2026,
  },
  developer: "Daniel Deng",
  address: {
    street: "Precision Craft House, Uganda Road",
    city: "Eldoret",
    county: "Uasin Gishu County",
    country: "Kenya",
  },
  geo: { lat: 0.5143, lng: 35.2698 },
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 5:30 PM" },
    { days: "Saturday", time: "9:00 AM – 2:00 PM" },
    { days: "Sunday & Public Holidays", time: "Closed" },
  ],
  serviceArea:
    "Eldoret · Uasin Gishu · Trans Nzoia · Nandi · Elgeyo Marakwet · Kakamega · Nakuru",
  socials: [
    { label: "Facebook", href: "https://facebook.com/precisioncraftke" },
    { label: "Instagram", href: "https://instagram.com/precisioncraftke" },
    { label: "LinkedIn", href: "https://linkedin.com/company/precisioncraftke" },
    { label: "TikTok", href: "https://tiktok.com/@precisioncraftke" },
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

export const productLinks = [
  {
    label: "Bespoke Kitchens",
    href: "/#products",
    blurb: "Handleless, classic & island kitchens built to millimetre tolerance.",
  },
  {
    label: "Wardrobes & Closets",
    href: "/#products",
    blurb: "Walk-in and reach-in storage that organises beautifully.",
  },
  {
    label: "Media Walls & Panelling",
    href: "/#products",
    blurb: "Fluted panels, floating consoles and integrated lighting.",
  },
  {
    label: "Bathroom Vanities",
    href: "/#products",
    blurb: "Moisture-engineered vanities in marble, quartz and lacquer.",
  },
  {
    label: "Commercial Interiors",
    href: "/#products",
    blurb: "Reception desks, counters and fit-outs for business spaces.",
  },
  {
    label: "Doors & Finishing",
    href: "/#products",
    blurb: "Solid-core doors, frames and architectural trims.",
  },
] as const;

export const services = [
  {
    slug: "bespoke-kitchens",
    title: "Bespoke Kitchens",
    image: "/images/svc-kitchen.jpg",
    alt: "Close-up of bespoke navy kitchen cabinetry with brushed brass handles by Precision Craft",
    copy: "From handleless European profiles to timeless shaker fronts, every kitchen is measured, milled and finished to a fraction of a millimetre — then installed by the same craftsmen who built it.",
  },
  {
    slug: "wardrobes-closets",
    title: "Wardrobes & Closets",
    image: "/images/svc-wardrobe.jpg",
    alt: "Luxury walk-in wardrobe with navy cabinetry, oak panelling and LED lighting",
    copy: "Walk-in dressing rooms and reach-in wardrobes with intelligent interiors — soft-close drawers, jewellery trays, sensor lighting and hanging engineered around your wardrobe.",
  },
  {
    slug: "media-walls",
    title: "Media Walls & Panelling",
    image: "/images/svc-media.jpg",
    alt: "Living room media wall with fluted oak panelling and floating navy console",
    copy: "Fluted oak, floating consoles and concealed cable management that turn a television wall into the architectural centrepiece of your living room.",
  },
  {
    slug: "bathroom-vanities",
    title: "Bathroom Vanities",
    image: "/images/svc-vanity.jpg",
    alt: "Double-sink marble bathroom vanity with navy cabinetry and brass fittings",
    copy: "Moisture-engineered vanities in marine-grade board, natural marble and quartz — built to stay flawless through years of steam, splashes and daily use.",
  },
  {
    slug: "commercial-interiors",
    title: "Commercial Interiors",
    image: "/images/svc-commercial.jpg",
    alt: "Boutique hotel reception with curved navy desk and brass trim by Precision Craft",
    copy: "Reception desks, display counters, office joinery and complete fit-outs for hotels, restaurants, schools, hospitals, churches and offices — delivered on programme.",
  },
  {
    slug: "renovations-fitouts",
    title: "Renovations & Fit-outs",
    image: "/images/craft-workshop.jpg",
    alt: "Precision Craft craftsman measuring a walnut veneer panel in the Eldoret workshop",
    copy: "Full interior upgrades from strip-out to final polish. One accountable team for joinery, finishes, lighting and installation — no sub-contractor roulette.",
  },
] as const;

export const products = [
  {
    name: "The Signature Kitchen",
    badge: "Best Seller",
    image: "/images/pf-villa.jpg",
    alt: "Signature navy kitchen with marble waterfall island and brass pendants",
    blurb: "Handleless navy fronts, quartz waterfall island, soft-close everything. Our most requested residential build.",
    price: "From KSh 850,000",
  },
  {
    name: "Heritage Walk-in Closet",
    badge: "New",
    image: "/images/svc-wardrobe.jpg",
    alt: "Heritage walk-in closet with oak fluting and sensor lighting",
    blurb: "Fluted oak, brass hanging rails, island dresser and sensor-lit display shelving for the discerning homeowner.",
    price: "From KSh 620,000",
  },
  {
    name: "Aurora Media Wall",
    badge: "Designer Pick",
    image: "/images/svc-media.jpg",
    alt: "Aurora media wall with fluted panelling and floating console",
    blurb: "Floor-to-ceiling fluting, floating console and warm cove lighting — cinema calm for your living room.",
    price: "From KSh 320,000",
  },
  {
    name: "Serene Vanity Suite",
    badge: "Premium",
    image: "/images/svc-vanity.jpg",
    alt: "Serene double vanity suite in marble and navy lacquer",
    blurb: "Double-sink marble top, backlit mirrors and brass detailing — a five-star hotel bathroom, at home.",
    price: "From KSh 240,000",
  },
  {
    name: "Executive Boardroom",
    badge: "Commercial",
    image: "/images/pf-office.jpg",
    alt: "Executive boardroom with custom navy wall cabinetry and walnut table",
    blurb: "Credenzas, wall libraries and conference tables that make boardrooms feel like corner offices.",
    price: "Quoted per project",
  },
  {
    name: "Hotel Reception Desk",
    badge: "Commercial",
    image: "/images/svc-commercial.jpg",
    alt: "Curved hotel reception desk with brass trim and marble top",
    blurb: "Sculptural welcome desks and lobby millwork engineered for heavy daily traffic and lasting first impressions.",
    price: "Quoted per project",
  },
] as const;

export const portfolio = [
  {
    title: "Kapsoya Ridge Residence",
    category: "Residential",
    location: "Kapsoya, Eldoret",
    image: "/images/pf-villa.jpg",
    alt: "Open-plan navy kitchen with brass pendants at Kapsoya Ridge Residence, Eldoret",
    year: "2025",
  },
  {
    title: "The Griffon Hotel Lobby",
    category: "Hospitality",
    location: "Eldoret CBD",
    image: "/images/svc-commercial.jpg",
    alt: "Hotel lobby reception millwork installed by Precision Craft in Eldoret CBD",
    year: "2025",
  },
  {
    title: "Elgon View Family Home",
    category: "Residential",
    location: "Elgon View, Eldoret",
    image: "/images/svc-kitchen.jpg",
    alt: "Bespoke navy kitchen cabinetry detail at Elgon View, Eldoret",
    year: "2024",
  },
  {
    title: "Racecourse Executive Suites",
    category: "Corporate",
    location: "Racecourse, Eldoret",
    image: "/images/pf-office.jpg",
    alt: "Executive boardroom cabinetry for Racecourse Executive Suites, Eldoret",
    year: "2024",
  },
  {
    title: "Annex Master Suite",
    category: "Residential",
    location: "Annex, Eldoret",
    image: "/images/svc-wardrobe.jpg",
    alt: "Walk-in wardrobe with oak fluting at Annex Master Suite, Eldoret",
    year: "2024",
  },
  {
    title: "Pioneer Living Room",
    category: "Residential",
    location: "Pioneer, Eldoret",
    image: "/images/svc-media.jpg",
    alt: "Fluted media wall with floating console at Pioneer, Eldoret",
    year: "2024",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Precision Craft measured twice, cut once — and delivered a kitchen that made our architect stop and take photographs. The drawer alignment alone is a masterclass.",
    name: "Wycliffe & Sarah Kiprop",
    role: "Homeowners, Elgon View",
  },
  {
    quote:
      "We handed them a 21-room hotel joinery package with a brutal timeline. They hit every milestone and the reception desk has become our most photographed feature.",
    name: "Diana Mutai",
    role: "General Manager, The Griffon Hotel",
  },
  {
    quote:
      "As an interior designer I am unforgiving about detail. Their fluted panelling, shadow gaps and brass inlays are the finest I have seen outside Europe.",
    name: "Kelvin Ochieng",
    role: "Principal Designer, Studio Ochre",
  },
  {
    quote:
      "Three developments, forty-plus kitchens, zero snagging disputes. Precision Craft is on the approved joinery list for every project we build.",
    name: "Esther Jelagat",
    role: "Director, Jelani Properties Ltd",
  },
] as const;

export const faqs = [
  {
    q: "Which areas do you serve?",
    a: "Our workshop and showroom are in Eldoret, and we install across Uasin Gishu County and its neighbours — Trans Nzoia, Nandi, Elgeyo Marakwet, Kakamega and Nakuru. For larger commercial projects we deploy teams countrywide.",
  },
  {
    q: "How long does a custom kitchen take?",
    a: "A typical bespoke kitchen takes 4–6 weeks from approved design to installation: one week for final measurement and 3D design, three to four weeks in the workshop, and two to four days on site. We give you a dated programme before we begin.",
  },
  {
    q: "What materials and hardware do you use?",
    a: "We build with marine-grade and moisture-resistant boards, solid hardwoods, natural quartz and granite worktops, and premium soft-close hinges and drawer systems (Blum-equivalent). Every material is specified in your written quote — no substitutions without your approval.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes. Every Precision Craft installation carries a 5-year workmanship warranty and lifetime support on hardware adjustments. If a hinge drifts or a door settles, we come back and make it perfect.",
  },
  {
    q: "How does pricing and payment work?",
    a: "After a free site visit you receive a fixed, itemised quotation. We work on 50% deposit to begin fabrication, 40% on delivery and 10% only after you have inspected the finished installation. M-Pesa, bank transfer and card payments are accepted.",
  },
  {
    q: "Can you work with my architect or interior designer?",
    a: "Absolutely — around a third of our projects come through design professionals. We produce shop drawings and 3D renders for approval, and we are happy to build strictly to your designer's specification.",
  },
] as const;
