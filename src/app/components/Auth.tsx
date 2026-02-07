import React, { useState } from 'react';
import { Bike, Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck, UserCircle, Star, Shield, Clock, MapPin, Leaf, CheckCircle2, ShieldEllipsis, Info } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { motion } from 'motion/react';

export const AuthScreen = ({ onLogin, initialMode = 'login' }: { onLogin: (role: 'user' | 'admin') => void, initialMode?: 'login' | 'register' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-primary/10">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Form */}
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 lg:p-20 bg-slate-50/30">
          <div className="w-full max-w-md space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary mb-8 group cursor-default">
                <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12 group-hover:scale-110">
                  <Bike className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-black tracking-tighter text-slate-900">EcoBike</span>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-black tracking-tight text-slate-900">
                  {mode === 'login' ? 'Welcome back' : 'Create account'}
                </h1>
                <p className="text-primary font-black text-lg tracking-tight">
                  Rent bikes instantly. Ride smart. Go green.
                </p>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {mode === 'login' 
                    ? 'The easiest way to move around the city sustainably.' 
                    : 'Start your eco-friendly journey with our smart bike network.'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between ml-1">
                <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Select Access Role</Label>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                  <Info className="w-3 h-3" />
                  Role determines your dashboard access
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole('user')}
                  className={`flex flex-col items-start gap-3 p-5 rounded-[2rem] border-2 transition-all duration-300 relative overflow-hidden group ${
                    selectedRole === 'user' 
                      ? 'border-primary bg-primary/[0.03] ring-4 ring-primary/5' 
                      : 'border-slate-100 bg-white text-slate-400 hover:border-primary/30 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${selectedRole === 'user' ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                    <UserCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={`text-xs font-black uppercase tracking-widest block ${selectedRole === 'user' ? 'text-primary' : 'text-slate-500'}`}>Bike Renter</span>
                    <span className="text-[10px] font-bold mt-1 block opacity-60">Rent bikes for daily commute</span>
                  </div>
                  {selectedRole === 'user' && (
                    <div className="absolute top-4 right-4 bg-primary rounded-full p-0.5">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`flex flex-col items-start gap-3 p-5 rounded-[2rem] border-2 transition-all duration-300 relative overflow-hidden group ${
                    selectedRole === 'admin' 
                      ? 'border-primary bg-primary/[0.03] ring-4 ring-primary/5' 
                      : 'border-slate-100 bg-white text-slate-400 hover:border-primary/30 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${selectedRole === 'admin' ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={`text-xs font-black uppercase tracking-widest block ${selectedRole === 'admin' ? 'text-primary' : 'text-slate-500'}`}>Admin Panel</span>
                    <span className="text-[10px] font-bold mt-1 block opacity-60">Manage bikes and rentals</span>
                  </div>
                  {selectedRole === 'admin' && (
                    <div className="absolute top-4 right-4 bg-primary rounded-full p-0.5">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {mode === 'register' && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Full Name</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input id="name" placeholder="John Doe" className="pl-12 h-14 rounded-[1.25rem] bg-white border-slate-100 focus:ring-primary/20 transition-all font-bold" required />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      className="pl-12 h-14 rounded-[1.25rem] bg-white border-slate-100 focus:ring-primary/20 transition-all font-bold" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-slate-400">Password</Label>
                    {mode === 'login' && (
                      <button type="button" className="text-xs text-primary hover:underline font-bold">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-12 h-14 rounded-[1.25rem] bg-white border-slate-100 focus:ring-primary/20 transition-all font-bold" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="flex items-center gap-1.5 ml-1 mt-2 text-[10px] font-black text-emerald-600 uppercase tracking-tighter">
                    <ShieldEllipsis className="w-3.5 h-3.5" />
                    256-bit SSL Secure login
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-2">
                <Button type="submit" className="w-full h-16 rounded-[1.5rem] text-lg font-black shadow-xl shadow-primary/30 active:scale-[0.98] transition-all">
                  {mode === 'login' ? `Sign In to Dashboard` : `Create ${selectedRole === 'admin' ? 'Admin' : 'User'} Account`}
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
                
                <div className="flex items-center justify-center gap-3 py-1 bg-white/50 rounded-2xl border border-slate-50/50">
                  <div className="flex -space-x-1.5">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-slate-200"></div>
                    ))}
                  </div>
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-tight">Trusted by 10,000+ riders city-wide</span>
                </div>
              </div>
            </form>

            <div className="text-center">
              <p className="text-sm font-bold text-slate-500">
                {mode === 'login' ? "New here? " : "Already have an account? "}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-primary font-black hover:underline inline-flex items-center"
                >
                  {mode === 'login' ? 'Create an account and start riding in minutes →' : 'Log in to your account'}
                </button>
              </p>
            </div>

            {/* How It Works Section */}
            <div className="pt-12 border-t border-slate-100">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 text-center">Your Journey Starts in 3 Steps</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all mb-3">
                    <UserCircle className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-tight">1. Register</span>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all mb-3">
                    <Bike className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-tight">2. Choose</span>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-tight">3. Ride</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Illustration/Image */}
        <div className="hidden lg:block relative bg-primary/5 p-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img 
              src="https://images.unsplash.com/photo-1769628237058-03ca0158d1a1?q=80&w=1200" 
              alt="Person cycling" 
              className="w-full h-full object-cover grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/20 to-transparent"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-start text-white space-y-8 pt-10">
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-black/20 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-2xl space-y-10 max-w-lg"
            >
              <div className="space-y-4">
                <h2 className="text-5xl font-black tracking-tighter leading-none">Ride the change.</h2>
                <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                <div className="flex flex-col gap-5 mt-8">
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm group-hover:bg-primary/40 transition-colors">
                      <Bike className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-black tracking-tight">Instant Bike Rental</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm group-hover:bg-primary/40 transition-colors">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-black tracking-tight">500+ Station Locations</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm group-hover:bg-primary/40 transition-colors">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-black tracking-tight">Eco-Friendly Transport</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10">
                <div className="space-y-1">
                  <div className="text-2xl font-black tracking-tighter">5,000+</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70 font-black">Bikes</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black tracking-tighter">500+</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70 font-black">Stations</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black tracking-tighter">24/7</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70 font-black">Support</div>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-auto flex items-center justify-between text-[11px] font-black uppercase tracking-widest opacity-80 bg-black/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Data Protected
                </span>
                <span>© 2026 EcoBike</span>
              </div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Minimal Bottom Footer for Mobile */}
      <footer className="lg:hidden py-10 px-8 border-t border-slate-100 flex flex-col items-center gap-6 bg-white">
        <div className="flex items-center gap-2 text-slate-900">
          <Bike className="w-5 h-5 text-primary" />
          <span className="font-black text-lg tracking-tighter">EcoBike System</span>
        </div>
        <div className="flex gap-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-primary transition-colors">About</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        </div>
        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          © 2026 EcoBike Urban Mobility
        </div>
      </footer>
    </div>
  );
};
