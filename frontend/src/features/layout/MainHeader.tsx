import { Link, NavLink } from "react-router";

const MainHeader = () => {
    const routes = [
        {
            id: 1,
            href: "/",
            label: "Home"
        },
        {
            id: 1,
            href: "/products",
            label: "Products"
        },
        {
            id: 1,
            href: "/movements",
            label: "Movements"
        },
    ]
  return (
    <header className="flex sticky top-0 z-100  h-12 justify-between items-center p-3 border-b border-b-slate-200 shadow-sm">
      <Link to={"/"} className="font-medium text-sm">
        MD
      </Link>
      <ul className="flex items-center gap-2">
        {routes.map((route) => (
          <li key={route.id}>
            <NavLink
              to={route.href}
              className={({ isActive }) =>
                [
                  isActive
                    ? "font-medium text-sm"
                    : "font-normal text-xs hover:font-medium hover:text-sm duration-150",
                ].join(" ")
              }
            >
              {route.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default MainHeader