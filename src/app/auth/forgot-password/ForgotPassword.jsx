'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useForgotPasswordMutation } from '@/redux/Api/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await forgotPassword({ email }).unwrap();
      setSuccess('OTP has been sent to your email');
      
      // Redirect to verify OTP page with email
      setTimeout(() => {
        router.push(`/auth/forgot-password/verify-otp?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (err) {
      setError(err?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <Link href="/auth/login" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft size={20} /> Back to Login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Forgot Password?</h1>
          <p className="text-gray-600 mt-2">Enter your email to receive OTP</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}
          {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">{success}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="foisalrk2@gmail.com"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending OTP...
              </>
            ) : (
              'Send OTP'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;