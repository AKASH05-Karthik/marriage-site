import React, { useState } from 'react';
import { Bed, Wifi, Car, Star, Calendar, CreditCard } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import PaymentModal from './PaymentModal';

const RoomBooking = () => {
  const { rooms, addBooking } = useBooking();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState({
    customerName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    specialRequests: ''
  });

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getTotalAmount = () => {
    const nights = calculateNights();
    const baseAmount = selectedRoom?.price * nights;
    const serviceCharge = baseAmount * 0.1;
    return baseAmount + serviceCharge;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedRoom) return;

    const nights = calculateNights();
    if (nights <= 0) {
      alert('Please select valid check-in and check-out dates');
      return;
    }

    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    const nights = calculateNights();
    const booking = {
      ...bookingData,
      type: 'room',
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      nights: nights,
      totalAmount: getTotalAmount(),
      guests: parseInt(bookingData.guests),
      paymentStatus: 'completed'
    };

    addBooking(booking);
    setShowPayment(false);
    setShowBookingForm(false);
    setSelectedRoom(null);
    setBookingData({
      customerName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: '1',
      specialRequests: ''
    });
    alert('Room booking confirmed! You will receive a confirmation email shortly.');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMinCheckOut = () => {
    if (!bookingData.checkIn) return getMinDate();
    const checkIn = new Date(bookingData.checkIn);
    checkIn.setDate(checkIn.getDate() + 1);
    return checkIn.toISOString().split('T')[0];
  };

  return (
    <div>
      {!showBookingForm ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {rooms.map((room) => (
            <div key={room.id} className="card overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">4.7</span>
                  </div>
                </div>
                <div className="absolute top-6 left-6 bg-primary-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-semibold">{room.type}</span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{room.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{room.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-1"
                      >
                        {amenity === 'WiFi' && <Wifi className="w-3 h-3" />}
                        {amenity === 'Parking' && <Car className="w-3 h-3" />}
                        <span>{amenity}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-3xl font-bold text-primary-600">
                      {formatPrice(room.price)}
                    </span>
                    <span className="text-gray-600 ml-2 text-lg">/night</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Bed className="w-5 h-5" />
                    <span className="text-sm font-medium">1-2 guests</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedRoom(room);
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
              <h2 className="text-3xl font-bold text-gray-800">Book {selectedRoom?.name}</h2>
              <button
                onClick={() => {
                  setShowBookingForm(false);
                  setSelectedRoom(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedRoom?.name}</h3>
                  <p className="text-gray-600">{selectedRoom?.type} Room</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">
                    {formatPrice(selectedRoom?.price)}
                  </p>
                  <p className="text-gray-600">per night</p>
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
                    Number of Guests *
                  </label>
                  <select
                    required
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                    className="input-field"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={getMinDate()}
                    value={bookingData.checkIn}
                    onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={getMinCheckOut()}
                    value={bookingData.checkOut}
                    onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                    className="input-field"
                  />
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

              {bookingData.checkIn && bookingData.checkOut && calculateNights() > 0 && (
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Booking Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{calculateNights()} nights × {formatPrice(selectedRoom?.price)}</span>
                      <span>{formatPrice(selectedRoom?.price * calculateNights())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Charge (10%)</span>
                      <span>{formatPrice(selectedRoom?.price * calculateNights() * 0.1)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-primary-600">
                        {formatPrice(getTotalAmount())}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={calculateNights() <= 0}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
          amount={getTotalAmount()}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
          bookingDetails={{
            type: 'Room',
            name: selectedRoom?.name,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
            nights: calculateNights()
          }}
        />
      )}
    </div>
  );
};

export default RoomBooking;
