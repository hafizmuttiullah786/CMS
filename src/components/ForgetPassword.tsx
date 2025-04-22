"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

import {
  ForgotPasswordSendOtpService,
  ForgotPasswordSubmitOtpService,
  ForgotPasswordUpdatePasswordService
} from '@/Services/ForgotPasswordService'
import ApiNames from "@/constants/ApiNames";

interface ForgotPasswordFormValues {
  email: string
  otp?: string
  newPassword?: string
  step?: number
}

const ForgetPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]); // 4 OTP boxes
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userEmail, setUserEmail] = useState('')
  const [userOtp, setUserOtp] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleEmailSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");
    // TODO: Call API to send OTP to the email
    const response = await ForgotPasswordSendOtpService(ApiNames.forgotPasswordSendOtp, { email: email })

    if (response.result === 'success') {
      setUserEmail(email)
      setStep(2)
    } else {
      setError(response.result || 'Failed to send OTP')
    }
    console.log("Sending OTP to:", email);
    setStep(2);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if value is entered
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index]) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  };

  const handleOtpSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Validate OTP and proceed to set a new password
    const response = await ForgotPasswordSubmitOtpService(ApiNames.forgotPasswordVerifyOtp, {
      email: userEmail,
      otp: otp.join('') || ''
    })

    if (response.result === 'success') {
      setUserOtp(otp.join('') || '')
      setStep(3)
    } else {
      setError(response.result || 'Invalid OTP')
    }
    // console.log("OTP submitted:", otp.join(''));
    // setStep(3);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const validatePassword = (password: string) => {
    // Regex for password: Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleNewPasswordSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (validatePassword(newPassword)) {
      // TODO: Submit the new password
      const response = await ForgotPasswordUpdatePasswordService(ApiNames.forgotPasswordUpdatePassword, {
        email: userEmail,
        otp: userOtp,
        newPassword: newPassword || ''
      })

      if (response.result === 'success') {
        // Show success alert
        await Swal.fire({
          title: 'Success!',
          text: 'Password updated successfully',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        })

        // Navigate to login after alert closes
        router.push('/login')
      } else {
        setError(response.result || 'Failed to update password')
      }

      // Navigate to login after alert closes
      // router.push('/login')
      console.log("New password submitted:", newPassword);
    }
  };

  return (
    <div className="container">
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2.5 block font-medium text-dark dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="mb-4.5">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
            >
              Get Verification Email
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-dark dark:text-white">
              Enter OTP
            </label>
            <div className="flex gap-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  maxLength={1}
                  className="w-12 h-12 text-center border rounded-lg text-dark font-medium dark:text-white dark:border-dark-3 dark:bg-dark-2"
                />
              ))}
            </div>
          </div>

          <div className="mb-4.5">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
            >
              Verify OTP
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleNewPasswordSubmit}>
          <div className="mb-4">
            <label htmlFor="new-password" className="mb-2.5 block font-medium text-dark dark:text-white">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>

          <div className="mb-4.5">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
            >
              Set New Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
