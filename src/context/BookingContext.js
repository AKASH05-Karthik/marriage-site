import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BookingContext = createContext();

const initialState = {
  bookings: [],
  halls: [
    {
      id: 1,
      name: "Royal Grand Hall",
      capacity: 500,
      price: 50000,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Sound System", "Lighting", "Catering", "Parking"],
      description: "Luxurious hall perfect for grand wedding celebrations"
    },
    {
      id: 2,
      name: "Crystal Banquet",
      capacity: 300,
      price: 35000,
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Sound System", "Lighting", "Parking"],
      description: "Elegant banquet hall for intimate celebrations"
    },
    {
      id: 3,
      name: "Golden Palace",
      capacity: 800,
      price: 75000,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Sound System", "Lighting", "Catering", "Parking", "Decoration"],
      description: "Premium venue for the most special occasions"
    }
  ],
  rooms: [
    {
      id: 1,
      name: "Deluxe Suite",
      type: "Suite",
      price: 5000,
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "WiFi", "TV", "Mini Bar", "Room Service"],
      description: "Spacious suite with premium amenities"
    },
    {
      id: 2,
      name: "Premium Room",
      type: "Premium",
      price: 3500,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "WiFi", "TV", "Room Service"],
      description: "Comfortable room with modern facilities"
    },
    {
      id: 3,
      name: "Standard Room",
      type: "Standard",
      price: 2500,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "WiFi", "TV"],
      description: "Cozy room with essential amenities"
    }
  ],
  notifications: []
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOKING':
      const newBooking = {
        ...action.payload,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      return {
        ...state,
        bookings: [...state.bookings, newBooking],
        notifications: [...state.notifications, {
          id: Date.now(),
          message: `New ${action.payload.type} booking received from ${action.payload.customerName}`,
          timestamp: new Date().toISOString(),
          read: false
        }]
      };
    
    case 'UPDATE_BOOKING_STATUS':
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id
            ? { ...booking, status: action.payload.status }
            : booking
        )
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload.id
            ? { ...notification, read: true }
            : notification
        )
      };
    
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  useEffect(() => {
    const savedData = localStorage.getItem('bookingData');
    if (savedData) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(state));
  }, [state]);

  const addBooking = (bookingData) => {
    dispatch({ type: 'ADD_BOOKING', payload: bookingData });
  };

  const updateBookingStatus = (id, status) => {
    dispatch({ type: 'UPDATE_BOOKING_STATUS', payload: { id, status } });
  };

  const markNotificationRead = (id) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: { id } });
  };

  return (
    <BookingContext.Provider value={{
      ...state,
      addBooking,
      updateBookingStatus,
      markNotificationRead
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export default BookingProvider;
