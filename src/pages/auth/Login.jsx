import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        setTimeout(() => {
            if (dataForm.email === "geta@gmail.com" && dataForm.password === "2125") {
                localStorage.setItem("user", JSON.stringify(dataForm));
                navigate("/");
            } else {
                setError("Email atau password salah");
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div>

            {/* HEADER */}
            <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back 👋
            </h2>

            <p className="text-sm text-[#D3CDC3]/60 mb-8">
                Today is a new day. Sign in to start managing your projects.
            </p>

            {/* ERROR */}
            {error && (
                <div className="bg-[#A87C2D]/20 border border-[#A87C2D] mb-4 p-3 rounded-lg flex items-center text-sm">
                    <BiError className="mr-2" />
                    {error}
                </div>
            )}

            {/* LOADING */}
            {loading && (
                <div className="bg-[#222] border border-[#A87C2D] mb-4 p-3 rounded-lg flex items-center text-sm">
                    <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                    Loading...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* EMAIL */}
                <div>
                    <label className="text-xs text-[#D3CDC3]/70">
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2.5 bg-[#161616] border border-white/10 rounded-lg focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/20 outline-none"
                        placeholder="example@email.com"
                    />
                </div>

                {/* PASSWORD */}
                <div>
                    <div className="flex justify-between text-xs text-[#D3CDC3]/70">
                        <label>Password</label>
                        <span className="text-[#A87C2D] cursor-pointer hover:underline">
                            Forgot Password?
                        </span>
                    </div>

                    <input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2.5 bg-[#161616] border border-white/10 rounded-lg focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/20 outline-none"
                        placeholder="********"
                    />
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-[#A87C2D] hover:bg-[#BE9359] text-black font-semibold py-2.5 rounded-lg transition"
                >
                    Sign in
                </button>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 text-xs text-[#D3CDC3]/40">
                    <div className="flex-1 h-[1px] bg-white/10"></div>
                    OR
                    <div className="flex-1 h-[1px] bg-white/10"></div>
                </div>

                {/* GOOGLE */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2.5 rounded-lg hover:bg-white/10 transition"
                >
                    <FcGoogle />
                    Sign in with Google
                </button>

                {/* REGISTER */}
                <p className="text-center text-xs text-[#D3CDC3]/50">
                    Don’t have an account?{" "}
                    <span className="text-[#A87C2D] cursor-pointer hover:underline">
                        Sign up
                    </span>
                </p>

            </form>
        </div>
    );
}