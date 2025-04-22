"use client";
import React from "react";
import { useMultiStepFormStore } from "@/store";

const StepIndicator = () => {
  const { currentStep, goToStep } = useMultiStepFormStore();

  // Define steps
  const steps = [
    { number: 1, label: "Personal Details" },
    { number: 2, label: "Address Information" },
    { number: 3, label: "Additional Details" },
  ];

  return (
    <div className="relative">
      {/* Progress line */}
      <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-stroke dark:bg-dark-3"></div>

      {/* Active progress line */}
      <div
        className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-primary transition-all duration-300"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      ></div>

      {/* Step circles */}
      <div className="relative z-10 flex justify-between">
        {steps.map((step) => (
          <button
            key={step.number}
            onClick={() => goToStep(step.number)}
            className="flex flex-col items-center"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all
                ${
                  currentStep >= step.number
                    ? "border-primary bg-primary text-white"
                    : "border-stroke bg-white dark:border-dark-3 dark:bg-dark-2"
                }
              `}
            >
              {currentStep > step.number ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span>{step.number}</span>
              )}
            </div>
            <span
              className={`mt-2 text-sm font-medium 
                ${
                  currentStep >= step.number
                    ? "text-primary"
                    : "text-dark-5 dark:text-dark-6"
                }
              `}
            >
              {step.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
