import BikeChart from "./BikeChart";
import CarChart from "./CarChart";
import Stats from "./Stats";

function Dashboard() {
  return (
    <div className="h-full flex-col bg-slate-100">
      <div className="h-[20%] p-6">
        <Stats />
      </div>
      <div className="h-[80%]">
        <h1 className="pl-10 text-3xl font-semibold tracking-wide text-slate-600">
          DASHBOARD
        </h1>
        <div className="flex justify-around gap-6 p-10">
          <CarChart />
          <BikeChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
