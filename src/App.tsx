import React, { useState } from 'react';
import { Building2, Users, MousePointerClick, ArrowRight, Menu, X, Home, UserPlus, MessageSquare } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thanks for joining our waitlist! We\'ll be in touch soon.');
    setEmail('');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-[#4B75B7]">Rentora</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Features', 'How It Works', 'FAQ', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-600 hover:text-[#4B75B7] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-[#4B75B7]"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Features', 'How It Works', 'FAQ', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-[#4B75B7] hover:bg-gray-50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#4B75B7]/10 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Student Housing Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find your perfect off-campus housing, connect with roommates, and apply with just one click.
          </p>
          <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to join the waitlist"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B75B7]"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#4B75B7] text-white rounded-lg hover:bg-[#4B75B7]/90 transition-colors"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Rentora?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white shadow-lg">
              <div className="w-12 h-12 bg-[#4B75B7]/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="text-[#4B75B7]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Subleasing</h3>
              <p className="text-gray-600">
                Seamlessly sublease from other students in your area. Browse verified listings and connect directly with student subleasers.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg">
              <div className="w-12 h-12 bg-[#4B75B7]/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-[#4B75B7]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Roommate Matching</h3>
              <p className="text-gray-600">
                Find compatible roommates and create groups. Our matching system helps you connect with the perfect roommates.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg">
              <div className="w-12 h-12 bg-[#4B75B7]/10 rounded-lg flex items-center justify-center mb-4">
                <MousePointerClick className="text-[#4B75B7]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">One-Click Applications</h3>
              <p className="text-gray-600">
                Apply to multiple properties with a single click. Save time and streamline your housing search process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how it works" className="py-20 px-4 bg-[#4B75B7]/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Home className="text-[#4B75B7]" size={24} />,
                title: "Browse Listings",
                description: "Search verified student housing and subleases near your university"
              },
              {
                icon: <Users className="text-[#4B75B7]" size={24} />,
                title: "Find Roommates",
                description: "Connect with potential roommates and create groups"
              },
              {
                icon: <UserPlus className="text-[#4B75B7]" size={24} />,
                title: "Create Profile",
                description: "Build your rental profile to showcase to landlords"
              },
              {
                icon: <MessageSquare className="text-[#4B75B7]" size={24} />,
                title: "Apply & Connect",
                description: "Submit applications and communicate with property managers"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: "How does Rentora's roommate matching work?",
                answer: "Our matching system uses your preferences, lifestyle, and habits to suggest compatible roommates. You can create or join roommate groups and communicate directly with potential matches."
              },
              {
                question: "Is Rentora only for students?",
                answer: "Yes, Rentora is currently designed specifically for students looking for off-campus housing near their universities."
              },
              {
                question: "How much does it cost to use Rentora?",
                answer: "Creating an account and browsing listings is free. There's a $35 application fee when you submit a rental application through our platform."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md">
                <summary className="px-6 py-4 cursor-pointer text-lg font-medium hover:text-[#4B75B7]">
                  {faq.question}
                </summary>
                <p className="px-6 py-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-[#4B75B7]/5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about Rentora? We're here to help you find your perfect student housing solution.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B75B7]"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B75B7]"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B75B7]"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#4B75B7] text-white rounded-lg hover:bg-[#4B75B7]/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <span className="text-2xl font-bold">Rentora</span>
            <p className="mt-2 text-gray-400">Making student housing simple.</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">© {new Date().getFullYear()} Rentora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;