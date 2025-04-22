import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import MultiStepForm from "@/components/MultiStepForm";

export const metadata: Metadata = {
  title: "Multi-Step Form | NextAdmin - Next.js Dashboard Kit",
  description:
    "This is a multi-step form example with Zustand state persistence",
};

const MultiStepFormPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Multi-Step Form" />

      <div className="mx-auto max-w-3xl">
        <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
          <div className="mb-6 border-b border-stroke pb-5 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">
              Multi-Step Form with Zustand Persistence
            </h3>
            <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
              Complete the form across multiple steps. Your progress is saved
              automatically.
            </p>
          </div>

          <MultiStepForm />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MultiStepFormPage;
