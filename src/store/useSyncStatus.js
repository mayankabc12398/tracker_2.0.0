import { create } from 'zustand'

/** Chhota global flag — cloud sync ki current state (UI indicator ke liye). */
export const useSyncStatus = create((set) => ({
  status: 'idle', // 'idle' | 'syncing' | 'saved' | 'error'
  set: (status) => set({ status }),
}))
