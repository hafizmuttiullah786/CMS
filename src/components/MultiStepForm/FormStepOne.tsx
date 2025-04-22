"use client";
import React from "react";
import { useMultiStepFormStore } from "@/store";

const FormStepOne = () => {
  const { formData, updateFormData, nextStep } = useMultiStepFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  // Basic validation
  const isFormValid = formData.firstName && formData.lastName && formData.email;

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-xl font-semibold text-dark dark:text-white">
        Personal Details
      </h2>

      <div className="mb-4.5">
        <label className="mb-2.5 block font-medium text-dark dark:text-white">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2"
          required
        />
      </div>

      <div className="mb-4.5">
        <label className="mb-2.5 block font-medium text-dark dark:text-white">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2"
          required
        />
      </div>

      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-dark dark:text-white">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2"
            required
          />
          <span className="absolute right-4 top-4">
            <svg
              className="fill-current"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.5">
                <path
                  d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                  fill=""
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`rounded-lg px-8 py-3 font-medium text-white transition
            ${
              isFormValid
                ? "bg-primary hover:bg-opacity-90"
                : "cursor-not-allowed bg-gray-3 dark:bg-dark-3"
            }
          `}
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default FormStepOne;
