import Image from "next/image";

import MainNav from "./MainNav";

function Sidebar() {
  return (
    <div className=" w-full bg-gray-200 p-5 text-stone-800 lg:w-64">
      <div className="mb-6 mt-4 flex justify-center p-4">
        <Image src="/parc-logo.png" height={0} width={120} alt="parc-logo" />
      </div>
      <MainNav />
    </div>
  );
}

export default Sidebar;
