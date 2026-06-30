import { FaUsers } from "react-icons/fa";

export default function SupportCard() {
    return (
        <div className="px-4 pt-2">

            <div className="bg-gradient-to-br from-[#dfb34c]/12 to-[#dfb34c]/2 border border-[#242335] rounded-2xl p-4">

                <div className="w-10 h-10 rounded-xl bg-[#dfb34c]/10 flex items-center justify-center mb-3">

                    <FaUsers className="text-[#dfb34c]" />

                </div>

                <h3 className="text-sm font-bold text-white">

                    Need Help?

                </h3>

                <p className="text-[11px] text-[#8e8e9f] mt-2">

                    Contact support team for assistance.

                </p>

                <button className="mt-4 w-full bg-[#dfb34c] text-black rounded-xl py-2 font-bold">

                    CONTACT SUPPORT

                </button>

            </div>

        </div>
    );
}