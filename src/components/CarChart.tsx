"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useSlots } from "@/lib/hooks/useSlots";
import { getAvailableCarSlots, getCarSlots } from "@/lib/services/apiSlots";

function CarChart() {
  const {
    slots: carSlots,
    isLoading: isCarSlotLoading,
    errors: carSlotErrors,
  } = useSlots({
    queryKey: ["car_slots"],
    queryFunction: getCarSlots,
  });
  const {
    slots: carSlotsAvailable,
    isLoading: isCarSlotsAvailableLoading,
    errors: carSlotAvailableError,
  } = useSlots({
    queryKey: ["car_slots_available"],
    queryFunction: getAvailableCarSlots,
  });

  if (carSlotErrors || carSlotAvailableError)
    return <div>Something went wrong</div>;

  if (isCarSlotLoading || isCarSlotsAvailableLoading) return null;

  const TotalCarSlots = carSlots?.length ?? 0;
  const AvailableCarSlots = carSlotsAvailable?.length ?? 0;
  const OwnedCarSlots = TotalCarSlots - AvailableCarSlots;

  const carData = [
    {
      heading: "Total Car Slots",
      value: TotalCarSlots,
      color: "#FF8042",
    },
    {
      heading: "Available Car Slots",
      value: AvailableCarSlots,
      color: "#00C49F",
    },
    {
      heading: "Owned Car Slots",
      value: OwnedCarSlots,
      color: "#FFBB28",
    },
  ];

  return (
    <div className="flex w-full flex-col items-start bg-white p-8">
      <h1 className="text-3xl font-semibold tracking-wide text-slate-700">
        Car Slot Data
      </h1>
      <div className="flex w-full items-start justify-start">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={carData}
              nameKey="heading"
              dataKey="value"
              innerRadius={65}
              outerRadius={90}
              cx="40%"
              cy="50%"
              paddingAngle={3}
            >
              {carData.map((entry) => (
                <Cell
                  key={entry.heading}
                  fill={entry.color}
                  stroke={entry.color}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CarChart;
