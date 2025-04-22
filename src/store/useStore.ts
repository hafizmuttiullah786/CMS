import { create } from "zustand";

// Define the store state type
interface StoreState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// Create the store
const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useStore;
