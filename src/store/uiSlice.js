export const createUISlice = (set) => ({
  // State
  isSidebarOpen: true,
  isEventDetailsSidebarOpen: false,
  isCreateEventModalOpen: false,
  isEditEventModalOpen: false,

  // Actions
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),

  setEventDetailsSidebarOpen: (isOpen) =>
    set({
      isEventDetailsSidebarOpen: isOpen,
    }),

  setCreateEventModalOpen: (isOpen) =>
    set({
      isCreateEventModalOpen: isOpen,
    }),

  setEditEventModalOpen: (isOpen) =>
    set({
      isEditEventModalOpen: isOpen,
    }),
});
