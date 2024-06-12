import React, { useEffect, useState } from "react";

interface SuccessModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title: string;
  content?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isOpen) {
      setShowModal(true);
      timer = setTimeout(() => {
        setShowModal(false);
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      onClose();
    }
  };

  return showModal ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
      onClick={handleModalClose}
    >
      <div className="relative max-w-lg mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-lg text-center font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-center">{content}</p>
      </div>
    </div>
  ) : null;
};

export default SuccessModal;
