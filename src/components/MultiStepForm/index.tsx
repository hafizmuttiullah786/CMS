"use client";
import React from "react";
import { useMultiStepFormStore } from "@/store";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";
import StepIndicator from "./StepIndicator";

const MultiStepForm = () => {
  const { currentStep, prevStep, resetForm } = useMultiStepFormStore();

  // Function to render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormStepOne />;
      case 2:
        return <FormStepTwo />;
      case 3:
        return <FormStepThree />;
      default:
        return <FormStepOne />;
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-8 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      {/* Step indicator */}
      <StepIndicator />

      {/* Form content */}
      <div className="mt-8">{renderStep()}</div>

      {/* Reset button - visible on all steps */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={resetForm}
          className="text-sm text-primary hover:underline"
        >
          Reset Form
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
