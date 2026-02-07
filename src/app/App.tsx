import React, { useState } from 'react';
import { AuthScreen } from '@/app/components/Auth';
import { Header } from '@/app/components/LayoutComponents';
import { UserModule } from '@/app/components/UserModule';
import { AdminModule } from '@/app/components/AdminModule';
import { Toaster } from '@/app/components/ui/sonner';

type AppState = 'auth' | 'user' | 'admin';

export default function App() {
  const [state, setState] = useState<AppState>('auth');
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);
  const [targetTab, setTargetTab] = useState<string | null>(null);

  const handleLogin = (role: 'user' | 'admin') => {
    setUserRole(role);
    setState(role);
    setTargetTab('dashboard');
  };

  const handleLogout = () => {
    setState('auth');
    setUserRole(null);
    setTargetTab(null);
  };

  const handleProfileClick = () => {
    setTargetTab('profile');
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster position="top-center" expand={true} richColors />
      
      {state === 'auth' ? (
        <AuthScreen onLogin={handleLogin} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header 
            userRole={userRole as 'user' | 'admin'} 
            onLogout={handleLogout} 
            onProfileClick={handleProfileClick}
          />
          <div className="flex-1">
            {state === 'user' && <UserModule initialTab={targetTab === 'profile' ? 'profile' : 'dashboard'} key={`user-${targetTab}`} />}
            {state === 'admin' && <AdminModule initialTab={targetTab === 'profile' ? 'profile' : 'dashboard'} key={`admin-${targetTab}`} />}
          </div>
        </div>
      )}
    </div>
  );
}
