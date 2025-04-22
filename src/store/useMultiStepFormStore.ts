import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the multi-step form state type
interface MultiStepFormState {
  // Form data
  formData: {
    // Personal details
    firstName: string;
    lastName: string;
    email: string;

    // Address details
    address: string;
    city: string;
    zipCode: string;
    country: string;

    // Additional information
    occupation: string;
    interests: string[];
  };

  // Current step
  currentStep: number;

  // Actions
  updateFormData: (data: Partial<MultiStepFormState["formData"]>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
}

// Initial state
const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    occupation: "",
    interests: [],
  },
  currentStep: 1,
};

// Create the persisted store
const useMultiStepFormStore = create<MultiStepFormState>()(
  persist(
    (set) => ({
      ...initialState,

      // Update form data
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      // Navigation between steps
      nextStep: () =>
        set((state) => ({
          currentStep: state.currentStep + 1,
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(1, state.currentStep - 1),
        })),

      goToStep: (step) =>
        set({
          currentStep: step,
        }),

      // Reset form to initial state
      resetForm: () => set({ ...initialState }),
    }),
    {
      name: "multi-step-form-storage",
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
      }),
    },
  ),
);

export default useMultiStepFormStore;
