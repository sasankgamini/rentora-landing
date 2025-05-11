import React, { useState } from 'react';
import {
  Building2,
  Users,
  MousePointerClick,
  Menu,
  X,
  Home,
  UserPlus,
  MessageSquare,
} from 'lucide-react';

interface FormStatus {
  type: 'success' | 'error';
  message: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Waitlist form state
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistUserType, setWaitlistUserType] = useState('');
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] = useState(false);
  const [waitlistStatus, setWaitlistStatus] = useState<FormStatus | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactStatus, setContactStatus] = useState<FormStatus | null>(null);

  const WAITLIST_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbyaiqr_G_qMKjl6n994S9No1ibvkVwqhd-G9ZH4B71VYzOP_-kZham8exZCUqM4y5A/exec';
  const CONTACT_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbwYzW7Bd7G7r_3wkNW070GhEQ4_Rp8thd0kUN_WsYEatTeb8fy4JOnxQz0WSmoKZMfm5Q/exec';

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsWaitlistSubmitting(true);
    setWaitlistStatus(null);
    
    try {
      // Validate inputs
      if (!waitlistName.trim() || !waitlistEmail.trim()) {
        throw new Error('Name and email are required');
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(waitlistEmail)) {
        throw new Error('Please enter a valid email address');
      }
      
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: waitlistName, 
          email: waitlistEmail, 
          role: waitlistUserType 
        }),
      });
      
      // Since no-cors doesn't return useful status, we assume success here
      setWaitlistStatus({
        type: 'success',
        message: 'Thanks for joining our waitlist! We\'ll be in touch soon.',
      });
      
      // Clear form on success
      setWaitlistName('');
      setWaitlistEmail('');
      setWaitlistUserType('');
      
    } catch (err) {
      console.error('Waitlist submission error:', err);
      setWaitlistStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsWaitlistSubmitting(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitting(true);
    setContactStatus(null);
    try {
      const formData = new FormData();
      formData.append('name', contactName);
      formData.append('email', contactEmail);
      formData.append('message', contactMessage);

      await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      setContactStatus({
        type: 'success',
        message: "Thank you for your message! We'll get back to you soon.",
      });
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    } catch (err) {
      console.error(err);
      setContactStatus({
        type: 'error',
        message: 'Something went wrong sending your message.',
      });
    } finally {
      setIsContactSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-[#4B75B7]">Rentora</div>
            <div className="hidden md:flex space-x-8">
              {['Owners', 'Students', 'How It Works', 'FAQ', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(/ /g, '-'))
                  }
                  className="text-gray-600 hover:text-[#4B75B7] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-[#4B75B7]"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Owners', 'Students', 'How It Works', 'FAQ', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(/ /g, '-'))
                  }
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-[#4B75B7] hover:bg-gray-50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero / Waitlist */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#4B75B7]/10 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Student Housing Made Social
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find your perfect off-campus housing, connect with friends, and
            apply with just one click.
          </p>
          <form
            onSubmit={handleWaitlistSubmit}
            className="max-w-md mx-auto flex flex-col gap-3"
          >
            <input
              type="text"
              value={waitlistName}
              onChange={(e) => setWaitlistName(e.target.value)}
              placeholder="Your Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B75B7]"
              required
              disabled={isWaitlistSubmitting}
            />
            <input
              type="email"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              placeholder="School or Work Email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B75B7]"
              required
              disabled={isWaitlistSubmitting}
            />
            <select
              value={waitlistUserType}
              onChange={(e) => setWaitlistUserType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B75B7] bg-white text-gray-400"
              required
              disabled={isWaitlistSubmitting}
            >
              <option value="">Student or Landlord</option>
              <option value="Student">Student</option>
              <option value="Landlord">Landlord</option>
            </select>
            <button
              type="submit"
              disabled={isWaitlistSubmitting}
              className="px-6 py-2 bg-[#4B75B7] text-white rounded-lg hover:bg-[#4B75B7]/90 transition-colors disabled:bg-gray-400 flex items-center justify-center"
            >
              {isWaitlistSubmitting ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Join Waitlist'
              )}
            </button>
            {waitlistStatus && (
              <div
                className={`p-3 rounded-lg mt-2 ${
                  waitlistStatus.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {waitlistStatus.message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Owners Section */}
      <section id="owners" className="py-20 px-4 bg-gradient-to-b from-[#4B75B7]/5 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            For Property Owners
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-[#4B75B7]/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-[#4B75B7]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Tenants</h3>
              <p className="text-gray-600">
                Access a pool of pre-verified student tenants with complete profiles and academic verification.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-[#4B75B7]/10 rounded-lg flex items-center justify-center mb-4">
                <MousePointerClick className="text-[#4B75B7]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Streamlined Process</h3>
              <p className="text-gray-600">
                Manage applications, view tenant history, and handle lease agreements all in one platform.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-[#4B75B7]/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="text-[#4B75B7]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Property Visibility</h3>
              <p className="text-gray-600">
                Get your properties in front of the right students with targeted campus-area listings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Students Section */}
      <section id="students" className="py-20 px-4 bg-gradient-to-b from-white to-[#4B75B7]/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            For Students
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-[#4B75B7]/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="text-[#4B75B7]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Leasing</h3>
              <p className="text-gray-600">
                Browse verified listings and use your social network to connect
                directly with other students. Seamlessly inherit leases or
                sublease from other students in your area.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-[#4B75B7]/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-[#4B75B7]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Building</h3>
              <p className="text-gray-600">
                Create neighborhoods by finding compatible roommates and
                students in your area. Our matching system helps connect you to
                your next best friend.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-[#4B75B7]/10 rounded-lg flex items-center justify-center mb-4">
                <MousePointerClick className="text-[#4B75B7]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                One-Click Applications
              </h3>
              <p className="text-gray-600">
                We help generate all your application paperwork, allowing you
                to apply to multiple properties with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-[#4B75B7]/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="text-[#4B75B7]" size={24} />,
                title: 'Find Friends',
                description:
                  "Connect Rentora to your social network to see friends' housing status and create a new digital neighborhood",
              },
              {
                icon: <Home className="text-[#4B75B7]" size={24} />,
                title: 'Browse Listings',
                description:
                  'Search verified student housing and subleases near your campus and friends',
              },
              {
                icon: <UserPlus className="text-[#4B75B7]" size={24} />,
                title: 'Create Profile',
                description:
                  'Build your rental profile to auto-generate application forms and to showcase to landlords',
              },
              {
                icon: <MessageSquare className="text-[#4B75B7]" size={24} />,
                title: 'Apply & Connect',
                description:
                  'Submit applications with one single click and communicate with property managers',
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
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

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "How does Rentora's roommate matching work?",
                answer:
                  'Our matching system uses your preferences, lifestyle, and habits to suggest compatible roommates. You can create or join roommate groups and communicate directly with potential matches.',
              },
              {
                question: 'Is Rentora only for students?',
                answer:
                  'Yes, Rentora is currently designed specifically for students looking for off‑campus housing near their universities.',
              },
              {
                question: 'How much does it cost to use Rentora?',
                answer:
                  "Creating an account and browsing listings is free. There's a $35 application fee when you submit a rental application through our platform.",
              },
            ].map((faq, idx) => (
              <details key={idx} className="bg-white rounded-lg shadow-md">
                <summary className="px-6 py-4 cursor-pointer text-lg font-medium hover:text-[#4B75B7]">
                  {faq.question}
                </summary>
                <p className="px-6 py-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 bg-[#4B75B7]/5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about Rentora? We're here to help you find your
            perfect student housing solution.
          </p>
          <form
            onSubmit={handleContactSubmit}
            className="space-y-4 max-w-md mx-auto"
          >
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B75B7]"
              required
            />
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B75B7]"
              required
            />
            <textarea
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B75B7]"
              required
            />
            <button
              type="submit"
              disabled={isContactSubmitting}
              className="w-full px-6 py-3 bg-[#4B75B7] text-white rounded-lg hover:bg-[#4B75B7]/90 transition-colors disabled:bg-gray-400 flex items-center justify-center"
            >
              {isContactSubmitting ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Send Message'
              )}
            </button>
            {contactStatus && (
              <div
                className={`p-3 rounded-lg mt-2 ${
                  contactStatus.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {contactStatus.message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <span className="text-2xl font-bold">Rentora</span>
            <p className="mt-2 text-gray-400">Making student housing social.</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Rentora. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;