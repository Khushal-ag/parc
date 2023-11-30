"use client";

import { MouseEventHandler, useState } from "react";

import { addCarUser } from "@/lib/services/apiCarPark";
import RegisterForm from "@/components/RegisterForm";

function AddCar() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal: MouseEventHandler<HTMLButtonElement> = () => {
    setModalOpen(true);
  };

  const closeModal: MouseEventHandler<HTMLDivElement> = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div>
        <button
          onClick={openModal}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring"
        >
          Add Car
        </button>
      </div>
      <RegisterForm
        isOpen={isModalOpen}
        onClose={closeModal}
        MutationFn={addCarUser}
        type="Car"
      />
    </>
  );
}

export default AddCar;
