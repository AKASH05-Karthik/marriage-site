import React, { useState } from 'react';
import { Calendar, MapPin, Star, Users, Wifi, Car, Music, Utensils, Building, Phone, Mail, Clock, LogOut } from 'lucide-react';
import HallBooking from './HallBooking';
import RoomBooking from './RoomBooking';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('halls');
  const [isLoading, setIsLoading] = useState(false);
  const { halls, rooms } = useBooking();
  const { user, logout } = useAuth();

  const features = [
    { icon: Calendar, title: "Easy Booking", description: "Book your venue in just a few clicks" },
    { icon: MapPin, title: "Prime Locations", description: "Premium venues in the heart of the city" },
    { icon: Star, title: "5-Star Service", description: "Exceptional service for your special day" },
    { icon: Users, title: "Expert Support", description: "Dedicated team to assist you" }
  ];

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    
    // Simulate loading for smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const scrollToVenues = (tab) => {
    handleTabChange(tab);
    setTimeout(() => {
      document.getElementById('venues').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Royal Venues</h1>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#home" className="text-gray-600 hover:text-primary-600 transition-colors cursor-pointer">Home</a>
              <a href="#venues" className="text-gray-600 hover:text-primary-600 transition-colors cursor-pointer">Venues</a>
              <a href="#services" className="text-gray-600 hover:text-primary-600 transition-colors cursor-pointer">Services</a>
              <a href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors cursor-pointer">Contact</a>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-purple-50 px-4 py-2 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{user.username.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="text-gray-700 font-semibold">Welcome, {user.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <a href="/admin" className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-semibold">Sign In</a>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-8 leading-tight">
              Your Dream
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent"> Wedding</span>
              <br />Awaits
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover premium marriage halls and luxury accommodations for your perfect celebration. 
              Book now and create memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => scrollToVenues('halls')}
                className="btn-primary text-lg px-8 py-4 group relative overflow-hidden transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Building className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200" />
                  Explore Venues
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                  </div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button 
                onClick={() => scrollToVenues('rooms')}
                className="btn-secondary text-lg px-8 py-4 group relative overflow-hidden transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span className="relative z-10 flex items-center justify-center group-hover:text-white transition-colors duration-300">
                  <Users className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200" />
                  View Rooms
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                  </div>
                </span>
                <div className="absolute inset-0 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Why Choose Royal Venues?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide exceptional venues and services to make your special day unforgettable
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-purple-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Our Services</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive wedding and event services to make your special day perfect
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Venue Booking</h3>
              <p className="text-gray-600 text-center leading-relaxed">Premium marriage halls and banquet spaces for your perfect celebration</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Catering Services</h3>
              <p className="text-gray-600 text-center leading-relaxed">Exquisite cuisine and professional catering for all your events</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Entertainment</h3>
              <p className="text-gray-600 text-center leading-relaxed">Professional sound systems, lighting, and entertainment arrangements</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Parking & Valet</h3>
              <p className="text-gray-600 text-center leading-relaxed">Ample parking space and professional valet services for your guests</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Event Planning</h3>
              <p className="text-gray-600 text-center leading-relaxed">Complete event planning and coordination services from start to finish</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Modern Amenities</h3>
              <p className="text-gray-600 text-center leading-relaxed">High-speed WiFi, air conditioning, and all modern facilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="venues" className="py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Book Your Perfect Venue</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Choose from our premium marriage halls or luxury rooms for your celebration
            </p>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-xl p-2 shadow-xl border border-gray-100 relative overflow-hidden">
                <div 
                  className={`absolute top-2 bottom-2 bg-primary-600 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
                    activeTab === 'halls' 
                      ? 'left-2 w-[calc(50%-0.25rem)]' 
                      : 'left-[calc(50%+0.25rem)] w-[calc(50%-0.25rem)]'
                  }`}
                ></div>
                <div className="flex">
                  <button
                    onClick={() => handleTabChange('halls')}
                    className={`relative z-10 px-10 py-4 rounded-lg font-semibold transition-all text-lg flex items-center group ${
                      activeTab === 'halls'
                        ? 'text-white'
                        : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    <Building className={`w-5 h-5 mr-2 transition-all duration-200 ${
                      activeTab === 'halls' ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    Marriage Halls
                  </button>
                  <button
                    onClick={() => handleTabChange('rooms')}
                    className={`relative z-10 px-10 py-4 rounded-lg font-semibold transition-all text-lg flex items-center group ${
                      activeTab === 'rooms'
                        ? 'text-white'
                        : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    <Users className={`w-5 h-5 mr-2 transition-all duration-200 ${
                      activeTab === 'rooms' ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    Rooms
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-fadeIn">
                {activeTab === 'halls' ? <HallBooking /> : <RoomBooking />}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to book your perfect venue? Contact us today and let's make your dream celebration a reality
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
                  <p className="text-gray-600 text-lg">+91 98765 43210</p>
                  <p className="text-gray-600">Available 24/7 for bookings</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600 text-lg">info@royalvenues.com</p>
                  <p className="text-gray-600">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Address</h3>
                  <p className="text-gray-600 text-lg">123 Wedding Street</p>
                  <p className="text-gray-600">Premium District, City - 400001</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Business Hours</h3>
                  <p className="text-gray-600 text-lg">Mon - Sun: 9:00 AM - 10:00 PM</p>
                  <p className="text-gray-600">Visit us for venue tours</p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      className="input-field"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Event Type</label>
                  <select className="input-field">
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="engagement">Engagement</option>
                    <option value="reception">Reception</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    className="input-field"
                    rows="4"
                    placeholder="Tell us about your event requirements..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <h3 className="text-2xl font-bold">Royal Venues</h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-base max-w-sm">
                Creating unforgettable moments with premium venues and exceptional service.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors text-lg">Home</a></li>
                <li><a href="#venues" className="hover:text-white transition-colors text-lg">Venues</a></li>
                <li><a href="#services" className="hover:text-white transition-colors text-lg">Services</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors text-lg">Contact</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                <li className="text-gray-400 text-base">Marriage Halls</li>
                <li className="text-gray-400 text-base">Room Booking</li>
                <li className="text-gray-400 text-base">Catering Services</li>
                <li className="text-gray-400 text-base">Event Planning</li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-base">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-base break-all">info@royalvenues.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-base">123 Wedding Street, City</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-base">&copy; 2024 Royal Venues. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
