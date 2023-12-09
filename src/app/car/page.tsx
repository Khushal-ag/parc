"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import {
  bookCarSlot,
  getCarByLicense,
  removeCarSlot,
} from "@/lib/services/apiCarPark";
import { getAvailableCarSlots } from "@/lib/services/apiSlots";
import AddCar from "./AddCar";
import ParkCar from "./ParkCar";
import UnParkCar from "./UnParkCar";

function Car() {
  const [licensePlate, setLicencePlate] = useState("");

  const handlePark = async () => {
    try {
      const data = await getCarByLicense({ license_no: licensePlate });
      if (data.length != 0) {
        if (data[0].slot_occupied === null) {
          const slots = await getAvailableCarSlots();
          if (slots.length != 0) {
            bookCarSlot({
              license_no: licensePlate,
              slot_no: slots[0].slot_no,
            });
            toast.success("Car parked successfully");
          } else toast.error("No slots available");
        } else {
          toast.error("Car already parked");
        }
      } else toast.error("Car not found");
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setLicencePlate("");
    }
  };

  const removePark = async () => {
    try {
      const data = await getCarByLicense({ license_no: licensePlate });
      if (data.length != 0) {
        if (data[0].slot_occupied != null) {
          await removeCarSlot(licensePlate);
          toast.success("Car unparked successfully");
        } else {
          toast.error("Car not parked");
        }
      } else toast.error("Car not found");
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setLicencePlate("");
    }
  };

  return (
    <>
      <section className="flex h-full flex-col items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Enter Licence plate no.."
          className="min-w-max rounded-md border-2 px-2 py-3"
          value={licensePlate}
          onChange={(e) => setLicencePlate(e.target.value)}
        />
        <ParkCar onPark={handlePark} />

        <UnParkCar onUnpark={removePark} />

        <AddCar />
      </section>
    </>
  );
}

export default Car;
