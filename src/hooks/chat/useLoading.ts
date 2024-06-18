import { create } from "zustand";

interface Loading {
  startLoading: number | boolean;
  disconnectLoading: number | boolean;
  setStartLoading: (loading: number | boolean) => void;
  setDisconnectLoading: (loading: number | boolean) => void;
}

export const useLoading = create<Loading>((set, get) => ({
  startLoading: false,
  disconnectLoading: false,
  setStartLoading: (loading: number | boolean) =>
    set({ startLoading: loading }),
  setDisconnectLoading: (loading: number | boolean) =>
    set({ disconnectLoading: loading }),
}));
