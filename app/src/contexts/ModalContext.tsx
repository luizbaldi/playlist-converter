import React, { useState, createContext } from "react";

import Modal from "../components";

type ModalContext = {
  isOpen: boolean;
  showAlert: (message: React.ReactNode) => void;
};

const ModalContext = createContext<ModalContext>({
  isOpen: false,
  showAlert: () => {}
});

type Props = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<React.ReactNode>(null);

  const showAlert = (body: React.ReactNode) => {
    setMessage(body);
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        showAlert
      }}
    >
      {children}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} message={message} />
    </ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext };
