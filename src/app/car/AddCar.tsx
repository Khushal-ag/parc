"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { addCarUser } from "@/lib/services/apiCarPark";
import RegisterForm from "@/components/RegisterForm";

function AddCar() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div>
        <button
          onClick={openModal}
          className="flex items-center gap-1 rounded-md bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring"
        >
          <Plus size={22} className="font-bold" />
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
