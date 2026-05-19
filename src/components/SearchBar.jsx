import { FaSearch } from "react-icons/fa";

export default function SearchBar({
    value,
    onChange,
    placeholder
}) {

    return (

        <div className="relative">

            <FaSearch className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-gray-500
            " />

            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full
                    pl-11 pr-4 py-3
                    bg-[#1b1b24]
                    border border-[#242335]
                    rounded-2xl
                    outline-none
                "
            />

        </div>

    );

}