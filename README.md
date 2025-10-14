# Royal Venues - Marriage Hall & Room Booking Platform

A modern, responsive web application for booking marriage halls and rooms with integrated payment system and admin dashboard.

## Features

### Frontend (Customer-facing)
- **Responsive Landing Page** with elegant design
- **Dual Booking System**: Marriage Halls and Rooms in separate tabs
- **Interactive Booking Forms** with validation
- **Payment Integration**: Credit/Debit Card and UPI payments
- **Real-time Availability** checking
- **Mobile-first Design** with Tailwind CSS

### Admin Dashboard
- **Comprehensive Dashboard** with analytics
- **Booking Management**: View, approve, and manage all bookings
- **Venue Management**: Manage halls and rooms
- **Customer Management**: Track customer data and history
- **Real-time Notifications** for new bookings
- **Revenue Tracking** and statistics

## Tech Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Routing**: React Router DOM 6
- **State Management**: React Context API
- **Storage**: Local Storage for persistence

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hall
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminDashboard.js
│   │   ├── Dashboard.js
│   │   ├── BookingManagement.js
│   │   ├── VenueManagement.js
│   │   └── CustomerManagement.js
│   ├── LandingPage.js
│   ├── HallBooking.js
│   ├── RoomBooking.js
│   └── PaymentModal.js
├── context/
│   └── BookingContext.js
├── App.js
├── index.js
└── index.css
```

## Key Features Explained

### Booking System
- **Marriage Halls**: Event-based booking with date, time, and guest count
- **Rooms**: Stay-based booking with check-in/check-out dates
- **Dynamic Pricing**: Automatic calculation with service charges
- **Form Validation**: Comprehensive validation for all inputs

### Payment System
- **Multiple Payment Methods**: Card payments and UPI
- **Secure Processing**: Simulated payment gateway
- **Payment Confirmation**: Instant booking confirmation
- **Receipt Generation**: Detailed booking summaries

### Admin Features
- **Real-time Dashboard**: Live statistics and recent activity
- **Booking Management**: Approve/reject bookings with status tracking
- **Customer Insights**: Customer history and spending analytics
- **Venue Control**: Manage venue details and availability

## Responsive Design

The application is fully responsive and works seamlessly on:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## Color Scheme

- **Primary**: Pink/Purple gradient (#ec4899 to #be185d)
- **Secondary**: Gold accents (#f59e0b)
- **Background**: Soft gradients and white cards
- **Text**: Gray scale for optimal readability

## Future Enhancements

- **Real Payment Gateway** integration (Razorpay/Stripe)
- **Email Notifications** for bookings
- **SMS Integration** for confirmations
- **Advanced Analytics** with charts
- **Inventory Management** for venue availability
- **Review System** for venues
- **Multi-language Support**

## Admin Access

To access the admin dashboard:
1. Click "Admin" in the main navigation
2. Or navigate directly to `/admin`

## Support

For support and queries, contact:
- Email: info@royalvenues.com
- Phone: +91 98765 43210

## License

This project is licensed under the MIT License.
