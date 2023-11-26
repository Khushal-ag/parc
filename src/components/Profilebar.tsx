import { LogOut, User, User2 } from "lucide-react";

function Profilebar() {
  return (
    <div className="h-[8%] w-full rounded-sm bg-gray-300">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <User />
          <p className="text-xl">John Doe</p>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <User2 className="text-orange-600" />
          </div>
          <div>
            <LogOut className="text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profilebar;
