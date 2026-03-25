import { Button, Modal } from "flowbite-react";
import { ReactNode } from "react";
import { ButtonApp } from "@/shared/ui/button";

interface CustomModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  size?: string;
  variant?: "danger" | "default";
}

export function CustomModal({
  show,
  onClose,
  title,
  children,
  primaryAction,
  size = "2xl",
  variant = "default", // default
}: CustomModalProps) {
  return (
    <Modal size={size} dismissible show={show} onClose={onClose}>
      {title && <Modal.Header>{title}</Modal.Header>}

      <Modal.Body>
        <div className="space-y-6">{children}</div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          className="text-black
              rounded mb-4 focus:!outline-none focus:!ring-0 hover:!text-black   hover:none "
          color="gray"
          onClick={onClose}
        >
          Fechar
        </Button>

        {primaryAction && (
          <ButtonApp onClick={primaryAction.onClick}>
            {primaryAction.label}
          </ButtonApp>
        )}
      </Modal.Footer>
    </Modal>
  );
}
