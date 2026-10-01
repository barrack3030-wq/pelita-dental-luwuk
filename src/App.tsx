import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Star, Phone, MapPin, Clock, ChevronRight } from 'lucide-react';

// ============ INTERSECTION OBSERVER HOOK ============
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ============ NAVBAR ============
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Services', 'Gallery', 'Reviews', 'Location'];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-scrolled py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex flex-col" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <span className={`font-serif text-lg tracking-wide transition-colors duration-300 ${scrolled ? 'text-navy' : 'text-white'}`}>
              Jizel Zarra
            </span>
            <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${scrolled ? 'text-text-muted' : 'text-white/70'}`}>
              Dental Practice
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className={`text-[11px] uppercase tracking-[0.15em] font-medium transition-colors duration-300 hover-underline ${
                  scrolled ? 'text-text-dark hover:text-navy' : 'text-white/90 hover:text-white'
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="tel:081251030315"
              className={`btn-gold inline-block px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium border transition-all duration-300 ${
                scrolled
                  ? 'border-navy text-navy hover:bg-navy hover:text-ivory'
                  : 'border-white/60 text-white hover:bg-white hover:text-navy'
              }`}
            >
              Make an Appointment
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden transition-colors duration-300 ${scrolled ? 'text-navy' : 'text-white'}`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ivory pt-24 px-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollToSection(link)}
                  className="text-left font-serif text-2xl text-navy hover:text-gold transition-colors"
                >
                  {link}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="tel:081251030315"
                className="mt-4 inline-block px-6 py-3 text-center text-[11px] uppercase tracking-[0.15em] font-medium border border-navy text-navy hover:bg-navy hover:text-ivory transition-all"
              >
                Make an Appointment
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============ HERO ============
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/173ce60b-f773-4c7f-9d20-99858c6584cf/_result.png"
          alt="Praktek Dokter Gigi Jizel Zarra"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/20 to-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/50 via-transparent to-transparent" />
      </div>

      {/* Vertical Text */}
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-sans writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>
          Luwuk · Banggai · Central Sulawesi
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24 pt-32">
        <div className="max-w-3xl">
          {/* Practice Name */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[11px] uppercase tracking-[0.25em] text-gold mb-6"
          >
            Praktek Dokter Gigi Jizel Zarra
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-6"
          >
            Senyum yang lebih<br />
            percaya diri,<br />
            <span className="italic text-gold-light">dimulai dari sini.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/70 text-sm sm:text-base max-w-lg leading-relaxed mb-10"
          >
            Perawatan gigi dengan perhatian pada kenyamanan, komunikasi, dan pengalaman pasien.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="tel:081251030315"
              className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-navy text-[11px] uppercase tracking-[0.15em] font-semibold hover:bg-gold-light transition-all duration-300"
            >
              Buat Janji
              <ArrowRight size={14} />
            </a>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/40 text-white text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-white/10 transition-all duration-300"
            >
              Lihat Layanan
            </a>
          </motion.div>
        </div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 flex items-center gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-gold fill-gold" />
              ))}
            </div>
            <div className="h-4 w-px bg-white/20" />
            <span className="font-serif text-2xl text-white">5.0</span>
            <span className="text-white/50 text-xs uppercase tracking-wider">Google Rating</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/20" />
          <span className="hidden sm:block text-white/50 text-xs">21 Reviews</span>
        </motion.div>
      </div>
    </section>
  );
}

// ============ ABOUT ============
function About() {
  const { ref, isVisible } = useInView();

  return (
    <section id="about" className="py-24 lg:py-36 bg-ivory">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Images */}
          <div className={`relative reveal-left ${isVisible ? 'visible' : ''}`}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src="https://image.qwenlm.ai/generated-images/7a68d64c-916d-4598-abfc-dbacbfe7b4b9/_result.png"
                alt="Praktek Dokter Gigi Jizel Zarra - Interior"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 lg:w-64 lg:h-64 overflow-hidden rounded-sm hidden sm:block">
              <img
                src="https://image.qwenlm.ai/generated-images/d401c8e6-b9e3-4c76-a7a1-f4f778ace139/_result.png"
                alt="Perawatan Gigi"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Gold accent line */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t border-l border-gold/40 hidden sm:block" />
          </div>

          {/* Content */}
          <div className={`reveal-right ${isVisible ? 'visible' : ''}`}>
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">About Us</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-8">
              Perawatan yang Lebih dari<br />
              <span className="italic">Sekadar Perawatan Gigi</span>
            </h2>
            <div className="space-y-5 text-text-muted leading-relaxed">
              <p>
                Praktek Dokter Gigi Jizel Zarra hadir untuk memberikan pengalaman perawatan gigi yang nyaman dan terpercaya bagi masyarakat Luwuk dan sekitarnya.
              </p>
              <p>
                Kami percaya bahwa pengalaman pasien dimulai dari komunikasi yang baik, lingkungan yang nyaman, dan perhatian terhadap setiap kunjungan.
              </p>
            </div>

            {/* Decorative elements */}
            <div className="mt-10 flex items-center gap-4">
              <div className="gold-line-left w-12" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">Luwuk, Banggai</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES ============
function Services() {
  const { ref, isVisible } = useInView();

  const services = [
    {
      number: '01',
      name: 'Konsultasi Gigi',
      description: 'Diskusi awal mengenai kondisi kesehatan gigi dan mulut Anda untuk menentukan perawatan yang tepat.'
    },
    {
      number: '02',
      name: 'Pemeriksaan Gigi',
      description: 'Pemeriksaan menyeluruh untuk mendeteksi masalah gigi dan mulut secara dini.'
    },
    {
      number: '03',
      name: 'Perawatan Gigi',
      description: 'Penanganan berbagai masalah gigi dengan pendekatan yang nyaman dan profesional.'
    },
    {
      number: '04',
      name: 'Perawatan Gigi Anak',
      description: 'Perawatan gigi khusus untuk anak dengan pendekatan yang ramah dan menyenangkan.'
    },
    {
      number: '05',
      name: 'Kebersihan dan Kesehatan Gigi',
      description: 'Pembersihan dan perawatan preventif untuk menjaga kesehatan gigi jangka panjang.'
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-36 bg-warm-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`max-w-2xl mb-16 lg:mb-24 reveal ${isVisible ? 'visible' : ''}`}>
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Our Services</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight">
            Layanan Kami
          </h2>
        </div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, i) => (
            <div
              key={service.number}
              className={`service-item group border-t border-navy/10 py-8 lg:py-10 cursor-pointer reveal ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-6 lg:gap-12">
                <span className="service-number font-serif text-2xl lg:text-3xl text-navy/30 transition-colors duration-400 min-w-[3rem]">
                  {service.number}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl lg:text-2xl text-navy group-hover:text-gold transition-colors duration-300">
                      {service.name}
                    </h3>
                    <ArrowRight className="service-arrow text-navy/30 transition-all duration-300 flex-shrink-0" size={20} />
                  </div>
                  <p className="text-text-muted text-sm mt-2 max-w-lg leading-relaxed">
                    {service.description}
                  </p>
                  <div className="service-line mt-4" />
                </div>
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-navy/10" />
        </div>
      </div>
    </section>
  );
}

