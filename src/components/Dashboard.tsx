import Stats from "./Stats";

function Dashboard() {
  return (
    <div className="h-full flex-col">
      <div className="h-[20%] p-6">
        <Stats />
      </div>
      <div className="h-[80%]">Pie chart</div>
    </div>
  );
}

export default Dashboard;
