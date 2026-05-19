import Avatar from "./Avatar";

export default function UserCard({
    name,
    role
}) {

    return (

        <div className="
            bg-[#1b1b24]
            border border-[#242335]
            rounded-2xl
            p-4
            flex items-center gap-3
        ">

            <Avatar name={name} />

            <div>

                <h3 className="font-bold">
                    {name}
                </h3>

                <p className="text-sm text-gray-500">
                    {role}
                </p>

            </div>

        </div>

    );

}