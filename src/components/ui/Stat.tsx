function Stat({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-start gap-4 rounded-md bg-white px-4 py-3">
      <div className="flex items-center justify-center rounded-full bg-orange-100 p-3">
        {icon}
      </div>
      <div className="mr-6 flex-col">
        <div className=" text-lg font-bold tracking-wider text-slate-600">
          {title}
        </div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

export default Stat;
