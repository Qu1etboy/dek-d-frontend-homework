import React from "react";
import { useState } from "react";
import Button from "./Button";

type ConfirmationModalProps = {
  children: React.ReactNode;
  setShowModal: (value: boolean) => void;
  showModal: boolean;
  onAccept: () => void;
};

export default function ConfirmationModal(props: ConfirmationModalProps) {
  const { showModal, setShowModal, onAccept, children } = props;

  return (
    <>
      {children}
      {showModal ? (
        // Modal Background
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black/50 duration-500">
          {/* Modal Box */}
          <div className="relative my-6 mx-3 md:mx-auto w-[600px] max-w-3xl rounded-lg shadow-lg flex flex-col bg-white p-6">
            {/* Modal Content */}
            <p className="text-orange-500 mb-6">
              คุณต้องการลบรายการที่เลือกใช่หรือไม่
            </p>
            <div className="flex justify-end gap-6">
              <button
                className="text-gray-500 hover:text-gray-600"
                type="button"
                onClick={() => setShowModal(false)}
              >
                ยกเลิก
              </button>
              <button
                className="text-orange-500 hover:text-orange-600"
                type="button"
                onClick={() => {
                  onAccept();
                  setShowModal(false);
                }}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
