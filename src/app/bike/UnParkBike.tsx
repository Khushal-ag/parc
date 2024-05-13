import { MapPinOff } from "lucide-react";

function UnParkBike({ onUnpark }: { onUnpark: () => void }) {
  return (
    <div>
      <button
        className="flex items-center gap-1 rounded-md bg-red-500 px-4 py-2 text-lg font-medium text-white hover:bg-red-600 focus:border-red-300 focus:outline-none focus:ring"
        onClick={onUnpark}
      >
        <MapPinOff size={22} />
        Unpark Bike
      </button>
    </div>
  );
}

export default UnParkBike;
