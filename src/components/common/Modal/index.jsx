import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EbModal = ({
  message,
  isOPen,
  handleClose,
  title,
  cancelText,
  saveText,
  ...props
}) => {
  const {className } = props;

  return (
    <div>
      <Modal isOpen={isOPen} toggle={handleClose} className={className}>
        <ModalHeader toggle={handleClose}>{title}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          {cancelText ? (
            <Button color="secondary" onClick={() => handleClose("cancel")}>
              {cancelText}
            </Button>
          ) : (
            ""
          )}
          {saveText ? (
            <Button color="primary"  onClick={() => handleClose("save")}>
              {saveText}
            </Button>
          ) : (
            ""
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EbModal;
