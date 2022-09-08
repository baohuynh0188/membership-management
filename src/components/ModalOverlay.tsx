import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IModalOverlay {
  title: string;
  children: React.ReactNode;
  show: boolean;
  size: 'sm' | 'lg' | 'xl' | undefined;
  backdrop?: 'static' | undefined;
}

interface IModalOverlayBody {
  children: React.ReactNode;
}

interface IModalOverlayFooter {
  children?: React.ReactNode;
  onClose: () => void;
}

const ModalOverlay = ({
  title,
  children,
  show,
  size,
  backdrop,
}: IModalOverlay): JSX.Element => {
  return (
    <Modal show={show} size={size} backdrop={backdrop}>
      <Modal.Header>
        <Modal.Title id={`contained-modal-${title}`}>{title}</Modal.Title>
      </Modal.Header>
      {children}
    </Modal>
  );
};

ModalOverlay.Body = ({ children }: IModalOverlayBody): JSX.Element => (
  <Modal.Body>{children}</Modal.Body>
);

ModalOverlay.Footer = ({
  children,
  onClose,
}: IModalOverlayFooter): JSX.Element => (
  <Modal.Footer>
    {children}
    <Button onClick={onClose}>Close</Button>
  </Modal.Footer>
);

export default ModalOverlay;
