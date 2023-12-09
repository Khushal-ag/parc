"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import {
  bookBikeSlot,
  getBikeByLicense,
  removeBikeSlot,
} from "@/lib/services/apiBikePark";
import { getAvailableBikeSlots } from "@/lib/services/apiSlots";
import AddBike from "./AddBike";
import ParkBike from "./ParkBike";
import UnParkBike from "./UnParkBike";

function Bike() {
  const [licensePlate, setLicencePlate] = useState("");

  const handlePark = async () => {
    try {
      const data = await getBikeByLicense({ license_no: licensePlate });
      if (data.length != 0) {
        if (data[0].slot_occupied === null) {
          const slots = await getAvailableBikeSlots();
          if (slots.length != 0) {
            bookBikeSlot({
              license_no: licensePlate,
              slot_no: slots[0].slot_no,
            });
            toast.success("Bike parked successfully");
          } else toast.error("No slots available");
        } else {
          toast.error("Bike already parked");
        }
      } else toast.error("Bike not found");
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setLicencePlate("");
    }
  };

  const removePark = async () => {
    try {
      const data = await getBikeByLicense({ license_no: licensePlate });
      if (data.length != 0) {
        if (data[0].slot_occupied != null) {
          await removeBikeSlot(licensePlate);
          toast.success("Bike unparked successfully");
        } else {
          toast.error("Bike not parked");
        }
      } else toast.error("Bike not found");
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
        <ParkBike onPark={handlePark} onChange={ handlePark} />

        <UnParkBike onUnpark={removePark} />

        <AddBike />
      </section>
    </>
  );
}

export default Bike;
