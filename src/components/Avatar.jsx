export default function Avatar({ name }) {

    return (

        <div className="
            w-10 h-10
            rounded-full
            bg-[#dfb34c]
            text-black
            flex items-center justify-center
            font-bold
        ">
            {name.charAt(0)}
        </div>

    );

}