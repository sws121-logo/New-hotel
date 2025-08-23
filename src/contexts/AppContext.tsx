import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface Room {
  id: string;
  name: string;
  type: 'AC' | 'Non-AC';
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  available: boolean;
  description: string;
}

export interface PartyHall {
  id: string;
  name: string;
  capacity: number;
  price: number;
  amenities: string[];
  images: string[];
  available: boolean;
  description: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  image?: string;
  date: string;
  roomType?: string;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomId?: string;
  hallId?: string;
  type: 'room' | 'hall';
  guests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentId?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

interface AppContextType {
  rooms: Room[];
  partyHalls: PartyHall[];
  reviews: Review[];
  bookings: Booking[];
  currentUser: User | null;
  isAuthenticated: boolean;
  updateRoomPrice: (roomId: string, price: number) => void;
  updateHallPrice: (hallId: string, price: number) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string, name: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const initialRooms: Room[] = [
  {
    id: '1',
    name: 'Deluxe AC Suite',
    type: 'AC',
    price: 3500,
    capacity: 2,
    amenities: ['Free WiFi', 'AC', 'TV', 'Mini Bar', 'Room Service', 'Balcony'],
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Luxurious AC suite with modern amenities and stunning city view.'
  },
  {
    id: '2',
    name: 'Standard AC Room',
    type: 'AC',
    price: 2500,
    capacity: 2,
    amenities: ['Free WiFi', 'AC', 'TV', 'Room Service'],
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6585759/pexels-photo-6585759.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Comfortable AC room perfect for business and leisure travelers.'
  },
  {
    id: '3',
    name: 'Economy Non-AC Room',
    type: 'Non-AC',
    price: 1500,
    capacity: 2,
    amenities: ['Free WiFi', 'Fan', 'TV', 'Attached Bathroom'],
    images: [
      'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Budget-friendly room with essential amenities for comfortable stay.'
  },
  {
    id: '4',
    name: 'Family Non-AC Suite',
    type: 'Non-AC',
    price: 2200,
    capacity: 4,
    amenities: ['Free WiFi', 'Fan', 'TV', 'Extra Bed', 'Attached Bathroom'],
    images: [
      'https://images.pexels.com/photos/2291599/pexels-photo-2291599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Spacious suite ideal for families with comfortable bedding for four guests.'
  }
];

const initialPartyHalls: PartyHall[] = [
  {
    id: '1',
    name: 'Grand Ballroom',
    capacity: 200,
    price: 25000,
    amenities: ['Sound System', 'Projector', 'Stage', 'AC', 'Catering Service', 'Decoration'],
    images: [
      'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Elegant ballroom perfect for weddings, conferences, and grand celebrations.'
  },
  {
    id: '2',
    name: 'Crystal Hall',
    capacity: 100,
    price: 15000,
    amenities: ['Sound System', 'AC', 'Stage', 'Lighting', 'Catering Service'],
    images: [
      'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Mid-size hall ideal for corporate events, birthday parties, and family gatherings.'
  },
  {
    id: '3',
    name: 'Garden Pavilion',
    capacity: 150,
    price: 18000,
    amenities: ['Open Air', 'Sound System', 'Garden Setting', 'Lighting', 'Catering Service'],
    images: [
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Beautiful outdoor pavilion surrounded by lush gardens, perfect for intimate celebrations.'
  }
];

const initialReviews: Review[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Exceptional service and beautiful rooms! The AC suite was spotless and the staff was incredibly helpful.',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-15',
    roomType: 'Deluxe AC Suite'
  },
  {
    id: '2',
    customerName: 'Mike Chen',
    rating: 4,
    comment: 'Great value for money. The party hall was perfect for our corporate event.',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-20',
    roomType: 'Crystal Hall'
  },
  {
    id: '3',
    customerName: 'Emily Davis',
    rating: 5,
    comment: 'Our wedding at the Grand Ballroom was magical! Everything was perfectly arranged.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-25',
    roomType: 'Grand Ballroom'
  },
  {
    id: '4',
    customerName: 'David Wilson',
    rating: 4,
    comment: 'Clean, comfortable, and affordable. The non-AC room was perfect for our budget stay.',
    date: '2024-02-01',
    roomType: 'Economy Non-AC Room'
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [partyHalls, setPartyHalls] = useState<PartyHall[]>(initialPartyHalls);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock admin credentials
  const adminCredentials = {
    email: 'admin@hotelinfinity.com',
    password: 'admin123',
    name: 'Admin User'
  };

  useEffect(() => {
    // Generate some mock bookings for demonstration
    const mockBookings: Booking[] = [
      {
        id: '1',
        customerName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        checkIn: '2024-01-15',
        checkOut: '2024-01-17',
        roomId: '1',
        type: 'room',
        guests: 2,
        totalAmount: 7000,
        status: 'confirmed',
        paymentId: 'pay_123456789',
        createdAt: '2024-01-10T10:00:00Z'
      },
      {
        id: '2',
        customerName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1234567891',
        checkIn: '2024-01-20',
        checkOut: '2024-01-20',
        hallId: '1',
        type: 'hall',
        guests: 150,
        totalAmount: 25000,
        status: 'completed',
        paymentId: 'pay_123456790',
        createdAt: '2024-01-15T14:30:00Z'
      }
    ];
    setBookings(mockBookings);
  }, []);

  const updateRoomPrice = (roomId: string, price: number) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, price } : room
    ));
  };

  const updateHallPrice = (hallId: string, price: number) => {
    setPartyHalls(prev => prev.map(hall => 
      hall.id === hallId ? { ...hall, price } : hall
    ));
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    ));
  };

  const login = (email: string, password: string): boolean => {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      const user: User = {
        id: '1',
        email: adminCredentials.email,
        name: adminCredentials.name,
        role: 'admin'
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const register = (email: string, password: string, name: string): boolean => {
    // For demo purposes, only allow admin registration
    if (email === adminCredentials.email) {
      return login(email, password);
    }
    return false;
  };

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const value: AppContextType = {
    rooms,
    partyHalls,
    reviews,
    bookings,
    currentUser,
    isAuthenticated,
    updateRoomPrice,
    updateHallPrice,
    addReview,
    addBooking,
    updateBookingStatus,
    login,
    logout,
    register
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};