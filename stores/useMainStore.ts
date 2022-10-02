import create from "zustand";

interface MainStore {
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
}

const useMainStore = create<MainStore>((set) => ({
  clicked: false,
  setClicked: (clicked: boolean) => set({ clicked }),
}));

export default useMainStore;
