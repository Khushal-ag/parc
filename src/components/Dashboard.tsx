import Stats from "./Stats";

function Dashboard() {

  
  return (
    <div className="h-full flex-col bg-slate-100">
      <div className="h-[20%] p-6">
        <Stats />
      </div>
      <div className="h-[80%]">
        <div className="flex justify-center gap-4 p-6">
          <div className="h-1/2 w-28 bg-white"> hello</div>
          <div className="h-1/2 w-28 bg-white"> hello</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
