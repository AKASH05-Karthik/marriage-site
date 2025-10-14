import React, { useState } from 'react';
import { CreditCard, Lock, Check, X } from 'lucide-react';

const PaymentModal = ({ amount, onSuccess, onClose, bookingDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardDetails({ ...cardDetails, cardNumber: formatted });
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setCardDetails({ ...cardDetails, expiryDate: formatted });
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 3) {
      setCardDetails({ ...cardDetails, cvv: value });
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 3000);
  };

  const handleUPIPayment = () => {
    setProcessing(true);
    // Simulate UPI payment
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Booking Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Type:</span>
                <span>{bookingDetails.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Venue/Room:</span>
                <span>{bookingDetails.name}</span>
              </div>
              {bookingDetails.date && (
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{bookingDetails.date}</span>
                </div>
              )}
              {bookingDetails.checkIn && (
                <>
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{bookingDetails.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{bookingDetails.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nights:</span>
                    <span>{bookingDetails.nights}</span>
                  </div>
                </>
              )}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-bold">
              <span>Total Amount:</span>
              <span className="text-primary-600">{formatPrice(amount)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary-600"
                />
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary-600"
                />
                <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-purple-600 rounded"></div>
                <span>UPI Payment</span>
              </label>
            </div>
          </div>

          {/* Payment Forms */}
          {paymentMethod === 'card' ? (
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  required
                  value={cardDetails.cardholderName}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                  className="input-field"
                  placeholder="Enter cardholder name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  required
                  value={cardDetails.cardNumber}
                  onChange={handleCardNumberChange}
                  className="input-field"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={cardDetails.expiryDate}
                    onChange={handleExpiryChange}
                    className="input-field"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    required
                    value={cardDetails.cvv}
                    onChange={handleCvvChange}
                    className="input-field"
                    placeholder="123"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Pay {formatPrice(amount)}</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">₹</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Scan QR code or use UPI ID to pay
                </p>
                <div className="bg-gray-100 p-3 rounded-lg mb-4">
                  <p className="font-mono text-sm">royalvenues@upi</p>
                </div>
                <p className="text-2xl font-bold text-primary-600 mb-4">
                  {formatPrice(amount)}
                </p>
              </div>

              <button
                onClick={handleUPIPayment}
                disabled={processing}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Confirm UPI Payment</span>
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
