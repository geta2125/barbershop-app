import { forwardRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = forwardRef(
    ({ value, onChange, placeholder }, ref) => {
        return (
            <div className="relative">
                <FaSearch className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-gray-500
                " />

                <input
                    autoFocus
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                className="
                w-full
                pl-11 pr-4 py-3
                bg-[#1b1b24]
                border border-[#242335]
                rounded-xl
                outline-none
                "
                />
            </div>
        );
    }
);

export default SearchBar;