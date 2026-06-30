import { NavLink, Link } from "react-router-dom";
import logoGroomGold from "/img/logopfl_geta.png"; // Pastikan path logo benar

export default function Sidebar({ navItems }) {
  const activeLinkClass = "bg-[#dfb34c] text-black";
  const inactiveLinkClass = "text-gray-400 hover:bg-[#2a2a3a] hover:text-white";

  return (
    <aside className="w-64 bg-[#1a1a26] border-r border-[#2a2a3a] flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-[#2a2a3a]">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoGroomGold} alt="Groom Gold" className="h-10 w-auto" />
          <span className="text-lg font-bold text-white">Groom <span className="text-[#dfb34c]">Gold</span></span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end // 'end' prop ensures it's only active for exact path
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}