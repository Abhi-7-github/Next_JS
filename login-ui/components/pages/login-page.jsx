"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import Navbar from '../layout/navbar';
import InputField from '../global/input-field';
import Button from '../global/button';

// Static UI only (no real auth) per assignment constraints
const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Email and password are required.');
      return;
    }
    setIsLoading(true);
    const loadingToast = toast.loading('Signing you in...', { duration: Infinity });
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      if (res?.error) {
        toast.dismiss(loadingToast);
        toast.error('Invalid credentials. Please check your email and password.');
        setIsLoading(false);
        return;
      }
      if (res?.ok) {
        toast.dismiss(loadingToast);
        toast.success('Login successful! Redirecting...');
        // Fetch updated session to check role
        const sessionRes = await fetch('/api/auth/session');
        const session = await sessionRes.json();
        const role = session?.user?.role;
        if (role === 'admin') {
          router.push('/admin-dashboard');
        } else if (role === 'student') {
          router.push('/student-dashboard');
        } else if (role === 'consumer') {
          router.push('/consumer');
        } else {
          toast.error('Role not recognized');
        }
      }
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-16">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md border border-gray-200">
          <h2 className="text-2xl text-black font-bold mb-6 text-center">Sign In</h2>
          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled={isLoading}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
          <div className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
