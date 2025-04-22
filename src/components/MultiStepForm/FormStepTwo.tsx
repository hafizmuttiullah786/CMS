"use client";
import React from "react";
import { useMultiStepFormStore } from "@/store";

const FormStepTwo = () => {
  const { formData, updateFormData, nextStep, prevStep } =
    useMultiStepFormStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  // Basic validation
  const isFormValid =
    formData.address && formData.city && formData.zipCode && formData.country;

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-xl font-semibold text-dark dark:text-white">
        Address Information
      </h2>

      <div className="mb-4.5">
        <label className="mb-2.5 block font-medium text-dark dark:text-white">
          Street Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your street address"
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2"
          required
        />
      </div>

      <div className="mb-4.5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2.5 block font-medium text-dark dark:text-white">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2"
            required
          />
        </div>
        <div>
          <label className="mb-2.5 block font-medium text-dark dark:text-white">
            Zip/Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter your zip/postal code"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-dark dark:text-white">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full appearance-none rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2"
          required
        >
          <option value="">Select your country</option>
          <option value="USA">United States</option>
          <option value="CAN">Canada</option>
          <option value="UK">United Kingdom</option>
          <option value="AUS">Australia</option>
          <option value="DEU">Germany</option>
          <option value="FRA">France</option>
          <option value="JPN">Japan</option>
          <option value="CHN">China</option>
          <option value="IND">India</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="rounded-lg border border-stroke px-8 py-3 font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
        >
          Previous
        </button>
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

export default FormStepTwo;
