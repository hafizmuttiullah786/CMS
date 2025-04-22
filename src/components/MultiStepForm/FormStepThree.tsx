"use client";
import React, { useState } from "react";
import { useMultiStepFormStore } from "@/store";

const FormStepThree = () => {
  const { formData, updateFormData, prevStep } = useMultiStepFormStore();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleCheckboxChange = (interest: string) => {
    const interests = [...(formData.interests || [])];

    if (interests.includes(interest)) {
      // Remove if already selected
      updateFormData({
        interests: interests.filter((item) => item !== interest),
      });
    } else {
      // Add if not selected
      updateFormData({
        interests: [...interests, interest],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-light-7">
          <svg
            className="h-8 w-8 text-green"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-dark dark:text-white">
          Thank You!
        </h2>
        <p className="mb-6 text-dark-5 dark:text-dark-6">
          Your form has been submitted successfully.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90"
        >
          <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Start New Form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-xl font-semibold text-dark dark:text-white">
        Additional Details
      </h2>

      <div className="mb-4.5">
        <label className="mb-2.5 block font-medium text-dark dark:text-white">
          Occupation
        </label>
        <select
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="w-full appearance-none rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2"
        >
          <option value="">Select your occupation</option>
          <option value="student">Student</option>
          <option value="professional">Professional</option>
          <option value="business">Business Owner</option>
          <option value="freelancer">Freelancer</option>
          <option value="retired">Retired</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-dark dark:text-white">
          Interests
        </label>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {[
            "Technology",
            "Sports",
            "Music",
            "Reading",
            "Travel",
            "Cooking",
            "Art",
            "Science",
          ].map((interest) => (
            <div key={interest} className="flex items-center">
              <input
                type="checkbox"
                id={interest.toLowerCase()}
                checked={formData.interests?.includes(interest) || false}
                onChange={() => handleCheckboxChange(interest)}
                className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary dark:border-dark-3"
              />
              <label
                htmlFor={interest.toLowerCase()}
                className="ml-2 text-sm text-dark dark:text-white"
              >
                {interest}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="rounded-lg border border-stroke px-8 py-3 font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
        >
          Previous
        </button>
        <button
          type="submit"
          disabled={submitting}
          className={`rounded-lg px-8 py-3 font-medium text-white transition
            ${
              submitting
                ? "cursor-wait bg-primary/70"
                : "bg-primary hover:bg-opacity-90"
            }
          `}
        >
          {submitting ? (
            <span className="flex items-center">
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Form"
          )}
        </button>
      </div>
    </form>
  );
};

export default FormStepThree;
