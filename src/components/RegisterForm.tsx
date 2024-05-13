// components/Modal.tsx
import { ChangeEvent, FormEvent, useState } from "react";
import { Vehicle } from "@/types";
import { X } from "lucide-react";

import { useCreateNewVehicle } from "@/lib/hooks/useCreateNewVehicle";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  MutationFn: ({
    license_no,
    username,
  }: {
    license_no: string;
    username: string;
  }) => Promise<Vehicle[]>;
  type: string;
}

const RegisterForm = ({ isOpen, onClose, MutationFn, type }: ModalProps) => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewVehicle({ license_no: licenseNumber, username: ownerName });
    onClose();
  };

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const { createNewVehicle, isCreating } = useCreateNewVehicle({
    mutateFn: MutationFn,
    queryKey: ["car_number"],
  });

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto overflow-x-hidden opacity-100 outline-none backdrop-blur-lg focus:outline-none"
          onClick={handleOutsideClick}
        >
          <div className="relative ml-44 w-auto max-w-3xl rounded-md bg-slate-100 p-8 shadow-lg">
            <button
              className="absolute right-2 top-2 cursor-pointer p-1 text-gray-500"
              onClick={onClose}
            >
              <X />
            </button>

            <form onSubmit={handleSubmit} className="mx-4 my-2">
              <div className="mb-6">
                <label
                  htmlFor="licenseNumber"
                  className="text-md block font-medium text-gray-700"
                >
                  {`${type} License Number`}
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="mt-2 w-full rounded-md border px-5 py-3"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="ownerName"
                  className="text-md block font-medium text-gray-700"
                >
                  Owner Name
                </label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  value={ownerName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setOwnerName(e.target.value)
                  }
                  className="mt-2 w-full rounded-md border px-5 py-3"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:border-blue-300 focus:outline-none focus:ring"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring"
                  disabled={isCreating}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
