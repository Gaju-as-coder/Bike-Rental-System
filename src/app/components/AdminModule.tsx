import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Bike, 
  MapPin, 
  BarChart3, 
  Users, 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  X,
  CloudRain,
  Sun,
  Menu,
  Image as ImageIcon,
  Upload,
  ArrowRight,
  User,
  Settings,
  Shield,
  Clock,
  LogOut,
  Mail,
  Fingerprint,
  Calendar,
  Activity,
  History,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { MOCK_BIKES, MOCK_RENTALS, MOCK_STATIONS, BikeData } from '@/app/data';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { StatCardSkeleton, Skeleton } from '@/app/components/CommonComponents';

const CHART_DATA = [
  { hour: '08:00', demand: 120, bikes: 400 },
  { hour: '10:00', demand: 280, bikes: 380 },
  { hour: '12:00', demand: 190, bikes: 420 },
  { hour: '14:00', demand: 210, bikes: 410 },
  { hour: '16:00', demand: 450, bikes: 350 },
  { hour: '18:00', demand: 520, bikes: 300 },
  { hour: '20:00', demand: 310, bikes: 360 },
  { hour: '22:00', demand: 150, bikes: 400 },
];

export const AdminModule = ({ initialTab = 'dashboard' }: { initialTab?: 'dashboard' | 'bikes' | 'rentals' | 'stations' | 'analytics' | 'profile' }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bikes' | 'rentals' | 'stations' | 'analytics' | 'profile'>(initialTab);
  const [showAddBike, setShowAddBike] = useState(false);
  const [editingBike, setEditingBike] = useState<BikeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bikeImagePreview, setBikeImagePreview] = useState<string | null>(null);

  // Profile States
  const [adminName, setAdminName] = useState('Sarah Admin');

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBikeImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const Sidebar = () => (
    <aside className={`
      fixed lg:sticky top-16 z-40 bg-white border-r transition-all duration-300 h-[calc(100vh-64px)]
      ${sidebarOpen ? 'w-72 translate-x-0' : 'w-0 lg:w-20 -translate-x-full lg:translate-x-0'}
    `}>
      <div className={`p-4 flex flex-col gap-2 ${!sidebarOpen && 'lg:items-center'}`}>
        {[
          { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { id: 'bikes', icon: Bike, label: 'Manage Bikes' },
          { id: 'rentals', icon: Users, label: 'Rentals' },
          { id: 'stations', icon: MapPin, label: 'Stations' },
          { id: 'analytics', icon: BarChart3, label: 'Analytics' },
          { id: 'profile', icon: User, label: 'My Profile' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id as any); if (window.innerWidth < 1024) setSidebarOpen(false); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}
          >
            <item.icon className="w-5 h-5" />
            {sidebarOpen && <span className="font-bold">{item.label}</span>}
          </button>
        ))}
      </div>
    </aside>
  );

  const Dashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Admin Command Center</h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium">System performance overview and live fleet health.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-[20px] border ring-1 ring-slate-100 shadow-sm">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Sun className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900 leading-none">24°C Sunny</div>
              <div className="text-[10px] font-bold text-emerald-600 uppercase mt-1">High Rental Potential</div>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 bg-white rounded-xl border shadow-sm hover:bg-slate-50 transition-colors lg:hidden"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          [1,2,3,4].map(i => <StatCardSkeleton key={i} />)
        ) : (
          [
            { label: 'Total Fleet', value: '1,284', delta: '+12%', icon: Bike, color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-100' },
            { label: 'Available Now', value: '842', delta: '65%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-100' },
            { label: 'Active Rents', value: '442', delta: '+28 new', icon: Users, color: 'text-primary', bg: 'bg-primary/5', ring: 'ring-primary/10' },
            { label: 'System Health', value: '98.2%', delta: 'Optimal', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-100' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm group hover:shadow-md transition-all cursor-default overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-2xl ${stat.bg} ring-1 ${stat.ring} transition-transform group-hover:scale-110 duration-300`}>
                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-black px-2 py-0.5 rounded-lg border-none bg-slate-100 text-slate-600 uppercase">{stat.delta}</Badge>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                  <p className="text-4xl font-black mt-2 text-slate-900 tracking-tight">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden ring-1 ring-slate-100">
          <CardHeader className="p-8">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">System Demand Analytics</CardTitle>
                <CardDescription className="text-slate-500 font-medium mt-1">Real-time usage vs predictive AI modeling</CardDescription>
              </div>
              <Select defaultValue="24h">
                <SelectTrigger className="w-32 rounded-xl border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="h-80 p-8 pt-0">
            {isLoading ? <Skeleton className="w-full h-full" /> : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBikes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                    cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                  />
                  <Area type="monotone" dataKey="demand" stroke="#10b981" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={4} />
                  <Area type="monotone" dataKey="bikes" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBikes)" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white ring-1 ring-slate-100 overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Hotspot Stations</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Top 5 high-traffic locations</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-8">
            {MOCK_STATIONS.slice(0, 5).map((station) => (
              <div key={station.id} className="space-y-3 group cursor-pointer">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors">{station.name}</span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Status: Operational</p>
                  </div>
                  <span className="text-sm font-black text-slate-900">{station.availableBikes} <span className="text-slate-400 font-bold">/ {station.totalBikes}</span></span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(station.availableBikes / station.totalBikes) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${station.availableBikes < 5 ? 'bg-amber-500' : 'bg-primary'}`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ManageBikes = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Bike Fleet Management</h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium">Manage and monitor all bikes in the ecosystem.</p>
        </div>
        <Button className="rounded-2xl px-8 h-14 flex gap-3 font-black text-base shadow-xl shadow-primary/30" onClick={() => { setShowAddBike(true); setBikeImagePreview(null); }}>
          <Plus className="w-6 h-6" />
          Add New Bike
        </Button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden ring-1 ring-slate-100">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 bg-slate-50/30">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search bike number, station or ID..." className="pl-12 h-12 rounded-xl bg-white border-slate-200 focus:ring-primary/20" />
          </div>
          <Button variant="outline" className="rounded-xl h-12 flex gap-2 font-bold px-6 border-slate-200">
            <Filter className="w-4 h-4" />
            Advanced Filter
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="font-black py-5 pl-8 uppercase text-[11px] tracking-widest text-slate-400">Preview</TableHead>
                <TableHead className="font-black py-5 uppercase text-[11px] tracking-widest text-slate-400">Bike Number</TableHead>
                <TableHead className="font-black py-5 uppercase text-[11px] tracking-widest text-slate-400">Station</TableHead>
                <TableHead className="font-black py-5 uppercase text-[11px] tracking-widest text-slate-400">Price/hr</TableHead>
                <TableHead className="font-black py-5 uppercase text-[11px] tracking-widest text-slate-400">Status</TableHead>
                <TableHead className="text-right font-black py-5 pr-8 uppercase text-[11px] tracking-widest text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_BIKES.map((bike) => (
                <TableRow key={bike.id} className="hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="py-4 pl-8">
                    <div className="w-16 h-12 rounded-xl overflow-hidden ring-1 ring-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                      <img src={bike.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-slate-900 py-4">{bike.bikeNumber}</TableCell>
                  <TableCell className="font-bold text-slate-600 py-4">{bike.stationName}</TableCell>
                  <TableCell className="font-black text-primary py-4">${bike.pricePerHour.toFixed(2)}</TableCell>
                  <TableCell className="py-4">
                    <Badge className={`px-3 py-1 rounded-lg border-none font-bold ${bike.status === 'Available' ? 'bg-emerald-500/10 text-emerald-600' : bike.status === 'Rented' ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'}`}>
                      {bike.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-4 pr-8">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-blue-600 hover:bg-blue-50" onClick={() => {setEditingBike(bike); setBikeImagePreview(bike.image)}}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );

  const AdminProfile = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm ring-1 ring-slate-100">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-white shadow-xl overflow-hidden">
            <ShieldCheck className="w-16 h-16" />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-primary hover:bg-slate-50 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{adminName}</h1>
            <Badge className="bg-primary/10 text-primary border-none font-bold px-3 py-1 rounded-lg">System Admin</Badge>
          </div>
          <p className="text-slate-500 font-medium">Platform Administrator • Level 4 Clearance</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Mail className="w-4 h-4 text-primary/60" />
              sarah.admin@ecobike.com
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Zap className="w-4 h-4 text-primary/60" />
              Last login: 2 hours ago
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-slate-50/50 ring-1 ring-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Managed Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Bike className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">1,284</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-slate-50/50 ring-1 ring-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Stations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">542</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-slate-50/50 ring-1 ring-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-black text-slate-900">12</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-[2rem] border-slate-100 shadow-sm ring-1 ring-slate-100 overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Admin Information</CardTitle>
            <CardDescription className="font-medium">Manage your administrator profile details.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Admin details updated!"); }} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-name" className="ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Display Name</Label>
                  <Input 
                    id="admin-name" 
                    value={adminName} 
                    onChange={(e) => setAdminName(e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-id" className="ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Administrator ID</Label>
                  <div className="relative">
                    <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="admin-id" 
                      value="ADM-992384-X" 
                      readOnly 
                      className="pl-10 h-12 rounded-xl bg-slate-100 border-slate-100 text-slate-500 font-bold cursor-not-allowed" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Work Email</Label>
                  <Input 
                    id="admin-email" 
                    value="sarah.admin@ecobike.com" 
                    readOnly 
                    className="h-12 rounded-xl bg-slate-100 border-slate-100 text-slate-500 font-bold cursor-not-allowed" 
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl font-black shadow-lg shadow-primary/20">Update Profile</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="rounded-[2rem] border-slate-100 shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Security & Access</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl ring-1 ring-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">Admin Mode</div>
                    <div className="text-xs font-medium text-slate-400">Full system access enabled</div>
                  </div>
                </div>
                <Badge className="bg-emerald-500 text-white border-none font-bold rounded-lg">Active</Badge>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-2xl ring-1 ring-slate-100 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-tighter text-slate-400">
                  <span>System Permissions</span>
                  <span className="text-primary">9/9</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['User Mgmt', 'Fleet Mgmt', 'Billing', 'Analytics'].map(perm => (
                    <div key={perm} className="flex items-center gap-2 text-[10px] font-black text-slate-600 bg-white p-2 rounded-lg shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {perm}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-slate-200 text-slate-600 hover:text-slate-900">
                  <Settings className="w-4 h-4 mr-2" />
                  Access Log
                </Button>
                <Button variant="ghost" className="w-full h-12 rounded-xl font-bold text-red-500 hover:bg-red-50 hover:text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Terminate Session
                </Button>
              </div>
            </CardContent>
          </Card>
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
          {activeTab === 'bikes' && <ManageBikes key="bikes" />}
          {activeTab === 'rentals' && (
            <div className="bg-white p-12 rounded-[2rem] border border-slate-100 shadow-sm text-center space-y-6">
              <Users className="w-16 h-16 text-slate-300 mx-auto" />
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Rentals Management</h2>
              <p className="text-slate-500 max-w-md mx-auto font-medium">Real-time monitoring of all active bike sessions across the network.</p>
              <Button onClick={() => setActiveTab('dashboard')} variant="outline" className="rounded-2xl h-14 px-8 font-black">Back to Command Center</Button>
            </div>
          )}
          {activeTab === 'profile' && <AdminProfile key="profile" />}
          {['stations', 'analytics'].includes(activeTab) && (
            <div className="bg-white p-12 rounded-[2rem] border border-slate-100 shadow-sm text-center space-y-6">
              <BarChart3 className="w-16 h-16 text-slate-300 mx-auto" />
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{activeTab === 'stations' ? 'Station Control' : 'AI Predictive Analytics'}</h2>
              <p className="text-slate-500 max-w-md mx-auto font-medium">Advanced dashboard for {activeTab === 'stations' ? 'infrastructure optimization' : 'fleet scaling and demand forecasting'}.</p>
              <Button onClick={() => setActiveTab('dashboard')} variant="outline" className="rounded-2xl h-14 px-8 font-black">Back to Command Center</Button>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Add/Edit Bike Modal */}
      {(showAddBike || editingBike) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] max-w-xl w-full p-10 shadow-2xl relative ring-1 ring-slate-100"
          >
            <button 
              onClick={() => { setShowAddBike(false); setEditingBike(null); }}
              className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-slate-900"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8">{editingBike ? 'Update Fleet Asset' : 'Register New Bike'}</h2>
            
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); toast.success('Fleet updated successfully!'); setShowAddBike(false); setEditingBike(null); }}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <Label htmlFor="bikeNumber" className="font-black text-slate-700 uppercase text-[11px] tracking-widest ml-1">Bike Number</Label>
                    <Input id="bikeNumber" placeholder="BK-000" defaultValue={editingBike?.bikeNumber} className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all font-bold" required />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="price" className="font-black text-slate-700 uppercase text-[11px] tracking-widest ml-1">Hourly Rate ($)</Label>
                    <Input id="price" type="number" step="0.5" defaultValue={editingBike?.pricePerHour || 5.0} className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all font-bold" required />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="station" className="font-black text-slate-700 uppercase text-[11px] tracking-widest ml-1">Assigned Station</Label>
                  <Select defaultValue={editingBike?.stationName || 'Central Park'}>
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold">
                      <SelectValue placeholder="Select a station" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl shadow-2xl border-slate-100">
                      {MOCK_STATIONS.map(s => (
                        <SelectItem key={s.id} value={s.name} className="font-bold py-3">{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2.5">
                  <Label className="font-black text-slate-700 uppercase text-[11px] tracking-widest ml-1">Asset Photo</Label>
                  <div 
                    className={`relative border-2 border-dashed rounded-[2rem] h-48 flex flex-col items-center justify-center transition-all cursor-pointer group overflow-hidden ${bikeImagePreview ? 'border-primary border-solid' : 'border-slate-200 hover:border-primary hover:bg-primary/5'}`}
                    onClick={() => document.getElementById('bike-image-upload')?.click()}
                  >
                    {bikeImagePreview ? (
                      <>
                        <img src={bikeImagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Upload className="w-10 h-10 text-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-primary/10 transition-colors">
                          <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                        </div>
                        <p className="text-sm font-black text-slate-600 mt-4">Upload Asset Image</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">PNG, JPG up to 10MB</p>
                      </>
                    )}
                    <input id="bike-image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[1.5rem] ring-1 ring-slate-100">
                  <div className="space-y-0.5">
                    <Label className="font-black text-slate-900 tracking-tight">Active Availability</Label>
                    <p className="text-xs font-medium text-slate-500">Enable for instant rental in the user portal</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="flex-1 h-16 rounded-2xl font-bold text-slate-500 border-slate-200" type="button" onClick={() => { setShowAddBike(false); setEditingBike(null); }}>
                  Cancel
                </Button>
                <Button className="flex-1 h-16 rounded-2xl font-black text-lg shadow-xl shadow-primary/30" type="submit">
                  {editingBike ? 'Update Asset' : 'Register Bike'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
