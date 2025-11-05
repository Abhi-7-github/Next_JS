'use client';

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ConsumerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("Session data:", session);
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
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl text-black font-bold mb-4">
          Welcome, Consumer!
        </h1>
        <p className="mb-6 text-black">
          You are logged in as a consumer.
        </p>
        <button onClick={handleSignOut} className="text-red-600 hover:underline">
          Logout
        </button>
      </div>
    </div>
  );
}
