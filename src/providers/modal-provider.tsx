"use client";

import { createContext, FC, useContext, useEffect, useState } from "react";

type InitialModalContext = {
  isOpen: boolean;
  setClose: () => void;
  setOpen: (modal: React.ReactNode) => void;
};
type ModalProviderProps = {
  children: React.ReactNode;
};
const initialValue: InitialModalContext = {
  isOpen: false,
  setClose: () => {},
  setOpen: (modal: React.ReactNode) => {},
};
const ModalContext = createContext(initialValue);

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showingModal, setShowingModal] = useState<React.ReactNode>(null);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setClose = () => {
    setIsOpen(false);
  };
  const setOpen = (modal: React.ReactNode) => {
    if (modal) {
      setShowingModal(modal);
      setIsOpen(true);
    }
  };

  if (!isMounted) {
    return null;
  }
  const value: InitialModalContext = {
    isOpen,
    setClose,
    setOpen,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
