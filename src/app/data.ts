import { Bike, MapPin, Clock, BarChart3, Users, Settings, LogOut, CheckCircle2, AlertCircle, LayoutDashboard, History, Filter } from "lucide-react";

export interface BikeData {
  id: string;
  bikeNumber: string;
  stationName: string;
  pricePerHour: number;
  status: 'Available' | 'Rented' | 'Maintenance';
  image: string;
}

export interface RentalData {
  id: string;
  bikeNumber: string;
  startTime: string;
  endTime?: string;
  duration?: string;
  totalAmount?: number;
  status: 'Active' | 'Completed' | 'Overdue';
  userName?: string;
}

export interface StationData {
  id: string;
  name: string;
  location: string;
  totalBikes: number;
  availableBikes: number;
}

export const MOCK_BIKES: BikeData[] = [
  { id: '1', bikeNumber: 'BK-001', stationName: 'Central Park', pricePerHour: 5.0, status: 'Available', image: 'https://images.unsplash.com/photo-1678033380946-257621c34923?q=80&w=400' },
  { id: '2', bikeNumber: 'BK-002', stationName: 'Downtown Mall', pricePerHour: 6.5, status: 'Rented', image: 'https://images.unsplash.com/photo-1532298229144-0ee0c57515c5?q=80&w=400' },
  { id: '3', bikeNumber: 'BK-003', stationName: 'City Library', pricePerHour: 4.5, status: 'Available', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400' },
  { id: '4', bikeNumber: 'BK-004', stationName: 'Tech Hub', pricePerHour: 7.0, status: 'Available', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77891?q=80&w=400' },
  { id: '5', bikeNumber: 'BK-005', stationName: 'Green Plaza', pricePerHour: 5.0, status: 'Maintenance', image: 'https://images.unsplash.com/photo-1593133675033-5414bb15bc1d?q=80&w=400' },
];

export const MOCK_RENTALS: RentalData[] = [
  { id: 'R1', bikeNumber: 'BK-002', startTime: '2026-01-31 10:00 AM', status: 'Active', userName: 'John Doe' },
  { id: 'R2', bikeNumber: 'BK-006', startTime: '2026-01-30 02:00 PM', endTime: '2026-01-30 04:30 PM', duration: '2.5h', totalAmount: 12.5, status: 'Completed', userName: 'Jane Smith' },
  { id: 'R3', bikeNumber: 'BK-008', startTime: '2026-01-29 09:00 AM', endTime: '2026-01-29 11:00 AM', duration: '2h', totalAmount: 10.0, status: 'Completed', userName: 'Alice Wang' },
];

export const MOCK_STATIONS: StationData[] = [
  { id: 'S1', name: 'Central Park', location: '5th Ave & 59th St', totalBikes: 20, availableBikes: 12 },
  { id: 'S2', name: 'Downtown Mall', location: 'Main St & 4th Ave', totalBikes: 15, availableBikes: 5 },
  { id: 'S3', name: 'City Library', location: 'Library Ln', totalBikes: 10, availableBikes: 8 },
];
