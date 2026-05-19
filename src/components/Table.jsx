export default function Table({
    headers,
    children
}) {

    return (

        <div className="overflow-x-auto">

            <table className="w-full">

                <thead>

                    <tr>

                        {headers.map((header, index) => (

                            <th
                                key={index}
                                className="
    text-center
    py-4
    text-[#8e8e9f]
    uppercase
    tracking-[1px]
    text-xs
    font-bold
"
                            >
                                {header}
                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>
                    {children}
                </tbody>

            </table>

        </div>

    );

}