// ============ WHY CHOOSE US ============
function WhyChooseUs() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 lg:py-36 bg-navy relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold blur-[100px]" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Rating */}
          <div className={`reveal-left ${isVisible ? 'visible' : ''}`}>
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-6">Why Choose Us</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight mb-12">
              A Better<br />
              <span className="italic text-gold-light">Dental Experience</span>
            </h2>

            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-serif text-7xl lg:text-8xl text-gold">5.0</span>
            </div>
            <p className="text-ivory/70 text-sm mb-2">Google Rating</p>
            <p className="text-ivory/50 text-xs">21 Reviews</p>

            <div className="flex gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-gold fill-gold" />
              ))}
            </div>
          </div>

          {/* Right - Principles */}
          <div className={`reveal-right ${isVisible ? 'visible' : ''}`}>
            <div className="space-y-12">
              {[
                { title: 'Comfort', desc: 'Lingkungan perawatan yang nyaman dan menenangkan untuk setiap kunjungan.' },
                { title: 'Care', desc: 'Perhatian penuh terhadap kebutuhan dan kenyamanan setiap pasien.' },
                { title: 'Trust', desc: 'Kepercayaan yang dibangun melalui komunikasi terbuka dan perawatan berkualitas.' }
              ].map((item, i) => (
                <div key={item.title} className="flex gap-6 items-start">
                  <span className="font-serif text-gold text-sm mt-1">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl text-ivory mb-2">{item.title}</h3>
                    <p className="text-ivory/60 text-sm leading-relaxed">{item.desc}</p>
                    <div className="w-8 h-px bg-gold/40 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ GALLERY ============
function Gallery() {
  const { ref, isVisible } = useInView();

  return (
    <section id="gallery" className="py-24 lg:py-36 bg-ivory">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`max-w-2xl mb-16 lg:mb-24 reveal ${isVisible ? 'visible' : ''}`}>
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Gallery</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight">
            The Practice
          </h2>
        </div>

        {/* Gallery Grid - Editorial Layout */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 reveal ${isVisible ? 'visible' : ''}`}>
          {/* Large image */}
          <div className="gallery-item md:col-span-7 aspect-[4/3] overflow-hidden rounded-sm">
            <img
              src="https://image.qwenlm.ai/generated-images/06c48dd0-43f2-45db-b30e-5c0ea8b98040/_result.png"
              alt="The Practice"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Two small images */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4 lg:gap-6">
            <div className="gallery-item aspect-square overflow-hidden rounded-sm">
              <img
                src="https://image.qwenlm.ai/generated-images/d401c8e6-b9e3-4c76-a7a1-f4f778ace139/_result.png"
                alt="A Comfortable Environment"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="gallery-item aspect-square overflow-hidden rounded-sm">
              <img
                src="https://image.qwenlm.ai/generated-images/ca212ce1-2854-4803-a2c5-c16d1ca788eb/_result.png"
                alt="Patient Care"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          {/* Landscape image */}
          <div className="md:col-span-5 aspect-[16/9] md:aspect-auto overflow-hidden rounded-sm">
            <img
              src="https://image.qwenlm.ai/generated-images/bfa37c45-123f-42c1-9584-a53a7983ff1a/_result.png"
              alt="Modern Equipment"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Portrait image */}
          <div className="md:col-span-7 aspect-[16/9] md:aspect-auto overflow-hidden rounded-sm">
            <img
              src="https://image.qwenlm.ai/generated-images/173ce60b-f773-4c7f-9d20-99858c6584cf/_result.png"
              alt="Treatment Room"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Captions */}
        <div className={`mt-8 flex flex-wrap gap-8 reveal ${isVisible ? 'visible' : ''}`}>
          {['The Practice', 'A Comfortable Environment', 'Patient Care'].map((caption) => (
            <div key={caption} className="flex items-center gap-2">
              <div className="w-4 h-px bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-text-muted">{caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ REVIEWS ============
function Reviews() {
  const { ref, isVisible } = useInView();

  const reviews = [
    {
      name: 'Winda Hamidah',
      text: 'The staff is very friendly and welcoming.'
    },
    {
      name: 'Riza Usman',
      text: '10000/100 reccomended ❤️'
    }
  ];

  return (
    <section id="reviews" className="py-24 lg:py-36 bg-ivory-warm">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 lg:mb-24 reveal ${isVisible ? 'visible' : ''}`}>
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Testimonials</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-8">
            Trusted by Our Patients
          </h2>

          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-gold fill-gold" />
              ))}
            </div>
            <span className="font-serif text-3xl text-navy">5.0</span>
          </div>
          <p className="text-text-muted text-sm">21 Google Reviews</p>
        </div>

        {/* Reviews */}
        <div className={`max-w-4xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 reveal ${isVisible ? 'visible' : ''}`}>
          {reviews.map((review, i) => (
            <div
              key={review.name}
              className="bg-warm-white p-8 lg:p-10 rounded-sm border border-navy/5"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-navy leading-relaxed mb-6 font-serif text-lg italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
                  <span className="text-navy text-xs font-medium">{review.name[0]}</span>
                </div>
                <span className="text-sm text-text-dark font-medium">{review.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Google */}
        <div className={`text-center mt-12 reveal ${isVisible ? 'visible' : ''}`}>
          <a
            href="https://www.google.com/maps/place/Praktek+Dokter+Gigi+Jizel+Zarra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-gold hover:text-gold-light transition-colors"
          >
            Read all reviews on Google
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ LOCATION ============
function Location() {
  const { ref, isVisible } = useInView();

  return (
    <section id="location" className="py-24 lg:py-36 bg-warm-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`max-w-2xl mb-16 lg:mb-24 reveal ${isVisible ? 'visible' : ''}`}>
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Location</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight">
            Visit Us in Luwuk
          </h2>
        </div>

        <div className={`grid lg:grid-cols-5 gap-12 lg:gap-16 reveal ${isVisible ? 'visible' : ''}`}>
          {/* Map */}
          <div className="lg:col-span-3 aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden rounded-sm border border-navy/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.5!2d122.7907!3d-0.9447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32b98d!2sJl.+Imam+Bonjol+Luwuk!5e0!3m2!1sid!2sid!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Praktek Dokter Gigi Jizel Zarra"
            />
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-10">
            {/* Address */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-gold" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted">Address</span>
              </div>
              <p className="text-navy leading-relaxed">
                Jl. Imam Bonjol No.Kilo 1, Bungin,<br />
                Luwuk, Kabupaten Banggai,<br />
                Sulawesi Tengah 94712
              </p>
            </div>

            {/* Hours */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-gold" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted">Opening Hours</span>
              </div>
              <p className="text-navy">
                Open – Closes 9:00 PM
              </p>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Phone size={16} className="text-gold" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted">Contact</span>
              </div>
              <a href="tel:081251030315" className="text-navy hover:text-gold transition-colors text-lg">
                0812-5103-0315
              </a>
            </div>

            {/* CTA */}
            <a
              href="https://www.google.com/maps/dir//Jl.+Imam+Bonjol+No.Kilo+1,+Bungin,+Luwuk,+Kabupaten+Banggai,+Sulawesi+Tengah+94712"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy text-ivory text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-navy-deep transition-all duration-300"
            >
              Get Directions
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FINAL CTA ============
function FinalCTA() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 lg:py-36 bg-navy relative overflow-hidden">
      {/* Subtle decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold blur-[150px]" />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight mb-8">
            Your Smile Deserves<br />
            <span className="italic text-gold-light">Thoughtful Care.</span>
          </h2>
          <p className="text-ivory/60 max-w-lg mx-auto mb-10 leading-relaxed">
            Hubungi Praktek Dokter Gigi Jizel Zarra untuk informasi dan membuat janji kunjungan.
          </p>
          <a
            href="tel:081251030315"
            className="btn-gold inline-flex items-center gap-2 px-10 py-4 border border-gold text-gold text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-gold hover:text-navy transition-all duration-300"
          >
            Make an Appointment
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-navy-deep py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Gold line separator */}
        <div className="gold-line mb-16" />

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* Logo & Description */}
          <div>
            <div className="mb-4">
              <span className="font-serif text-xl text-ivory">Jizel Zarra</span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ivory/40 mt-1">Dental Practice</p>
            </div>
            <p className="text-ivory/50 text-sm leading-relaxed">
              Perawatan gigi premium di Luwuk, Banggai, Sulawesi Tengah.
            </p>
          </div>

          {/* Location */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold mb-4">Location</p>
            <p className="text-ivory/60 text-sm leading-relaxed">
              Luwuk, Banggai<br />
              Central Sulawesi
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold mb-4">Contact</p>
            <a href="tel:081251030315" className="text-ivory/60 text-sm hover:text-gold transition-colors">
              0812-5103-0315
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-ivory/30 text-xs">
            © {new Date().getFullYear()} Praktek Dokter Gigi Jizel Zarra. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex gap-6">
              {['Home', 'Services', 'Location'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-ivory/30 text-xs hover:text-gold transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            <a href="https://nakamadigital.biz.id/" target="_blank" rel="noopener noreferrer" className="text-ivory/30 text-xs hover:text-gold transition-colors">
              Website by Nakama Digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Gallery />
      <Reviews />
      <Location />
      <FinalCTA />
      <Footer />
    </div>
  );
}
