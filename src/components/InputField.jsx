export default function InputField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text"
}) {

    return (

        <div>

            <label className="
                text-xs
                font-bold
                text-[#8e8e9f]
                uppercase
                tracking-[1px]
                mb-2
                block
            ">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full
                    px-5 py-4
                    bg-[#14141d]
                    border border-[#242335]
                    rounded-2xl
                    outline-none
                    focus:border-[#dfb34c]/20
                    transition-all
                "
                required
            />

        </div>

    );

}