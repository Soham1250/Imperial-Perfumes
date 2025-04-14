'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, ShoppingBag, Heart, Settings, MapPin } from 'lucide-react';

export default function AccountPage() {
  const { user, loading, openAuthModal } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      openAuthModal('login');
    }
  }, [user, loading, openAuthModal]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blck-accent"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="flex flex-col items-center justify-center h-64">
          <h1 className="text-2xl font-heading font-bold text-blck-silver mb-4">
            Please Sign In
          </h1>
          <p className="text-blck-textMuted mb-6">
            You need to be signed in to view your account
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-2 bg-blck-accent text-white rounded-md hover:bg-blck-accent/90"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-blck-silver mb-8">
          My Account
        </h1>

        <div className="bg-blck-cardBackground rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blck-purple rounded-full flex items-center justify-center">
              <User size={32} className="text-blck-silver" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-blck-silver">{user.name}</h2>
              <p className="text-blck-textMuted">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blck-cardBackground rounded-lg p-6 hover:border hover:border-blck-accent transition-all cursor-pointer" onClick={() => router.push('/account/orders')}>
            <div className="flex items-center space-x-3 mb-4">
              <ShoppingBag size={24} className="text-blck-accent" />
              <h3 className="text-lg font-medium text-blck-silver">My Orders</h3>
            </div>
            <p className="text-sm text-blck-textMuted">
              View and track your orders
            </p>
          </div>

          <div className="bg-blck-cardBackground rounded-lg p-6 hover:border hover:border-blck-accent transition-all cursor-pointer" onClick={() => router.push('/account/wishlist')}>
            <div className="flex items-center space-x-3 mb-4">
              <Heart size={24} className="text-blck-accent" />
              <h3 className="text-lg font-medium text-blck-silver">Wishlist</h3>
            </div>
            <p className="text-sm text-blck-textMuted">
              Products you've saved for later
            </p>
          </div>

          <div className="bg-blck-cardBackground rounded-lg p-6 hover:border hover:border-blck-accent transition-all cursor-pointer" onClick={() => router.push('/account/addresses')}>
            <div className="flex items-center space-x-3 mb-4">
              <MapPin size={24} className="text-blck-accent" />
              <h3 className="text-lg font-medium text-blck-silver">Addresses</h3>
            </div>
            <p className="text-sm text-blck-textMuted">
              Manage your shipping addresses
            </p>
          </div>

          <div className="bg-blck-cardBackground rounded-lg p-6 hover:border hover:border-blck-accent transition-all cursor-pointer" onClick={() => router.push('/account/settings')}>
            <div className="flex items-center space-x-3 mb-4">
              <Settings size={24} className="text-blck-accent" />
              <h3 className="text-lg font-medium text-blck-silver">Settings</h3>
            </div>
            <p className="text-sm text-blck-textMuted">
              Update your profile and preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
