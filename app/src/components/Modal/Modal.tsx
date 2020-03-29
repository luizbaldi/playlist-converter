import React, { createContext } from "react";
import ReactModal from "react-modal";
import { Button, Window, WindowContent, WindowHeader } from "react95";
import styled from "styled-components";

const customStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "#00000085",
    zIndex: 1
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0
  }
};

ReactModal.setAppElement("#root");

type ModalContext = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setMessage: (message: React.ReactNode) => void;
};

const ModalContext = createContext<ModalContext>({
  isOpen: false,
  setIsOpen: () => {},
  setMessage: () => {}
});

type Props = {
  message: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Modal = ({ message, isOpen, setIsOpen }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Window>
        <WindowHeader>
          <span>Alert</span>
        </WindowHeader>
        <StyledWindowContent>
          <StyledMessage>{message}</StyledMessage>
          <Button onClick={() => setIsOpen(false)} size="sm">
            Ok
          </Button>
        </StyledWindowContent>
      </Window>
    </ReactModal>
  );
};

const StyledWindowContent = styled(WindowContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 150px;
`;

const StyledMessage = styled.div`
  margin-bottom: 22px;
`;

export default Modal;
