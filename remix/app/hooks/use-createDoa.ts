import { create } from "zustand";

type TCreateDoa = {
  title: string;
  description: string;
  category: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCategory: (category: string) => void;
};

export const useCreateDoa = create<TCreateDoa>((set) => ({
  title: "",
  description: "",
  category: "",
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setCategory: (category) => set({ category }),
}));
