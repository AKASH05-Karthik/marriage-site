import React, { useState } from 'react';
import { Users, MapPin, Star, Calendar, CreditCard, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import PaymentModal from './PaymentModal';

const HallBooking = () => {
  const { halls, addBooking } = useBooking();
  const [selectedHall, setSelectedHall] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState({
    customerName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    specialRequests: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedHall) return;

    const booking = {
      ...bookingData,
      type: 'hall',
      hallId: selectedHall.id,
      hallName: selectedHall.name,
      totalAmount: selectedHall.price,
      guestCount: parseInt(bookingData.guestCount)
    };

    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    const booking = {
      ...bookingData,
      type: 'hall',
      hallId: selectedHall.id,
      hallName: selectedHall.name,
      totalAmount: selectedHall.price,
      guestCount: parseInt(bookingData.guestCount),
      paymentStatus: 'completed'
    };

    addBooking(booking);
    setShowPayment(false);
    setShowBookingForm(false);
    setSelectedHall(null);
    setBookingData({
      customerName: '',
      email: '',
      phone: '',
      eventDate: '',
      eventTime: '',
      guestCount: '',
      specialRequests: ''
    });
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <div>
      {!showBookingForm ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {halls.map((hall) => (
            <div key={hall.id} className="card overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative">
                <img 
                  src={hall.image} 
                  alt={hall.name}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">4.8</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{hall.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{hall.description}</p>
                
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="w-5 h-5" />
                    <span className="text-sm font-medium">{hall.capacity} guests</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm font-medium">Prime Location</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {hall.amenities.map((amenity, index) => (
                      <span 
                        key={index}
                        className="bg-primary-100 text-primary-700 px-3 py-2 rounded-full text-sm font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-3xl font-bold text-primary-600">
                      {formatPrice(hall.price)}
                    </span>
                    <span className="text-gray-600 ml-2 text-lg">/day</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedHall(hall);
                    setShowBookingForm(true);
                  }}
                  className="w-full btn-primary text-lg py-4"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="card p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Book {selectedHall?.name}</h2>
              <button
                onClick={() => {
                  setShowBookingForm(false);
                  setSelectedHall(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedHall?.name}</h3>
                  <p className="text-gray-600">Capacity: {selectedHall?.capacity} guests</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">
                    {formatPrice(selectedHall?.price)}
                  </p>
                  <p className="text-gray-600">per day</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.customerName}
                    onChange={(e) => setBookingData({...bookingData, customerName: e.target.value})}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    className="input-field"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Expected Guests *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={selectedHall?.capacity}
                    value={bookingData.guestCount}
                    onChange={(e) => setBookingData({...bookingData, guestCount: e.target.value})}
                    className="input-field"
                    placeholder="Number of guests"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingData.eventDate}
                    onChange={(e) => setBookingData({...bookingData, eventDate: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Event Time *
                  </label>
                  <select
                    required
                    value={bookingData.eventTime}
                    onChange={(e) => setBookingData({...bookingData, eventTime: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (6 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                    <option value="evening">Evening (6 PM - 12 AM)</option>
                    <option value="fullday">Full Day (6 AM - 12 AM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Special Requests
                </label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                  className="input-field"
                  rows="4"
                  placeholder="Any special requirements or requests..."
                ></textarea>
              </div>

              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Booking Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Hall Rental</span>
                    <span>{formatPrice(selectedHall?.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Charge</span>
                    <span>{formatPrice(selectedHall?.price * 0.1)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-primary-600">
                      {formatPrice(selectedHall?.price * 1.1)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>Proceed to Payment</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {showPayment && (
        <PaymentModal
          amount={selectedHall?.price * 1.1}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
          bookingDetails={{
            type: 'Marriage Hall',
            name: selectedHall?.name,
            date: bookingData.eventDate,
            time: bookingData.eventTime
          }}
        />
      )}
    </div>
  );
};

export default HallBooking;
