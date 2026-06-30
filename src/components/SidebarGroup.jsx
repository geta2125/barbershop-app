import SidebarItem from "./SidebarItem";

export default function SidebarGroup({
    title,
    menus,
    menuClass,
}) {
    return (
        <div>

            <h4 className="px-4 mb-2 text-[10px] uppercase tracking-[3px] text-[#555566] font-bold">

                {title}

            </h4>

            <ul className="space-y-1">

                {menus.map((item) => (
                    <SidebarItem
                        key={item.key}
                        item={item}
                        menuClass={menuClass}
                    />
                ))}

            </ul>

        </div>
    );
}