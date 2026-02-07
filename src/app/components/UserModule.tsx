import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Bike, 
  History, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  User,
  Settings,
  Shield,
  Phone,
  Calendar,
  Activity,
  LogOut,
  Bell,
  Mail,
  Fingerprint
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { MOCK_BIKES, MOCK_RENTALS, BikeData, RentalData } from '@/app/data';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { EmptyState, BikeCardSkeleton, StatCardSkeleton } from '@/app/components/CommonComponents';

export const UserModule = ({ initialTab = 'dashboard' }: { initialTab?: 'dashboard' | 'available' | 'rentals' | 'profile' }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'available' | 'rentals' | 'profile'>(initialTab);
  const [selectedBike, setSelectedBike] = useState<BikeData | null>(null);
  const [showRentModal, setShowRentModal] = useState(false);
  const [showReturnConfirm, setShowReturnConfirm] = useState<RentalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Profile Form States
  const [profileName, setProfileName] = useState('John Doe');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 123-4567');

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleRent = (bike: BikeData) => {
    setSelectedBike(bike);
    setShowRentModal(true);
  };

  const confirmRent = () => {
    toast.success(`Successfully rented bike ${selectedBike?.bikeNumber}!`);
    setShowRentModal(false);
    setSelectedBike(null);
    setActiveTab('rentals');
  };

  const handleReturn = (rental: RentalData) => {
    setShowReturnConfirm(rental);
  };

  const confirmReturn = () => {
    toast.success(`Bike ${showReturnConfirm?.bikeNumber} returned successfully. Total bill: $12.50`);
    setShowReturnConfirm(null);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile information updated successfully!");
  };

  const NavItems = () => (
    <>
      <button
        onClick={() => { setActiveTab('dashboard'); if (window.innerWidth < 1024) setSidebarOpen(false); }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="font-semibold">Dashboard</span>
      </button>
      <button
        onClick={() => { setActiveTab('available'); if (window.innerWidth < 1024) setSidebarOpen(false); }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'available' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}
      >
        <Bike className="w-5 h-5" />
        <span className="font-semibold">Available Bikes</span>
      </button>
      <button
        onClick={() => { setActiveTab('rentals'); if (window.innerWidth < 1024) setSidebarOpen(false); }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'rentals' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}
      >
        <History className="w-5 h-5" />
        <span className="font-semibold">My Rentals</span>
      </button>
      <button
        onClick={() => { setActiveTab('profile'); if (window.innerWidth < 1024) setSidebarOpen(false); }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}
      >
        <User className="w-5 h-5" />
        <span className="font-semibold">My Profile</span>
      </button>
    </>
  );

  const Sidebar = () => (
    <aside className={`
      fixed lg:sticky top-16 z-40 bg-white border-r transition-all duration-300 h-[calc(100vh-64px)]
      ${sidebarOpen ? 'w-72 translate-x-0' : 'w-0 lg:w-20 -translate-x-full lg:translate-x-0'}
    `}>
      <div className={`p-4 flex flex-col gap-2 ${!sidebarOpen && 'lg:items-center'}`}>
        {sidebarOpen ? <NavItems /> : (
          <div className="flex flex-col gap-4 items-center">
            <LayoutDashboard onClick={() => setActiveTab('dashboard')} className={`w-6 h-6 cursor-pointer ${activeTab === 'dashboard' ? 'text-primary' : 'text-muted-foreground'}`} />
            <Bike onClick={() => setActiveTab('available')} className={`w-6 h-6 cursor-pointer ${activeTab === 'available' ? 'text-primary' : 'text-muted-foreground'}`} />
            <History onClick={() => setActiveTab('rentals')} className={`w-6 h-6 cursor-pointer ${activeTab === 'rentals' ? 'text-primary' : 'text-muted-foreground'}`} />
            <User onClick={() => setActiveTab('profile')} className={`w-6 h-6 cursor-pointer ${activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
        )}
      </div>
    </aside>
  );

  const Dashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Welcome back, {profileName.split(' ')[0]}!</h1>
          <p className="text-muted-foreground mt-2 text-lg">Ready for your next ride? Here's what's happening today.</p>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-xl border shadow-sm hover:bg-slate-50 transition-colors lg:hidden"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Rest of Dashboard code remains unchanged... */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <Card className="border-none shadow-sm bg-primary/5 hover:shadow-md transition-shadow cursor-default">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">Active Rental</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white rounded-2xl shadow-sm ring-1 ring-slate-100">
                    <Bike className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900">BK-002</div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 font-medium">
                      <Clock className="w-3 h-3" /> Since 10:00 AM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-emerald-50 hover:shadow-md transition-shadow cursor-default">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-emerald-700">Total Rentals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white rounded-2xl shadow-sm ring-1 ring-emerald-100">
                    <History className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900">42</div>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Across all time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-blue-50 hover:shadow-md transition-shadow cursor-default">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-blue-700">Total Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white rounded-2xl shadow-sm ring-1 ring-blue-100">
                    <span className="text-2xl font-black text-blue-600">$</span>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900">$284.50</div>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Billed this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Popular Stations</h2>
          <Button variant="ghost" className="text-primary hover:text-primary/80 font-bold">View Map</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Central Park', 'Downtown Mall', 'Tech Hub', 'City Library'].map((station) => (
            <Card key={station} className="hover:border-primary border-transparent transition-all cursor-pointer group shadow-sm bg-white">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700">{station}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const AvailableBikes = () => {
    const availableBikes = MOCK_BIKES.filter(b => b.status === 'Available');
    
    return (
      <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Available Bikes</h1>
            <p className="text-muted-foreground mt-2 text-lg">Find a ride near you and start exploring.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search bikes..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-full md:w-64"
              />
            </div>
            <Button variant="outline" className="rounded-xl flex gap-2 font-bold px-4">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <BikeCardSkeleton key={i} />)}
          </div>
        ) : availableBikes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {MOCK_BIKES.map((bike) => (
              <Card key={bike.id} className="overflow-hidden border-transparent shadow-md hover:shadow-xl transition-all group bg-white ring-1 ring-slate-100">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={bike.image} 
                    alt={`Bike ${bike.bikeNumber}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`px-3 py-1.5 font-bold rounded-lg border-none shadow-sm ${bike.status === 'Available' ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'}`}>
                      {bike.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-sm font-black text-primary shadow-sm border border-slate-100">
                      ${bike.pricePerHour}/hr
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-xl text-slate-900 tracking-tight">{bike.bikeNumber}</h3>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-2 font-medium">
                        <MapPin className="w-4 h-4 text-primary/60" />
                        {bike.stationName}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button 
                    className={`w-full h-12 rounded-2xl font-bold text-base transition-all ${bike.status === 'Available' ? 'shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`} 
                    disabled={bike.status !== 'Available'}
                    onClick={() => handleRent(bike)}
                  >
                    {bike.status === 'Available' ? 'Rent Now' : 'Currently Rented'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Bike} 
            title="No Bikes Available" 
            description="Looks like all bikes are currently in use. Check back again soon or explore other stations!"
            actionLabel="View Other Stations"
            onAction={() => setActiveTab('dashboard')}
          />
        )}
      </div>
    );
  };

  const MyRentals = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My Rentals</h1>
        <p className="text-muted-foreground mt-2 text-lg">Track your past and present rides.</p>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : MOCK_RENTALS.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden ring-1 ring-slate-100">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                  <TableHead className="font-bold py-5 pl-8">Bike Number</TableHead>
                  <TableHead className="font-bold py-5">Start Time</TableHead>
                  <TableHead className="font-bold py-5">End Time</TableHead>
                  <TableHead className="font-bold py-5">Duration</TableHead>
                  <TableHead className="font-bold py-5">Total Amount</TableHead>
                  <TableHead className="font-bold py-5">Status</TableHead>
                  <TableHead className="text-right font-bold py-5 pr-8">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_RENTALS.map((rental) => (
                  <TableRow key={rental.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-black py-4 pl-8">{rental.bikeNumber}</TableCell>
                    <TableCell className="text-sm font-medium text-slate-600 py-4">{rental.startTime}</TableCell>
                    <TableCell className="text-sm font-medium text-slate-500 py-4">{rental.endTime || '-'}</TableCell>
                    <TableCell className="text-sm font-medium text-slate-500 py-4">{rental.duration || '-'}</TableCell>
                    <TableCell className="font-bold text-slate-900 py-4">{rental.totalAmount ? `$${rental.totalAmount.toFixed(2)}` : '-'}</TableCell>
                    <TableCell className="py-4">
                      <Badge variant={rental.status === 'Active' ? 'default' : 'secondary'} className={`px-2.5 py-1 rounded-lg border-none ${rental.status === 'Active' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {rental.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-4 pr-8">
                      {rental.status === 'Active' && (
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="rounded-xl px-4 py-2 font-bold shadow-lg shadow-red-500/10"
                          onClick={() => handleReturn(rental)}
                        >
                          Return
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <EmptyState 
          icon={History} 
          title="No Rentals Yet" 
          description="Your rental history will appear here once you've completed your first ride."
          actionLabel="Find a Bike"
          onAction={() => setActiveTab('available')}
        />
      )}
    </div>
  );

  const UserProfile = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm ring-1 ring-slate-100">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-white shadow-xl overflow-hidden">
            <User className="w-16 h-16" />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-primary hover:bg-slate-50 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{profileName}</h1>
            <Badge className="bg-primary/10 text-primary border-none font-bold px-3 py-1 rounded-lg">Bike Renter</Badge>
          </div>
          <p className="text-slate-500 font-medium">Eco-warrior & daily commuter since June 2025</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Mail className="w-4 h-4 text-primary/60" />
              john.doe@example.com
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Phone className="w-4 h-4 text-primary/60" />
              {profilePhone}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-slate-50/50 ring-1 ring-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Bike className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-black text-slate-900">128</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-slate-50/50 ring-1 ring-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hours Rented</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">342h</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-slate-50/50 ring-1 ring-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Carbon Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">12.4kg</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-[2rem] border-slate-100 shadow-sm ring-1 ring-slate-100 overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Personal Information</CardTitle>
            <CardDescription className="font-medium">Update your profile details and contact info.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profileName} 
                    onChange={(e) => setProfileName(e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                  <Input 
                    id="email" 
                    value="john.doe@example.com" 
                    readOnly 
                    className="h-12 rounded-xl bg-slate-100 border-slate-100 text-slate-500 font-bold cursor-not-allowed" 
                  />
                  <p className="text-[10px] font-medium text-slate-400 ml-1 italic">Email cannot be changed for security reasons.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={profilePhone} 
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white font-bold" 
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl font-black shadow-lg shadow-primary/20">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="rounded-[2rem] border-slate-100 shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl ring-1 ring-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Fingerprint className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">Two-Factor Auth</div>
                    <div className="text-xs font-medium text-slate-400">Extra layer of security</div>
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl ring-1 ring-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Bell className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">Email Notifications</div>
                    <div className="text-xs font-medium text-slate-400">Rental alerts & offers</div>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-slate-200 text-slate-600 hover:text-slate-900">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="ghost" className="w-full h-12 rounded-xl font-bold text-red-500 hover:bg-red-50 hover:text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out of All Devices
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary text-white rounded-lg">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-900">Preferred Station</h3>
            </div>
            <Select defaultValue="central">
              <SelectTrigger className="bg-white border-none rounded-xl h-12 font-bold shadow-sm">
                <SelectValue placeholder="Select station" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100">
                <SelectItem value="central" className="font-bold">Central Park Station</SelectItem>
                <SelectItem value="downtown" className="font-bold">Downtown Mall</SelectItem>
                <SelectItem value="library" className="font-bold">City Library</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Your preferred station will be prioritized in the search list.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-slate-50/50">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <Dashboard key="dashboard" />}
          {activeTab === 'available' && <AvailableBikes key="available" />}
          {activeTab === 'rentals' && <MyRentals key="rentals" />}
          {activeTab === 'profile' && <UserProfile key="profile" />}
        </AnimatePresence>
      </main>

      {/* Rent Confirmation Modal */}
      {showRentModal && selectedBike && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl ring-1 ring-slate-100"
          >
            <div className="relative h-60 overflow-hidden">
              <img src={selectedBike.image} alt="" className="w-full h-full object-cover" />
              <button 
                onClick={() => setShowRentModal(false)}
                className="absolute top-6 left-6 p-2 bg-white/30 hover:bg-white/50 backdrop-blur-xl rounded-2xl text-white transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">{selectedBike.bikeNumber}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2 font-semibold">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{selectedBike.stationName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-primary">${selectedBike.pricePerHour}</div>
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">per hour</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-3xl p-6 flex items-center gap-5 ring-1 ring-slate-100">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="font-black text-slate-900">Start Rental Now</div>
                  <div className="text-sm font-bold text-slate-500 mt-1">Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full h-16 rounded-2xl text-xl font-black shadow-xl shadow-primary/30" onClick={confirmRent}>
                  Start Ride
                </Button>
                <Button variant="ghost" className="w-full h-12 font-bold text-slate-500 hover:text-slate-900" onClick={() => setShowRentModal(false)}>
                  I'll decide later
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Return Confirmation Modal */}
      {showReturnConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] max-w-md w-full p-10 shadow-2xl ring-1 ring-slate-100 text-center"
          >
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 ring-1 ring-emerald-100">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">End Rental Session?</h2>
            <p className="text-slate-500 font-medium mb-10 px-4">Are you ready to return bike <span className="font-black text-slate-900">{showReturnConfirm.bikeNumber}</span>? We'll calculate your total based on duration.</p>

            <div className="bg-slate-50 rounded-3xl p-8 space-y-5 mb-10 text-left ring-1 ring-slate-100">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Start Time</span>
                <span className="font-black text-slate-900">{showReturnConfirm.startTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Total Duration</span>
                <span className="font-black text-slate-900">~2.5 hours</span>
              </div>
              <div className="h-[1px] bg-slate-200"></div>
              <div className="flex justify-between items-center">
                <span className="font-black text-slate-900 text-lg">Total Bill</span>
                <span className="text-3xl font-black text-primary">$12.50</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-14 rounded-2xl font-bold text-slate-500 border-slate-200" onClick={() => setShowReturnConfirm(null)}>
                Go Back
              </Button>
              <Button className="h-14 rounded-2xl font-black shadow-xl shadow-primary/20" onClick={confirmReturn}>
                Confirm Return
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
