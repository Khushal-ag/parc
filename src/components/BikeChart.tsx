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
import { getAvailableBikeSlots, getBikeSlots } from "@/lib/services/apiSlots";

function BikeChart() {
  const {
    slots: BikeSlots,
    isLoading: isBikeSlotLoading,
    errors: BikeSlotErrors,
  } = useSlots({
    queryKey: ["Bike_slots"],
    queryFunction: getBikeSlots,
  });
  const {
    slots: BikeSlotsAvailable,
    isLoading: isBikeSlotsAvailableLoading,
    errors: BikeSlotAvailableError,
  } = useSlots({
    queryKey: ["Bike_slots_available"],
    queryFunction: getAvailableBikeSlots,
  });

  if (BikeSlotErrors || BikeSlotAvailableError)
    return <div>Something went wrong</div>;

  if (isBikeSlotLoading || isBikeSlotsAvailableLoading) return null;

  const TotalBikeSlots = BikeSlots?.length ?? 0;
  const AvailableBikeSlots = BikeSlotsAvailable?.length ?? 0;
  const OwnedBikeSlots = TotalBikeSlots - AvailableBikeSlots;

  const BikeData = [
    {
      heading: "Total Bike Slots",
      value: TotalBikeSlots,
      color: "#FF8042",
    },
    {
      heading: "Available Bike Slots",
      value: AvailableBikeSlots,
      color: "#00C49F",
    },
    {
      heading: "Owned Bike Slots",
      value: OwnedBikeSlots,
      color: "#FFBB28",
    },
  ];

  return (
    <div className="flex w-full flex-col items-start bg-white p-8">
      <h1 className="text-3xl font-semibold tracking-wide text-slate-700">
        Bike Slot Data
      </h1>
      <div className="flex w-full items-start justify-start">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={BikeData}
              nameKey="heading"
              dataKey="value"
              innerRadius={65}
              outerRadius={90}
              cx="40%"
              cy="50%"
              paddingAngle={3}
            >
              {BikeData.map((entry) => (
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

export default BikeChart;
