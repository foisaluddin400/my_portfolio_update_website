'use client';

import React, { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useVerifyOtpMutation } from '@/redux/Api/authApi';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) setEmail(emailFromUrl);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await verifyOtp({ email, otp }).unwrap();
      router.push(`/auth/forgot-password/verify-otp/ResetPassword?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <Link href="/auth/forgot-password" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft size={20} /> Back
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Verify OTP</h1>
          <p className="text-gray-600 mt-2">Enter the OTP sent to your email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP Code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center text-2xl tracking-widest"
              placeholder="123456"
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
                Verifying...
              </>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;