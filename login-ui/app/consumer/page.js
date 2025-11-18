'use client';

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MaterialButton from '@/components/MaterialButton';

export default function ConsumerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'consumer') {
      router.replace('/signin');
    }
  }, [session, status, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  if (status === 'loading' || !session || session.user.role !== 'consumer') {
    return (
      <div className="flex justify-center items-center min-h-screen
      bg-gradient-to-br from-gray-900 via-black to-gray-950">
        <p className="text-gray-300 text-lg font-medium animate-pulse">
          Loading consumer dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen
    bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100 px-4">

      {/* Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 
      p-8 rounded-2xl shadow-2xl w-full max-w-md text-center 
      hover:border-cyan-400/30 transition-all duration-300
      hover:shadow-cyan-500/20">

        <h1 className="text-3xl font-extrabold 
        bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
        bg-clip-text text-transparent mb-3">
          Welcome, Consumer!
        </h1>

        <p className="text-gray-400 text-base mb-8">
          Logged in as:{" "}
          <span className="text-cyan-300 font-semibold">
            {session?.user?.name}
          </span>
        </p>

        <MaterialButton
          color="red"
          className="w-full shadow-red-500/40 hover:shadow-red-500/50 transition-all"
          onClick={handleSignOut}
        >
          Logout
        </MaterialButton>
      </div>

    </div>
  );
}
