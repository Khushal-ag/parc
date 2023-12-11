"use client";

import { Bike, Car, ParkingSquare } from "lucide-react";

import { useSlots } from "@/lib/hooks/useSlots";
import {
  getAvailableBikeSlots,
  getAvailableCarSlots,
  getBikeSlots,
  getCarSlots,
} from "@/lib/services/apiSlots";
import Loader from "./ui/Loader";
import Stat from "./ui/Stat";

function Stats() {
  const {
    slots: carSlots,
    isLoading: isCarSlotLoading,
    errors: carSlotErrors,
  } = useSlots({
    queryKey: ["car_slots"],
    queryFunction: getCarSlots,
  });

  const {
    slots: bikeSlots,
    isLoading: isBikeSlotLoading,
    errors: bikeSlotErrors,
  } = useSlots({
    queryKey: ["bike_slots"],
    queryFunction: getBikeSlots,
  });

  const {
    slots: carSlotsAvailable,
    isLoading: isCarSlotsAvailableLoading,
    errors: carSlotAvailableError,
  } = useSlots({
    queryKey: ["car_slots_available"],
    queryFunction: getAvailableCarSlots,
  });

  const {
    slots: bikeSlotsAvailable,
    isLoading: isBikeSlotsAvailableLoading,
    errors: bikeSlotsAvailableError,
  } = useSlots({
    queryKey: ["bike_slots_available"],
    queryFunction: getAvailableBikeSlots,
  });

  if (
    isCarSlotLoading ||
    isBikeSlotLoading ||
    isCarSlotsAvailableLoading ||
    isBikeSlotsAvailableLoading
  )
    return <Loader />;

  if (
    carSlotErrors ||
    bikeSlotErrors ||
    carSlotAvailableError ||
    bikeSlotsAvailableError
  )
    return <div>Error</div>;

  return (
    <div className="flex items-center justify-around gap-2 py-2">
      <Stat
        icon={<Car className="text-orange-600" size={28} />}
        title="Total Car Slots"
        value={`${carSlots?.length}`}
      />
      <Stat
        icon={<ParkingSquare className="text-green-600" size={28} />}
        title="Total Available Slots"
        value={`${carSlotsAvailable?.length}`}
      />
      <Stat
        icon={<Bike className="text-orange-600" size={28} />}
        title="Total Bike Slots"
        value={`${bikeSlots?.length}`}
      />
      <Stat
        icon={<ParkingSquare className="text-green-600" size={28} />}
        title="Total Available Slots"
        value={`${bikeSlotsAvailable?.length}`}
      />
    </div>
  );
}

export default Stats;
