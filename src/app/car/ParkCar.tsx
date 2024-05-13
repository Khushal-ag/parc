import { MapPin } from "lucide-react";

function ParkCar({ onPark }: { onPark: () => void }) {
  return (
    <div>
      <button
        className="flex items-center gap-1 rounded-md bg-green-500 px-4 py-2 text-lg font-medium text-white hover:bg-green-600 focus:border-green-300 focus:outline-none focus:ring"
        onClick={onPark}
      >
        <MapPin size={22} />
        Park Car
      </button>
    </div>
  );
}

export default ParkCar;
