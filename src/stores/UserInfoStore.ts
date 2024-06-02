import { create } from "zustand";

type Store = {
  name: string;
  setName: (name: string) => void;
}

const useUserInfoStore = create<Store>((set) => ({
  name: "",
  setName: (name: string) => set({ name }),
}))

export default useUserInfoStore