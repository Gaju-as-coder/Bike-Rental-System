import React from 'react';
import { LogOut, User, Bell, Search, Menu, Bike } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/badge'; // Using badge as placeholder for avatar if needed or standard avatar

export const Header = ({ userRole, onLogout, onProfileClick }: { userRole: 'user' | 'admin', onLogout: () => void, onProfileClick: () => void }) => {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <div className="bg-primary p-1.5 rounded-lg cursor-pointer" onClick={() => window.location.reload()}>
          <Bike className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight">EcoBike</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-1.5 bg-muted rounded-full text-sm border-none focus:ring-1 focus:ring-primary w-64"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="h-8 w-[1px] bg-border mx-1"></div>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onProfileClick}>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black leading-none group-hover:text-primary transition-colors">{userRole === 'admin' ? 'Sarah Admin' : 'John Doe'}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-widest">{userRole}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black shadow-sm group-hover:bg-primary group-hover:text-white transition-all ring-1 ring-primary/20">
              {userRole === 'admin' ? 'S' : 'J'}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick: () => void 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-primary text-white shadow-md shadow-primary/20' 
          : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
};
