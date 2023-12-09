import Link from "next/link";

function NavItem({
  option,
  link,
  children,
}: {
  option: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={link}>
      <li className="my-2 flex w-full items-center justify-start gap-4 rounded-lg p-4 duration-200 hover:bg-slate-200">
        {children}
        {option}
      </li>
    </Link>
  );
}

export default NavItem;
