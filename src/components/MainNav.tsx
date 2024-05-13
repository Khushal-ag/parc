import { Bike, CarFront, LayoutDashboard, Settings } from "lucide-react";

import NavItem from "./ui/NavItem";

function MainNav() {
  return (
    <div className="flex justify-center">
      <ul className="flex-col space-y-2 text-2xl tracking-wider">
        <NavItem option="Dashboard" link="/">
          <LayoutDashboard />
        </NavItem>
        <NavItem option="Car Parking" link="/car">
          <CarFront />
        </NavItem>
        <NavItem option="Bike Parking" link="/bike">
          <Bike />
        </NavItem>
        <NavItem option="Settings" link="/settings">
          <Settings />
        </NavItem>
      </ul>
    </div>
  );
}

export default MainNav;
